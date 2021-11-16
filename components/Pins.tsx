import { NextPage } from 'next';
import * as React from 'react';
import { Marker } from 'react-map-gl';
import { ReturnGeoData } from '../pages/api/geoJson';
import { Line, Stop } from '../util/DataTypes';

const DefaultIcon = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z`;

const getIcon = (
	stop: string,
	from: string,
	to: string,
): React.ReactElement => {
	if (stop === from || stop === to) {
		// https://www.vasttrafik.se/Static/dist/map-marker-empty-blue-ac56c1522c4912d2a7dc68b95e05d84f.svg
		return (
			<svg
				height={24}
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox={`0 0 42 55`}
				style={{
					transform: `translate(-10px,-24px)`,
				}}
			>
				<g fill="#009ddb">
					<path
						d="M21,52.9c-3.4-6-15.8-28.2-15.8-36C5.2,8.2,12.3,1.1,21,1.1s15.8,7.1,15.8,15.8C36.8,24.6,24.4,46.9,21,52.9z"
						fillRule="evenodd"
						clipRule="evenodd"
					/>
					<path d="M21,2.1c8.2,0,14.8,6.6,14.8,14.8c0,6.4-9.5,24.5-14.8,33.9C15.7,41.4,6.2,23.3,6.2,16.9 C6.2,8.8,12.8,2.1,21,2.1 M21,0.1c-9.3,0-16.8,7.5-16.8,16.8s16.8,38,16.8,38s16.8-28.7,16.8-38S30.3,0.1,21,0.1L21,0.1z" />
				</g>
				<circle cx="21" cy="16.2" r="13.6" fill="#00394d" />
				<text
					x="50%"
					y="50%"
					fontSize="20px"
					dominantBaseline="text-after-edge"
					textAnchor="middle"
					fill="#ffffff"
				>
					{stop === from ? 'A' : 'B'}
				</text>
			</svg>
		);
	}
	const SIZE = 24;
	return (
		<svg
			height={SIZE}
			viewBox={`0 0 ${SIZE} ${SIZE}`}
			style={{
				cursor: 'pointer',
				fill: '#ff0',
				stroke: 'none',
				transform: `translate(${-SIZE / 2}px,${-SIZE / 2}px)`,
			}}
		>
			{/* <path d={ToIcon} /> */}
			<circle cx={SIZE / 2} cy={SIZE / 2} r="3" fill="#999" />
		</svg>
	);
};

const createMarker = (stop: Stop, from: string, to: string): JSX.Element => {
	const svg = getIcon(stop.name, from, to);
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
	path: Line[];
}

// Only rerender markers if props.data has changed
const Pins: NextPage<Props> = (props) => {
	const { geoJson, fromStop, toStop, path } = props;

	const markers = React.useMemo(() => {
		let stops = geoJson.stops;

		if (!path || path.length === 0) {
			return [...new Set([fromStop, toStop]).values()].map((stop) => {
				const s = geoJson.stops.filter(({ name }) => name == stop);

				if (s.length == 0) return <></>;

				return createMarker(s[0], fromStop, toStop);
			});
		}

		return stops
			.filter((stop) => stopOnPath(stop, path))
			.map((stop: Stop) => createMarker(stop, fromStop, toStop));
	}, [geoJson.stops, fromStop, toStop, path]);

	return <> {markers} </>;
};

export default Pins;
