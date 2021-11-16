import { NextPage } from 'next';
import * as React from 'react';
import { Marker } from 'react-map-gl';
import { ReturnGeoData } from '../pages/api/geoJson';
import { Path } from '../pages/api/pathFind';
import { Line, Stop } from '../util/DataTypes';
import PinIcon from './PinIcon';

const DefaultIcon = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z`;

const createMarker = (
	stop: Stop,
	from: string,
	to: string,
	hasEvent: boolean,
): JSX.Element => {
	const svg = (
		<PinIcon stop={stop.name} from={from} to={to} hasEvent={hasEvent} />
	);
	return (
		<Marker key={stop.name} longitude={stop.lng} latitude={stop.lat}>
			{svg}
		</Marker>
	);
};

const stopOnPath = (stop: Stop, path: Line[]): boolean => {
	for (let line of path) {
		if (line.from == stop.name || line.to == stop.name) return true;
	}

	return false;
};

interface Props {
	geoJson: ReturnGeoData;
	fromStop: string;
	toStop: string;
	path: Path;
}

// Only rerender markers if props.data has changed
const Pins: NextPage<Props> = (props) => {
	const { geoJson, fromStop, toStop, path } = props;

	const markers = React.useMemo(() => {
		let stops = geoJson.stops;

		if (!path || path.lines.length === 0) {
			return [...new Set([fromStop, toStop]).values()].map((stop) => {
				const s = stops[stop];

				if (s == undefined) return <></>;

				return createMarker(s, fromStop, toStop, false);
			});
		}

		return Object.values(stops)
			.filter((stop) => stopOnPath(stop, path.lines))
			.map((stop: Stop) =>
				createMarker(stop, fromStop, toStop, stop.event !== undefined),
			);
	}, [geoJson.stops, fromStop, toStop, path]);

	return <> {markers} </>;
};

export default Pins;
