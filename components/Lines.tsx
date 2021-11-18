import { NextPage } from 'next';
import React, { ReactElement, useState } from 'react';
import { Source, Layer, LayerProps } from 'react-map-gl';
import { Coord, Line, LineStyle, StopPoint } from '../util/DataTypes';
import _ from 'lodash';
import { OUT_STOPS, OUT_STYLES, styleHash } from '../util/ParseData';

interface Props {
	path: Line[];
}

const Lines: NextPage<Props> = (props) => {
	const { path } = props;

	const allLines = new Map<string, GeoJSON.Feature[]>();

	if (path.length === 0) return <></>;

	const allLayers: ReactElement[] = [];
	const lineNumbers = new Set(path.map(({ lineNumber }) => lineNumber));

	for (const lineNumber of lineNumbers) {
		const style = OUT_STYLES.get(styleHash(lineNumber)) as LineStyle;

		const lineLayer: LayerProps = {
			type: 'line',
			id: 'line-' + lineNumber,
			source: 'mapbox',
			layout: {
				'line-join': 'round',
				'line-cap': 'round',
			},
			filter: ['==', lineNumber, ['get', 'lineNumber']],
			paint: {
				'line-color': style.backgroundColor,
				'line-width': 5,
			},
		};

		allLayers.push(
			<Layer {...lineLayer} key={'Layer-line-' + lineNumber} />,
		);
	}

	for (let line of path) {
		let lii = allLines.get(line.lineName);
		if (!lii) {
			lii = [];
		}

		let coords: Coord[] = [];
		let fromCoords = OUT_STOPS.get(line.fromStop.stopName)?.coords as Coord;
		coords.push(fromCoords);

		// TODO: add coords from LinePath
		// coords = coords.concat(line.coords.map(({ lng, lat }) => [lng, lat]));

		let toCoords = OUT_STOPS.get(line.toStop.stopName)?.coords as Coord;
		coords.push(toCoords);

		lii.push({
			type: 'Feature',
			properties: {
				lineNumber: line.lineNumber,
			},
			geometry: {
				type: 'LineString',
				coordinates: coords,
			},
		});

		allLines.set(line.lineName, lii);
	}

	const data: GeoJSON.FeatureCollection = {
		type: 'FeatureCollection',
		features: _.flatten([...allLines.values()]),
	};

	return (
		<Source id="polylineLayer" type="geojson" data={data}>
			{allLayers}
		</Source>
	);
};

export default Lines;
