import { start } from 'repl';
import DATA from '../data.json';
import {
	Coord,
	Latitude,
	Line,
	LinePath,
	LineStyle,
	Longitude,
	PublicEvent,
	StopPoint,
	TransportTypes,
} from './DataTypes';
import TimeDate from './Time';

export const OUT_STOPS = new Map<string, StopPoint>();
export const OUT_PATHS = new Map<string, LinePath>();
export const OUT_STYLES = new Map<string, LineStyle>();
export const OUT_LINES: Line[] = [];

export const pathHash = (
	type: string | TransportTypes,
	from: string,
	to: string,
) => {
	return type + from + to;
};

export const styleHash = (lineNumber: string) => {
	return lineNumber;
};

const latitudeInRange = (lat: Latitude) => 57.6 <= lat && lat <= 57.8;
const longitudeInRange = (lng: Longitude) => 11.8 <= lng && lng <= 12.1;

console.log('----------------------');
console.log(' Validating data.json ');
console.log('----------------------');

for (const stop of DATA.stops) {
	const [lng, lat] = stop.coords;

	const newStop: StopPoint = {
		stopName: stop.name,
		events: [],
		coords: [lng, lat],
	};

	if (!latitudeInRange(lat))
		throw new Error('lat not in valid range at stop: ' + stop.name);

	if (!longitudeInRange(lng))
		throw new Error('lng not in valid range at stop: ' + stop.name);

	if (stop.events) {
		for (let event of stop.events) {
			newStop.events.push({
				eventName: event.eventName,
				eventTime: TimeDate.fromString(event.eventTime),
			});
		}
	}

	OUT_STOPS.set(stop.name, newStop);
}

for (const styles of DATA.styles) {
	const tt = Object.values(TransportTypes) as string[];

	if (!tt.includes(styles.type))
		throw new Error(`In styles: Invalid transport type ${styles.type}`);

	OUT_STYLES.set(styleHash(styles.lineNumber), {
		type: styles.type as TransportTypes,
		lineNumber: styles.lineNumber,
		color: styles.color,
		backgroundColor: styles.backgroundColor,
	});
}

for (const paths of DATA.paths) {
	const tt = Object.values(TransportTypes) as string[];
	for (let type of paths.type) {
		if (!tt.includes(type))
			throw new Error(`In paths: Invalid transport type ${type}`);
	}

	if (!OUT_STOPS.has(paths.from)) {
		throw new Error(`In paths: No stop named ${paths.from}`);
	}

	if (!OUT_STOPS.has(paths.to)) {
		throw new Error(`In paths: No stop named ${paths.to}`);
	}

	for (let [lng, lat] of paths.coords) {
		if (!latitudeInRange(lat))
			throw new Error(
				'In paths: lat not in valid range at stop: ' + stop.name,
			);

		if (!longitudeInRange(lng))
			throw new Error(
				'In paths: lng not in valid range at stop: ' + stop.name,
			);
	}

	for (let type of paths.type) {
		OUT_PATHS.set(pathHash(type, paths.from, paths.to), {
			type: type as TransportTypes,
			from: paths.from,
			to: paths.to,
			coords: paths.coords as Coord[],
		});
	}
}

// TODO: create one line for every time between 0 and 24 hours

for (const line of DATA.lines) {
	const style = OUT_STYLES.get(line.number);
	if (style === undefined)
		throw new Error(`In lines: no styles for line number ${line.number}!`);

	for (let stopName of line.stops) {
		if (!OUT_STOPS.has(stopName)) {
			throw new Error(
				`In lines: no stop named '${stopName}' on line ${line.name}`,
			);
		}
	}

	let startHours = line.startHours;
	let startMinutes = line.startMinutes;

	if (startHours === undefined || startHours === undefined) {
		throw new Error(`In lines: time is missing at line ${line.name}`);
	}

	const constDate = TimeDate.fromString(`${startHours}:${startMinutes}`);
	if (constDate.hours === 0 && constDate.minutes === 0) constDate.addHours(1);
	let startDate = new TimeDate(0, 0);

	for (let j = 0; startDate.days < 2; j++) {
		let lastStop = line.stops[0];
		for (let i = 1; i < line.stops.length; i++) {
			OUT_LINES.push(
				Object.freeze({
					lineNumber: line.number,
					departure: new TimeDate(
						startDate.hours,
						startDate.minutes + (i - 1),
						startDate.days,
					),
					arriving: new TimeDate(
						startDate.hours,
						startDate.minutes + i,
						startDate.days,
					),
					lineName: line.name,
					transportType: style.type,
					fromStop: OUT_STOPS.get(lastStop) as StopPoint,
					toStop: OUT_STOPS.get(line.stops[i]) as StopPoint,
				}),
			);

			lastStop = line.stops[i];
		}
		startDate.add(constDate);
	}
}

console.log('----------------------');
console.log(' Done with validation ');
console.log('----------------------');
