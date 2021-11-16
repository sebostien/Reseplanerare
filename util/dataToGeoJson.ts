import DATA from './validate';
import { Line, Stop } from './DataTypes';

export const STOPS: Map<string, Stop> = DATA.stops.reduce(
	(acc, val) => acc.set(val.name, val),
	new Map(),
);

export const LINES: Line[] = [];

for (const line of DATA.lines) {
	const fromCoords = STOPS.get(line.from) as Stop;
	const toCoords = STOPS.get(line.to) as Stop;

	const styles = DATA.styles.filter(
		({ lineNumber }) => lineNumber === line.lineNumber,
	);
	const transportType = styles[0].type;
	const coords =
		DATA.coords
			.filter(
				({ from, to, type }) =>
					from == line.from &&
					to === line.to &&
					type === transportType,
			)
			.map((v) => v.coords)[0] || [];

	const events = DATA.events
		.filter(({ stop }) => stop === line.to)
		.map(({ time }) => time);

	const newLine: Line = {
		lineNumber: line.lineNumber,
		lineName: line.name,
		type: transportType,
		from: line.from,
		to: line.to,
		events,
		styles: styles[0],
		departure: line.departure,
		arriving: line.arriving,
		coords: [fromCoords, ...coords, toCoords],
	};

	LINES.push(newLine);
}
