import DATA from '../data.json';
import { DataJSON, TransportTypes } from './DataTypes';
import { parseTime } from './Time';

for (const stop of DATA.stops) {
	if (typeof stop.lat !== 'number')
		throw new Error(
			`'data.json' latitude in stop "${stop.name}" not valid!`,
		);
	if (typeof stop.lng !== 'number')
		throw new Error(
			`'data.json' longitude in stop "${stop.name}" not valid!`,
		);
}

for (const event of DATA.events) {
	if (DATA.stops.filter(({ name }) => name == event.stop).length === 0)
		throw new Error(`'data.json' no stop named '${event.stop}'' in event`);

	if (typeof parseTime(event.time) === 'string')
		throw new Error(
			`'data.json' wrong time format '${event.time}' at event '${event.stop}'`,
		);
}

for (const styles of DATA.styles) {
	const tt = Object.values(TransportTypes) as string[];

	if (!tt.includes(styles.type))
		throw new Error(`'data.json' invalid transport type ${styles.type}`);
}

for (const coords of DATA.coords) {
}

for (const line of DATA.lines) {
	if (typeof line.lineNumber !== 'string')
		throw new Error(
			`'data.json' line number must be a string, at line: ${line.from}->${line.to}`,
		);

	const style = DATA.styles.filter(
		({ lineNumber }) => lineNumber == line.lineNumber,
	);

	if (style.length === 0)
		throw new Error(
			`'data.json' no styles for line number ${line.lineNumber}!`,
		);

	const fromStop = DATA.stops.filter((v) => v.name == line.from);
	if (fromStop.length === 0)
		throw new Error(`'data.json' no stop named: ${line.from}`);

	const tostop = DATA.stops.filter((v) => v.name == line.to);
	if (tostop.length === 0)
		throw new Error(`'data.json' no stop named: ${line.to}`);

	if (!parseTime(line.departure) || !parseTime(line.arriving)) {
		throw new Error(
			`Invalid time: ${line.departure} or ${line.arriving} at line: ${line.from}->${line.to}`,
		);
	}
}

export default DATA as unknown as DataJSON;
