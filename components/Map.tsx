import { NextPage } from 'next';
import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import { Line } from '../util/DataTypes';
import { LinePathFind } from '../util/pathFind';
import Lines from './Lines';
import Pins from './Pins';

interface Props {
	className?: string;
	fromStop: string;
	toStop: string;
	path: LinePathFind;
}

const Map: NextPage<Props> = (props) => {
	const [viewport, setViewport] = useState({
		latitude: 57.70465,
		longitude: 11.988482,
		zoom: 13.5,
	});

	const { fromStop, toStop, path } = props;

	return (
		<MapGL
			className={props.className}
			{...viewport}
			width="100%"
			height="100%"
			mapStyle="mapbox://styles/mapbox/dark-v9"
			// mapStyle="mapbox://styles/mapbox/streets-v11"
			// mapStyle="mapbox://styles/mapbox/navigation-night-v1"
			mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
			onViewportChange={setViewport}
		>
			<Pins path={path} fromStop={fromStop} toStop={toStop} />
			<Lines path={path.path} />
		</MapGL>
	);
};

export default Map;
