import { NextPage } from 'next';
import * as React from 'react';
import Loading from './Loading';
import { ReturnGeoData } from '../pages/api/geoJson';
import { Line, Stop } from '../util/DataTypes';
import { timeBetween, timeToMinutes } from '../util/Time';
import { Path } from '../pages/api/pathFind';

const changeTransportType = (
	prev: null | Line,
	current: Line,
	stops: Record<string, Stop>,
) => {
	if (prev != null && prev.lineNumber == current.lineNumber) {
		return (
			<p key={current.from + current.to}>
				<span className={'font-bold p-1'}>{current.arriving}</span>
				<span className={stops[current.to].event ? 'text-red-500' : ''}>
					{current.to}
				</span>
			</p>
		);
	}

	return (
		<div key={current.from + current.to} className="pt-1">
			{(() => {
				if (prev !== null) {
					return (
						<p className="border-t-4 border-b-4 pl-2 border-dotted border-gray-500 mt-1 mb-3">
							Bytestid{' '}
							{timeBetween(current.departure, prev.arriving)} min
						</p>
					);
				}
				return '';
			})()}
			<p className="mb-2">
				<span
					style={current.styles}
					className="pt-1 pb-1 pr-2 pl-2 rounded-md"
				>
					{current.lineNumber}
				</span>
				<span className="ml-2">{current.lineName}</span>
			</p>
			<p>
				<span className={'font-bold p-1'}>{current.departure}</span>
				<span>{current.from}</span>
			</p>
			<p>
				<span className={'font-bold p-1'}>{current.arriving}</span>
				<span className={stops[current.to].event ? 'text-red-500' : ''}>
					{current.to}
				</span>
			</p>
		</div>
	);
};

interface PathProps {
	pathIndex: number;
	path: Path;
	stops: Record<string, Stop>;
	selectedPath: number;
	setSelectedPath: React.Dispatch<React.SetStateAction<number>>;
}

const Path = (props: PathProps): JSX.Element => {
	const { path, stops, selectedPath, setSelectedPath, pathIndex } = props;
	const { lines, hasEvent } = path;

	let prev: Line | null = null;
	const first = lines[0];
	const last = lines[lines.length - 1];
	return (
		<li
			className={
				'm-1 border border-gray-500 ' +
				(pathIndex == selectedPath ? 'bg-blue-100' : '')
			}
			key={first.lineName + '->' + last.lineName}
			onClick={() => setSelectedPath(pathIndex)}
		>
			<div className="py-2 px-3 flex justify-between">
				<div className="flex flex-nowrap flex-grow-1 pr-3 pb-1">
					{first.from}
				</div>
				<div className="text-right flex-grow-0 flex-shrink">
					<div className="">
						<span className="font-bold">{first.departure}</span>
						<span> - </span>
						<span className="">{last.arriving}</span>
					</div>
					<div className="">
						Restid {timeBetween(last.arriving, first.departure)} min
					</div>
				</div>
			</div>
			<div key={first.lineName} className="p-2 m-1 border-gray-500">
				{lines.map((stop) => {
					let change = changeTransportType(prev, stop, stops);
					prev = stop;
					return change;
				})}
			</div>
		</li>
	);
};

interface Props {
	geoJson: ReturnGeoData;
	paths: Path[];
	fromStop: string;
	toStop: string;
	selectedPath: number;
	setSelectedPath: React.Dispatch<React.SetStateAction<number>>;
}

const DisplayPath: NextPage<Props> = (props) => {
	const { geoJson, paths, fromStop, toStop, selectedPath, setSelectedPath } =
		props;

	if (!geoJson) return <Loading />;

	if (paths.length == 0 || paths[0].lines.length == 0) return <></>;

	const pathsJSX = paths.map((path, i) => (
		<Path
			stops={geoJson.stops}
			pathIndex={i}
			selectedPath={selectedPath}
			setSelectedPath={setSelectedPath}
			key={
				path.lines[0].lineName +
				path.lines[path.lines.length - 1].arriving
			}
			path={path}
		/>
	));

	return <ul className="list-none">{pathsJSX}</ul>;
};

export default DisplayPath;
