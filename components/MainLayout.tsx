import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapNoSSR from '../components/NoSSR';
import DisplayPath from '../components/DisplayPath';
import Input from '../components/Input';
import { OUT_STOPS } from '../util/ParseData';
import pathFind, { LinePathFind } from '../util/pathFind';
import Svg from './Svg';
import TopWarning from './TopWarning';
import SearchInput from './SearchInput';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Main = () => {
	let [fromStop, setFromStop] = useState('Svingeln');
	let [toStop, setToStop] = useState('Sankt Sigfrids Plan');
	let [selectedPath, setSelectedPath] = useState(-1);
	let [startTime, setStartTime] = useState('16:39');
	let [paths, setPaths] = useState<LinePathFind[]>([]);
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
			<div className="flex-initial p-1 h-screen overflow-y-scroll w-4/6 overflow-x-hidden">
				<SearchInput
					fromStop={fromStop}
					setFromStop={setFromStop}
					toStop={toStop}
					setToStop={setToStop}
					selectedPath={selectedPath}
					setSelectedPath={setSelectedPath}
					startTime={startTime}
					setStartTime={setStartTime}
				/>
				<TopWarning paths={paths} />
				<DisplayPath
					paths={paths}
					selectedPath={selectedPath}
					setSelectedPath={setSelectedPath}
				/>
			</div>
			<div className="flex-initial w-full h-screen">
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
