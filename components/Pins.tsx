import { NextPage } from 'next';
import { Marker } from 'react-map-gl';
import { Line, StopPoint } from '../util/DataTypes';
import { OUT_STOPS } from '../util/ParseData';
import PinIcon from './PinIcon';
import _ from 'lodash';
import { PropsWithChildren, useMemo } from 'react';
import { LinePathFind } from '../util/pathFind';

const DefaultIcon = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z`;

const createMarker = (
	stop: StopPoint,
	from: string,
	to: string,
	hasEvent: boolean,
): JSX.Element => {
	const svg = (
		<PinIcon stop={stop.stopName} from={from} to={to} hasEvent={hasEvent} />
	);

	return (
		<Marker
			key={stop.stopName}
			longitude={stop.coords[0]}
			latitude={stop.coords[1]}
		>
			{svg}
		</Marker>
	);
};

interface Props {
	fromStop: string;
	toStop: string;
	path: LinePathFind;
}

const Pins = (props: PropsWithChildren<Props>) => {
	const { fromStop, toStop, path } = props;

	const markers = useMemo(() => {
		const stops = new Set<StopPoint>(
			_.flatten(
				path?.path?.map(({ fromStop, toStop }) => [fromStop, toStop]) ||
					[],
			),
		);

		if (OUT_STOPS.has(fromStop))
			stops.add(OUT_STOPS.get(fromStop) as StopPoint);

		if (OUT_STOPS.has(toStop))
			stops.add(OUT_STOPS.get(toStop) as StopPoint);

		return [...stops.values()].map((stop: StopPoint) =>
			createMarker(
				stop,
				fromStop,
				toStop,
				stop.events.length !== 0 && path.hasEvent,
			),
		);
	}, [fromStop, toStop, path]);

	return <> {markers} </>;
};

export default Pins;
