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

	// Necessary to reduce the number of permutations.
	// Would be 200000 ways to navigate the network without this
	return outgoing.slice(0, 3);
};

const copySet = (set: Set<string>): Set<string> => {
	return new Set(set.keys());
};

/**
 * Find almost all paths from current to goal
 */
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
	// const takenLines = new Set<string>();

	for (let path of outgoing) {
		if (visited.has(path.toStop.stopName)) continue;
		newVisited.add(path.toStop.stopName);

		// Removes unnecessary line switching
		// Only takes the exact same line once
		// if (takenLines.has(path.departure + path.lineName)) continue;
		// takenLines.add(path.departure + path.lineName);

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

	if (fromName === toName) return [];

	let startTime = TimeDate.fromString(stringTime.trim());

	if (!startTime.isValid) {
		console.log(`pathFind: time not valid ${time}`);
		return [];
	}

	// TODO: avoid events
	const visited = new Set<string>([fromName.trim()]);
	let paths = DFS(visited, fromName.trim(), toName.trim(), startTime, '');

	// TODO: filter lines that does the same thing e.g.
	// a -> c === a -> b -> c, if the departure and arriving time is the same

	// TODO: avoid events

	// TODO: Maybe sort on arriving time first and then travel time?
	// Sort the paths based on the shortest travel time
	const linePaths = new Set<string>();
	paths = paths
		.sort((a, b) => {
			let aa =
				a[a.length - 1].departure.hours * 60 +
				a[a.length - 1].departure.minutes -
				(a[0].departure.hours * 60 + a[0].departure.minutes);
			let bb =
				b[b.length - 1].departure.hours * 60 +
				b[b.length - 1].departure.minutes -
				(b[0].departure.hours * 60 + b[0].departure.minutes);

			return aa - bb;
		})
		.filter((lines) => {
			// Remove the lines that are unnecessary, i.e. takes extra stops
			// Since the lines are sorted the path with the shortest travel time is kept
			let f = lines[0];
			let l = lines[lines.length - 1];
			let hash =
				f.departure.hhmm() +
				f.lineName +
				l.departure.hhmm() +
				l.lineName;
			let r = !linePaths.has(hash);
			linePaths.add(hash);
			return r;
		});

	console.log(paths.length);

	return paths.sort((a, b) => {
		let l1 = a[a.length - 1];
		let l2 = b[b.length - 1];
		if (l1.arriving.days < l2.arriving.days) return -1;
		if (l1.arriving.days > l2.arriving.days) return 1;
		if (l1.arriving.hours < l2.arriving.hours) return -1;
		if (l1.arriving.hours > l2.arriving.hours) return 1;
		if (l1.arriving.minutes < l2.arriving.minutes) return -1;
		if (l1.arriving.minutes > l2.arriving.minutes) return 1;

		return 0;
	});
	// .slice(0, 3);
};

export default pathFind;
