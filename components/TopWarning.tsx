import { NextPage } from 'next';
import React, { ReactElement } from 'react';
import { Line } from '../util/DataTypes';
import { OUT_STOPS } from '../util/ParseData';

interface Props {
	path: Line[];
}

const TopWarning = (props: Props): JSX.Element => {
	let hasEvent = false;

	for (let line of props.path) {
		let e = OUT_STOPS.get(line.toStop.stopName);
		if (e && e.events.length !== 0) {
			hasEvent = true;
			break;
		}
	}

	if (!hasEvent) return <></>;

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
