import { NextPage } from 'next';
import * as React from 'react';
import Loading from './Loading';
import { Line } from '../util/DataTypes';
import SearchResultItem from './SearchResultItem';
import { LinePathFind } from '../util/pathFind';

interface Props {
	paths: LinePathFind[];
	selectedPath: number;
	setSelectedPath: React.Dispatch<React.SetStateAction<number>>;
}

const DisplayPath: NextPage<Props> = (props) => {
	const { paths, selectedPath, setSelectedPath } = props;

	if (!paths) return <Loading />;

	if (paths.length == 0 || paths[0].path.length == 0) return <></>;

	let showEvents = false;

	if (props.paths.some((v) => v.hasEvent)) showEvents = true;

	const eventStationNames = [
		...new Set(
			paths
				.map((line) => {
					return line.path
						.filter((v) => v.toStop.events.length !== 0)
						.map((v) => v.toStop.stopName)
						.join(', ');
				})
				.filter((v) => v.length > 0),
		).values(),
	].join(', ');
	console.log(eventStationNames);

	const pathsJSX = paths.map((path, i) => (
		<SearchResultItem
			itemIndex={i}
			showEvents={showEvents}
			selectedPath={selectedPath}
			setSelectedPath={setSelectedPath}
			eventStationNames={eventStationNames}
			key={
				path.path[0].departure.hhmm() +
				path.path[0].lineName +
				path.path[path.path.length - 1].arriving.hhmm()
			}
			linePath={path}
		/>
	));

	return <ul className="list-none">{pathsJSX}</ul>;
};

export default DisplayPath;
