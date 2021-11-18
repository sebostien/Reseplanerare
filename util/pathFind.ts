import { Line, StopPoint } from './DataTypes';
import TimeDate from './Time';
import { OUT_LINES, OUT_PATHS, OUT_STOPS } from './ParseData';

const findPathsFrom = (
	from: string,
	startTime: TimeDate,
	currentLine: string,
	prevLines: Set<string>,
): Line[] => {
	let outgoing = OUT_LINES.filter(
		({ fromStop }) => fromStop.stopName === from,
	);

	outgoing = outgoing.filter((line) => {
		// If we are on the same line. We must continue directly
		// We can't get off and take a later bus on the same exact same line
		if (line.lineName === currentLine) {
			return startTime.isAfterOrEqual(line.departure);
		}
		// TODO: prevLines
		return true;
	});

	outgoing = outgoing.filter((line) => {
		// TODO: add walking, can walk any time

		// Add 60 seconds to make line change, only if not first stop on path
		// if (prevLine !== 'first' && prevLine !== v.lineNumber + v.lineName)
		// 	return (startTime as number) + 60 <= v.departure;
		return line.departure.isAfterOrEqual(startTime);
	});

	outgoing = outgoing.sort((a, b) => {
		if (a.arriving.days < b.arriving.days) return -1;
		if (a.arriving.days > b.arriving.days) return 1;
		if (a.arriving.hours < b.arriving.hours) return -1;
		if (a.arriving.hours > b.arriving.hours) return 1;
		if (a.arriving.minutes < b.arriving.minutes) return -1;
		if (a.arriving.minutes > b.arriving.minutes) return 1;

		return 0;
	});

	return outgoing.slice(0, 3);
};

const copySet = (set: Set<string>): Set<string> => {
	return new Set(set.keys());
};

const DFS = (
	visited: Set<string>,
	current: string,
	goal: string,
	startTime: TimeDate,
	prevLine: string,
): Line[][] => {
	if (goal == current) return [[]];

	visited.add(current);

	const outgoing = findPathsFrom(current, startTime, prevLine, new Set());

	let paths: Line[][] = [];
	let newVisited = copySet(visited);
	for (let path of outgoing) {
		if (visited.has(path.toStop.stopName)) continue;
		newVisited.add(path.toStop.stopName);

		let newSet = copySet(newVisited);

		let childPaths = DFS(
			newSet,
			path.toStop.stopName,
			goal,
			path.arriving,
			path.lineName,
		);

		for (let childPath of childPaths) {
			paths.push([path, ...childPath]);
		}
	}

	for (let v of newVisited) visited.add(v);

	return paths;
};

const pathFind = (from: string, to: string, time: string): Line[][] => {
	const fromName = from as string;
	const toName = to as string;
	const stringTime = time as string;

	let startTime = TimeDate.fromString(stringTime.trim());

	if (!startTime.isValid) {
		console.log(`pathFind: time not valid ${time}`);
		return [];
	}

	const visited = new Set<string>([fromName.trim()]);
	const paths = DFS(visited, fromName.trim(), toName.trim(), startTime, '');

	console.log(paths.length);

	// TODO: avoid events
	// TODO: sort paths based on arriving time and return max 3 paths

	return paths
		.sort((a, b) => {
			let l1 = a[a.length - 1];
			let l2 = b[b.length - 1];
			if (l1.arriving.days < l2.arriving.days) return -1;
			if (l1.arriving.days > l2.arriving.days) return 1;
			if (l1.arriving.hours < l2.arriving.hours) return -1;
			if (l1.arriving.hours > l2.arriving.hours) return 1;
			if (l1.arriving.minutes < l2.arriving.minutes) return -1;
			if (l1.arriving.minutes > l2.arriving.minutes) return 1;

			return 0;
		})
		.slice(0, 3);
};

export default pathFind;
