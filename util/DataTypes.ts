export type Stop = {
	name: string;
	lat: number;
	lng: number;
};

export enum TransportTypes {
	TRAM = 'tram',
	WALK = 'walk',
	BUS = 'bus',
}

export type DataJSON = {
	stops: Stop[];
	styles: {
		type: TransportTypes;
		lineNumber: string;
		color: string;
		backgroundColor: string;
	}[];
	coords: {
		type: TransportTypes;
		from: string;
		to: string;
		coords: {
			lat: number;
			lng: number;
		}[];
	}[];
	lines: {
		lineNumber: string;
		name: string;
		from: string;
		to: string;
		departure: string;
		arriving: string;
	}[];
};

export type Line = {
	lineNumber: string;
	lineName: string;
	type: string;
	from: string;
	to: string;
	styles: {
		type: TransportTypes;
		color: string;
		backgroundColor: string;
	};
	departure: string;
	arriving: string;
	coords: {
		lng: number;
		lat: number;
	}[];
};
