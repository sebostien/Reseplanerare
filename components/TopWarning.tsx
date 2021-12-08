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
		<div className="p-2 flex">
			<span
				className="inline-block w-8 h-8 bg-no-repeat"
				style={{
					backgroundImage:
						'url(/images/exclamation-triangle-orange-outline.svg)',
				}}
			></span>
			<span className="pl-2">
				Ett eller flera resultat kan påverkas av pågående evenemang
			</span>
		</div>
	);
};

export default TopWarning;
