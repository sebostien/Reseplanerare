import React, { useState } from 'react';
import useSWR from 'swr';
import Loading from './Loading';
import MapNoSSR from '../components/NoSSR';
import DisplayPath from '../components/DisplayPath';
import Input from '../components/Input';
import { ApiPath } from '../pages/api/pathFind';
import { Stop } from '../util/DataTypes';
import { ReturnGeoData } from '../pages/api/geoJson';
import { parseTime } from '../util/Time';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const usePathSWR = (
	stops: Record<string, Stop>,
	fromStop: string,
	toStop: string,
	time: string,
): ApiPath => {
	const { data, error } = useSWR(
		`/api/pathFind?from=${fromStop}&to=${toStop}&time=${time}`,
		fetcher,
	);
	const stopNames = Object.keys(stops);
	if (!stopNames.includes(fromStop) || !stopNames.includes(toStop))
		return { paths: [] };

	if (data === undefined) return { paths: [] };

	return data;
};

const Main = () => {
	const { data, error } = useSWR<ReturnGeoData>('/api/geoJson', fetcher);
	let [fromStop, setFromStop] = useState('Svingeln');
	let [toStop, setToStop] = useState('Sankt Sigfrids plan');
	let [selectedPath, setSelectedPath] = useState(0);

	// TODO: Update time with input and use in request
	let [startTime, setStartTime] = useState('16:30');
	const { paths } = usePathSWR(
		data?.stops || {},
		fromStop,
		toStop,
		startTime,
	);

	if (!data) return <Loading />;

	return (
		<div className="flex min-h-screen">
			<div className="flex-initial p-1 h-screen overflow-y-scroll overflow-x-hidden">
				<Input
					stops={data.stops}
					value={fromStop}
					name="from"
					onChange={(t) => {
						setSelectedPath(0);
						setFromStop(t.target.value);
					}}
					placeholder="Från..."
				/>
				<Input
					stops={data.stops}
					value={toStop}
					name="to"
					onChange={(t) => {
						setSelectedPath(0);
						setToStop(t.target.value);
					}}
					placeholder="Till..."
				/>
				<input
					className="m-1 p-1 w-full border-2 border-gray-400"
					value={startTime}
					type="text"
					name="time"
					onChange={(t) => {
						setSelectedPath(0);
						setStartTime(t.target.value);
					}}
					placeholder="Tid..."
				/>
				<DisplayPath
					paths={paths}
					geoJson={data}
					fromStop={fromStop}
					toStop={toStop}
					selectedPath={selectedPath}
					setSelectedPath={setSelectedPath}
				/>
			</div>
			<div className="flex-initial p-2 w-full h-screen">
				<MapNoSSR
					selectedPath={selectedPath}
					paths={paths}
					geoJson={data}
					fromStop={fromStop}
					toStop={toStop}
				/>
			</div>
		</div>
	);
};

export default Main;
