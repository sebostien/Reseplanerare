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
		<div className="md:flex min-h-screen overflow-hidden">
			<div className="md:flex-initial p-1 pr-2 md:h-screen md:overflow-y-scroll md:w-4/6 md:overflow-x-hidden">
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
			<div className="md:flex-initial w-full md:h-screen h-96">
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
