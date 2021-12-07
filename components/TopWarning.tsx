import { NextPage } from 'next';
import React, { ReactElement } from 'react';
import { Line } from '../util/DataTypes';
import { OUT_STOPS } from '../util/ParseData';
import { LinePathFind } from '../util/pathFind';

interface Props {
	path: LinePathFind;
}

const TopWarning = (props: Props): JSX.Element => {
	if (!props.path.hasEvent) return <></>;

	return (
		<div className="p-2">
			<span
				className="block bg-no-repeat pl-10"
				style={{
					backgroundImage:
						'url(/images/exclamation-triangle-orange-outline.svg)',
				}}
			>
				Vissa resor påverkas av evenemang
			</span>
		</div>
	);
};

export default TopWarning;
