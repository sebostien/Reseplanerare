import { NextPage } from 'next';
import * as React from 'react';
import { Stop } from '../util/DataTypes';

interface Props {
	stops: Stop[];
	name: string;
	placeholder: string;
	value: string | number;
	onChange: (a: any) => void;
}

const Input: NextPage<Props> = (props) => {
	const { stops } = props;

	return (
		<select
			className="m-1 p-1 w-full border-2 border-gray-400"
			name={props.name}
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
		>
			{stops.map((stop) => {
				return (
					<option key={stop.name} value={stop.name}>
						{stop.name}
					</option>
				);
			})}
		</select>
	);
};

export default Input;
