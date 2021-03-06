import { OUT_STOPS } from '../util/ParseData';

interface Props {
	fromStop: string;
	setFromStop: React.Dispatch<React.SetStateAction<string>>;
	toStop: string;
	setToStop: React.Dispatch<React.SetStateAction<string>>;
	selectedPath: number;
	setSelectedPath: React.Dispatch<React.SetStateAction<number>>;
	startTime: string;
	setStartTime: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = (props: Props): JSX.Element => {
	const {
		fromStop,
		setFromStop,
		toStop,
		setToStop,
		setSelectedPath,
		startTime,
		setStartTime,
	} = props;

	return (
		<div className="p-1">
			<datalist id="dl-stops">
				{[...OUT_STOPS.keys()].map((stop) => {
					return (
						<option key={stop} value={stop}>
							{stop}
						</option>
					);
				})}
			</datalist>
			<input
				list="dl-stops"
				className="p-1 w-full border-2 border-gray-400"
				name="from"
				value={fromStop}
				onChange={(e) => {
					if (![...OUT_STOPS.keys()].includes(e.target.value)) {
						e.target.classList.add('bg-red-100');
					} else {
						e.target.classList.remove('bg-red-100');
					}
					setSelectedPath(-1);
					setFromStop(e.target.value);
				}}
			/>
			<input
				list="dl-stops"
				className="mt-1 p-1 w-full border-2 border-gray-400"
				name="to"
				value={toStop}
				onChange={(e) => {
					if (![...OUT_STOPS.keys()].includes(e.target.value)) {
						e.target.classList.add('bg-red-100');
					} else {
						e.target.classList.remove('bg-red-100');
					}
					setSelectedPath(-1);
					setToStop(e.target.value);
				}}
			/>
			<input
				className="mt-1 p-1 w-full border-2 border-gray-400"
				value={startTime}
				type="text"
				name="time"
				onChange={(t) => {
					setSelectedPath(-1);
					setStartTime(t.target.value);
				}}
				placeholder="hh:mm"
			/>
		</div>
	);
};

export default SearchInput;
