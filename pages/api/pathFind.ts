import { Line, Stop } from '../../util/DataTypes';
import { LINES } from '../../util/dataToGeoJson';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseTime, timeToMinutes } from '../../util/Time';

export type ApiPath = {
	paths: Line[][];
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

// TODO: Add time, if change of line time changes
const DFS = (
	visited: Set<string>,
	current: string,
	goal: string,
	startTime: string,
): Line[][] => {
	if (goal == current) return [[]];

	const outgoing = findPathsFrom('first', startTime, current);

	let paths: Line[][] = [];

	for (let path of outgoing) {
		if (visited.has(path.to)) continue;

		visited.add(path.to);

		let childPaths = DFS(copySet(visited), path.to, goal, path.arriving);

		for (let childPath of childPaths) {
			childPath.unshift(path);
			paths.push(childPath);
		}
	}

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
		visited,
		fromName.trim(),
		toName.trim(),
		startTime.trim(),
	);

	// TODO: sort paths based on arriving time and return max 3 paths

	res.status(200).json({ paths });
};

export default pathFind;
