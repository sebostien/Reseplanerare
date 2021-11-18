import { NextPage } from 'next';
import * as React from 'react';
import Loading from './Loading';
import { Line } from '../util/DataTypes';
import SearchResultItem from './SearchResultItem';

interface Props {
	paths: Line[][];
	selectedPath: number;
	setSelectedPath: React.Dispatch<React.SetStateAction<number>>;
}

const DisplayPath: NextPage<Props> = (props) => {
	const { paths, selectedPath, setSelectedPath } = props;

	if (!paths) return <Loading />;

	if (paths.length == 0 || paths[0].length == 0) return <></>;

	const pathsJSX = paths.map((path, i) => (
		<SearchResultItem
			itemIndex={i}
			selectedPath={selectedPath}
			setSelectedPath={setSelectedPath}
			key={
				path[0].departure.hhmm() +
				path[0].lineName +
				path[path.length - 1].arriving.hhmm()
			}
			path={path}
		/>
	));

	return <ul className="list-none">{pathsJSX}</ul>;
};

export default DisplayPath;
