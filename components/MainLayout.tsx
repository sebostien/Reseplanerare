import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapNoSSR from '../components/NoSSR';
import DisplayPath from '../components/DisplayPath';
import Input from '../components/Input';
import { OUT_STOPS } from '../util/ParseData';
import pathFind from '../util/pathFind';
import { Line } from '../util/DataTypes';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Main = () => {
	let [fromStop, setFromStop] = useState('Svingeln');
	let [toStop, setToStop] = useState('Sankt Sigfrids Plan');
	let [selectedPath, setSelectedPath] = useState(0);
	let [startTime, setStartTime] = useState('16:30');
	let [paths, setPaths] = useState<Line[][]>([]);
	let [isMounted, setIsMounted] = useState(false);

	useMemo(() => {
		if (!isMounted) return;
		if (startTime.length != 5) return;
		const pp = pathFind(fromStop, toStop, startTime);
		setPaths(pp);
	}, [fromStop, toStop, startTime, isMounted]);

	useEffect(() => {
		setIsMounted(true);

		return () => setIsMounted(false);
	}, []);

	return (
		<div className="flex min-h-screen">
			<div className="flex-initial p-1 h-screen overflow-y-scroll overflow-x-hidden">
				<Input
					stops={OUT_STOPS}
					value={fromStop}
					name="from"
					onChange={(t) => {
						setSelectedPath(0);
						setFromStop(t.target.value);
					}}
					placeholder="Från..."
				/>
				<Input
					stops={OUT_STOPS}
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
					selectedPath={selectedPath}
					setSelectedPath={setSelectedPath}
				/>
			</div>
			<div className="flex-initial p-2 w-full h-screen">
				<MapNoSSR
					path={paths[selectedPath] || []}
					fromStop={fromStop}
					toStop={toStop}
				/>
			</div>
		</div>
	);
};

export default Main;
