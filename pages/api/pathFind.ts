import { Line, Stop } from '../../util/DataTypes';
import { LINES, STOPS } from '../../util/dataToGeoJson';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseTime, timeToMinutes } from '../../util/Time';

export type Path = {
	lines: Line[];
	hasEvent: boolean;
};

export type ApiPath = {
	paths: Path[];
};

const findPathsFrom = (
	prevLine: string,
	currentTime: string,
	from: string,
): Line[] => {
	let outgoing = LINES.filter((v) => v.from === from);
	const startTime = parseTime(currentTime);

	outgoing = outgoing.filter((v) => {
		const departure = parseTime(v.departure);

		// Add 60 seconds to make line change, only if not first stop on path
		if (prevLine !== 'first' && prevLine !== v.lineNumber + v.lineName)
			return (startTime as number) + 60 <= departure;

		return departure >= startTime;
	});

	return outgoing;
};

const copySet = (set: Set<any>): Set<any> => {
	return new Set(set.entries());
};

const DFS = (
	stops: Map<string, Stop>,
	visited: Set<string>,
	current: string,
	goal: string,
	startTime: string,
): Path[] => {
	if (goal == current) return [{ lines: [], hasEvent: false }];

	const outgoing = findPathsFrom('first', startTime, current);

	let paths: Path[] = [];
	let newVisited = new Set<string>();
	for (let path of outgoing) {
		if (visited.has(path.to)) continue;

		newVisited.add(path.to);
		let newSet = copySet(visited);
		newSet.add(path);

		let childPaths = DFS(stops, newSet, path.to, goal, path.arriving);

		for (let childPath of childPaths) {
			const hasEvent =
				childPath.hasEvent ||
				(stops.get(path.from)?.event ? true : false);
			paths.push({
				lines: [path, ...childPath.lines],
				hasEvent,
			});
		}
	}

	for (let v of newVisited) visited.add(v);

	return paths;
};

const pathFind = (req: NextApiRequest, res: NextApiResponse<ApiPath>) => {
	// console.log(req.query);

	const fromName = req.query.from as string;
	const toName = req.query.to as string;
	const startTime = req.query.time as string;

	if (typeof parseTime(startTime) === 'string') {
		return res.status(200).json({ paths: [] });
	}

	const visited = new Set<string>([fromName.trim()]);

	const paths = DFS(
		STOPS,
		visited,
		fromName.trim(),
		toName.trim(),
		startTime.trim(),
	);

	// TODO: avoid events
	// TODO: sort paths based on arriving time and return max 3 paths

	res.status(200).json({ paths });
};

export default pathFind;
