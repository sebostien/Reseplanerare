import { NextPage } from 'next';
import * as React from 'react';
import { Marker } from 'react-map-gl';
import { ReturnGeoData } from '../pages/api/geoJson';
import { Stop } from '../util/DataTypes';

const DefaultIcon = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 24;

const getIcon = (
	stop: string,
	from: string,
	to: string,
): React.ReactElement => {
	if (stop === from || stop === to) {
		return (
			<svg
				height={SIZE}
				viewBox={`0 0 24 24`}
				style={{
					cursor: 'pointer',
					fill: '#fff',
					stroke: 'none',
					transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
				}}
			>
				<path d={DefaultIcon} />
			</svg>
		);
	}

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
			<circle cx={SIZE / 2} cy={SIZE / 2} r="4" fill="#999" />
		</svg>
	);
};

interface Props {
	geoJson: ReturnGeoData;
	fromStop: string;
	toStop: string;
}

// Only rerender markers if props.data has changed
const Pins: NextPage<Props> = (props) => {
	const { geoJson, fromStop, toStop } = props;

	const markers = React.useMemo(
		() =>
			geoJson.stops.map((stop: Stop) => {
				const Svg = getIcon(stop.name, fromStop, toStop);
				return (
					<Marker
						key={stop.name}
						longitude={stop.lng}
						latitude={stop.lat}
					>
						{Svg}
					</Marker>
				);
			}),
		[geoJson.stops, fromStop, toStop],
	);

	return <> {markers} </>;
};

export default Pins;
