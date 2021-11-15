import React, { useState } from 'react';
import useSWR from 'swr';
import Loading from './Loading';
import MapNoSSR from '../components/NoSSR';
import DisplayPath from '../components/DisplayPath';
import Input from '../components/Input';
import { ApiPath } from '../pages/api/pathFind';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const usePathSWR = (
	fromStop: string,
	toStop: string,
	time: string,
): ApiPath => {
	const { data, error } = useSWR(
		`/api/pathFind?from=${fromStop}&to=${toStop}&time=${time}`,
		fetcher,
	);

	if (!fromStop || !toStop) return { paths: [] };

	if (data === undefined) return { paths: [] };

	return data;
};

const Main = () => {
	const { data, error } = useSWR('/api/geoJson', fetcher);
	let [fromStop, setFromStop] = useState('Svingeln');
	let [toStop, setToStop] = useState('Sankt Sigfrids plan');

	// TODO: Update time with input and use in request
	let [startTime, setStartTime] = useState('16:30');
	const { paths } = usePathSWR(fromStop, toStop, startTime);

	if (!data) return <Loading />;

	const handleChange = (t: React.ChangeEvent<HTMLSelectElement>) => {
		if (t.target.name === 'from') setFromStop(t.target.value);
		if (t.target.name === 'to') setToStop(t.target.value);
	};

	return (
		<div className="flex min-h-screen">
			<div className="flex-initial p-1">
				<Input
					stops={data.stops}
					value={fromStop}
					name="from"
					onChange={handleChange}
					placeholder="Från..."
				/>
				<Input
					stops={data.stops}
					value={toStop}
					name="to"
					onChange={handleChange}
					placeholder="Till..."
				/>
				<input
					className="m-1 p-1 w-full border-2 border-gray-400"
					value={startTime}
					type="text"
					name="time"
					onChange={(t) => setStartTime(t.target.value)}
				/>
				<DisplayPath
					paths={paths}
					geoJson={data}
					fromStop={fromStop}
					toStop={toStop}
				/>
			</div>
			<div className="flex-initial p-2 w-full h-screen">
				<MapNoSSR
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
