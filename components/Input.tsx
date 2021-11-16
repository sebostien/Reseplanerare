import * as React from 'react';
import { Stop } from '../util/DataTypes';

interface Props {
	stops: Stop[];
	name: string;
	placeholder: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: React.PropsWithChildren<Props>) => {
	const { stops } = props;
	const stopNames = stops.map(({ name }) => name) || [];
	return (
		<>
			<input
				list="dl-stops"
				className="m-1 p-1 w-full border-2 border-gray-400"
				name={props.name}
				placeholder={props.placeholder}
				value={props.value}
				onChange={(e) => {
					if (!stopNames.includes(e.target.value)) {
						e.target.classList.add('bg-red-100');
					} else {
						e.target.classList.remove('bg-red-100');
					}
					props.onChange(e);
				}}
			/>
			<datalist className="" id="dl-stops">
				{stops.map((stop) => {
					return (
						<option key={stop.name} value={stop.name}>
							{stop.name}
						</option>
					);
				})}
			</datalist>
		</>
	);
};

export default Input;
