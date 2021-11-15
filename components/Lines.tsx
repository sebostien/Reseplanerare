import { NextPage } from 'next';
import React, { ReactElement, useState } from 'react';
import { Source, Layer, LayerProps } from 'react-map-gl';
import { ReturnGeoData } from '../pages/api/geoJson';
import { Line, Stop } from '../util/DataTypes';
import _ from 'lodash';

interface Props {
	geoJson: ReturnGeoData;
	fromStop: string;
	toStop: string;
	paths: Line[][];
}

const Lines: NextPage<Props> = (props) => {
	const { geoJson, paths, fromStop, toStop } = props;

	// TODO: add selected path

	const allLines = new Map<string, GeoJSON.Feature[]>();

	if (paths.length === 0 || paths[0].length === 0) return <></>;

	const allLayers: ReactElement[] = [];

	for (let i = 0; i < paths.length; i++) {
		const lineName = new Set(paths[i].map((v) => v.lineName));

		for (let name of lineName) {
			const lineLayer: LayerProps = {
				type: 'line',
				id: name,
				source: 'mapbox',
				layout: {
					'line-join': 'round',
					'line-cap': 'round',
				},
				filter: ['==', name, ['get', 'name']],
				paint: {
					'line-color': paths[i].filter((v) => v.lineName == name)[0]
						.styles.backgroundColor,
					'line-width': 5,
				},
			};

			allLayers.push(<Layer {...lineLayer} key={name} />);
		}

		for (let line of paths[i]) {
			let lii = allLines.get(line.lineName);
			if (!lii) {
				lii = [];
			}

			let coords = [];
			let fromCoords = geoJson.stops.filter(
				({ name }: Stop) => name === line.from,
			)[0];
			coords.push([fromCoords.lng, fromCoords.lat]);
			coords = coords.concat(
				line.coords.map(({ lng, lat }) => [lng, lat]),
			);
			let toCoords = geoJson.stops.filter(
				({ name }: Stop) => name === line.to,
			)[0];
			coords.push([toCoords.lng, toCoords.lat]);

			lii.push({
				type: 'Feature',
				properties: {
					name: line.lineName,
				},
				geometry: {
					type: 'LineString',
					coordinates: coords,
				},
			});

			allLines.set(line.lineName, lii);
		}
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
