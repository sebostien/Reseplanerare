import { NextPage } from 'next';
import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import { ReturnGeoData } from '../pages/api/geoJson';
import { Line } from '../util/DataTypes';
import Lines from './Lines';
import Pins from './Pins';

interface Props {
	className?: string;
	geoJson: ReturnGeoData;
	fromStop: string;
	toStop: string;
	paths: Line[][];
	selectedPath: number;
}

const Map: NextPage<Props> = (props) => {
	const [viewport, setViewport] = useState({
		latitude: 57.70465,
		longitude: 11.988482,
		zoom: 13.5,
	});

	const { geoJson, fromStop, toStop, paths, selectedPath } = props;

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
			<Pins
				path={paths[selectedPath]}
				geoJson={geoJson}
				fromStop={fromStop}
				toStop={toStop}
			/>
			<Lines
				selectedPath={selectedPath}
				geoJson={geoJson}
				fromStop={fromStop}
				toStop={toStop}
				paths={paths}
			/>
		</MapGL>
	);
};

export default Map;
