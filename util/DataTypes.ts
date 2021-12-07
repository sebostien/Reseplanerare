import TimeDate from './Time';

export type Latitude = number;
export type Longitude = number;
export type Coord = [Longitude, Latitude];

export type PublicEvent = {
	eventName: string;
	eventTime: TimeDate;
};

export type StopPoint = {
	stopName: string;
	events: PublicEvent[];
	coords: Coord;
};

export enum TransportTypes {
	TRAM = 'TRAM',
	WALK = 'WALK',
	BUS = 'BUS',
	CYCLE = 'CYCLE',
}

export type Line = {
	lineNumber: string;
	lineName: string;
	transportType: TransportTypes;
	fromStop: StopPoint;
	toStop: StopPoint;
	departure: TimeDate;
	arriving: TimeDate;
};

export type LinePath = {
	type: TransportTypes;
	from: string;
	to: string;
	coords: Coord[];
};

export type LineStyle = {
	type: TransportTypes;
	lineNumber: string;
	color: string;
	backgroundColor: string;
};

export type WalkLine = {
	type: TransportTypes;
	fromStop: StopPoint;
	toStop: StopPoint;
	duration: TimeDate;
};
export type DataJSON = {
	stops: StopPoint[];
	styles: LineStyle[];
	paths: {
		type: TransportTypes[];
		from: string;
		to: string;
		coords: Coord[];
	}[];
	walkLines: {
		fromStop: string;
		toStop: string;
		minutes: number;
	}[];
	lines: {
		number: string;
		name: string;
		startTimes: string[];
		stops: string[];
	}[];
};
