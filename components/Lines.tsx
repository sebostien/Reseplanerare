import { NextPage } from 'next';
import React, { ReactElement, useState } from 'react';
import { Source, Layer, LayerProps } from 'react-map-gl';
import { ReturnGeoData } from '../pages/api/geoJson';
import { Line, Stop } from '../util/DataTypes';
import _ from 'lodash';
import { Path } from '../pages/api/pathFind';

interface Props {
	geoJson: ReturnGeoData;
	fromStop: string;
	toStop: string;
	paths: Path[];
	selectedPath: number;
}

const Lines: NextPage<Props> = (props) => {
	const { geoJson, paths, fromStop, toStop, selectedPath } = props;

	// TODO: add selected path

	const allLines = new Map<string, GeoJSON.Feature[]>();

	if (paths.length === 0 || paths[0].lines.length === 0) return <></>;

	const allLayers: ReactElement[] = [];

	// for (let i = 0; i < paths.length; i++) {
	for (let i = selectedPath; i <= selectedPath; i++) {
		const lineName = new Set(
			paths[i].lines.map(({ lineName }) => lineName),
		);

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
					'line-color': paths[i].lines.filter(
						(v) => v.lineName == name,
					)[0].styles.backgroundColor,
					'line-width': 5,
				},
			};

			allLayers.push(<Layer {...lineLayer} key={name} />);
		}

		for (let line of paths[i].lines) {
			let lii = allLines.get(line.lineName);
			if (!lii) {
				lii = [];
			}

			let coords = [];
			let fromCoords = geoJson.stops[line.from];

			coords.push([fromCoords.lng, fromCoords.lat]);
			coords = coords.concat(
				line.coords.map(({ lng, lat }) => [lng, lat]),
			);
			let toCoords = geoJson.stops[line.to];

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
