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

	const pathsJSX = paths.map((path, i) => (
		<SearchResultItem
			itemIndex={i}
			selectedPath={selectedPath}
			setSelectedPath={setSelectedPath}
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
