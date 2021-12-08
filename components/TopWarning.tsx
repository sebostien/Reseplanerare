import { NextPage } from 'next';
import React, { ReactElement } from 'react';
import { Line } from '../util/DataTypes';
import { OUT_STOPS } from '../util/ParseData';
import { LinePathFind } from '../util/pathFind';

interface Props {
	paths: LinePathFind[];
}

const TopWarning = (props: Props): JSX.Element => {
	if (!props.paths.some((v) => v.hasEvent)) return <></>;

	return (
		<span
			className="ml-2 pl-8 bg-no-repeat"
			style={{
				backgroundImage:
					'url(/images/exclamation-triangle-orange-outline.svg)',
			}}
		>
			Ett eller flera resultat kan påverkas av pågående evenemang
		</span>
	);
};

export default TopWarning;
