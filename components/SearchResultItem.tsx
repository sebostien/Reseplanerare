import { Line, LineStyle, StopPoint } from '../util/DataTypes';
import { OUT_STOPS, OUT_STYLES } from '../util/ParseData';
import TimeDate from '../util/Time';

const changeTransportType = (prev: null | Line, current: Line, key: string) => {
	if (prev != null && prev.lineNumber == current.lineNumber) {
		return (
			<p
				key={
					key +
					current.fromStop.stopName +
					current.departure.hhmm() +
					current.toStop.stopName +
					current.arriving.hhmm()
				}
			>
				<span className={'font-bold p-1'}>
					{current.arriving.hhmm()}
				</span>
				<span
					className={
						(OUT_STOPS.get(current.toStop.stopName) as StopPoint)
							.events.length > 0
							? 'text-red-500'
							: ''
					}
				>
					{current.toStop.stopName}
				</span>
			</p>
		);
	}

	const styles = OUT_STYLES.get(current.lineNumber) as LineStyle;

	return (
		<div
			key={
				key +
				current.fromStop.stopName +
				current.departure.hhmm() +
				current.toStop.stopName +
				current.arriving.hhmm()
			}
			className="pt-1"
		>
			{(() => {
				if (prev !== null) {
					return (
						// TODO: format? hours minutes?
						<p className="border-t-4 border-b-4 pl-2 border-dotted border-gray-500 mt-1 mb-3">
							Bytestid{' '}
							{TimeDate.timeBetween(
								prev.arriving,
								current.departure,
							).hhmm()}{' '}
							min
						</p>
					);
				}
				return '';
			})()}
			<p className="mb-2">
				<span style={styles} className="pt-1 pb-1 pr-2 pl-2 rounded-md">
					{current.lineNumber}
				</span>
				<span className="ml-2">{current.lineName}</span>
			</p>
			<p>
				<span className={'font-bold p-1'}>
					{current.departure.hhmm()}
				</span>
				<span>{current.fromStop.stopName}</span>
			</p>
			<p>
				<span className={'font-bold p-1'}>
					{current.arriving.hhmm()}
				</span>
				<span
					className={
						OUT_STOPS.get(current.toStop.stopName)?.events
							.length !== 0
							? 'text-red-500'
							: ''
					}
				>
					{current.toStop.stopName}
				</span>
			</p>
		</div>
	);
};

interface PathProps {
	itemIndex: number;
	selectedPath: number;
	setSelectedPath: React.Dispatch<number>;
	path: Line[];
}

const SearchResultItem = (props: PathProps): JSX.Element => {
	const { path, selectedPath, setSelectedPath, itemIndex } = props;

	let prev: Line | null = null;
	const first = path[0];
	const last = path[path.length - 1];

	return (
		<li
			className={
				'm-1 border border-gray-500 ' +
				(itemIndex == selectedPath ? 'bg-blue-100' : '')
			}
			key={
				first.lineName +
				first.departure.hhmm() +
				'->' +
				last.lineName +
				last.arriving.hhmm()
			}
			onClick={() => setSelectedPath(itemIndex)}
		>
			<div className="p-3 flex justify-between">
				<div className="flex flex-nowrap flex-grow-1 pr-3 pb-1">
					{first.fromStop.stopName}
				</div>
				<div className="text-right flex-grow-0 flex-shrink">
					<div className="">
						<span className="font-bold">
							{first.departure.hhmm()}
						</span>
						<span> - </span>
						<span className="">{last.arriving.hhmm()}</span>
					</div>
					<div className="">
						Restid{' '}
						{TimeDate.timeBetween(
							last.arriving,
							first.departure,
						).hm()}
					</div>
				</div>
			</div>
			<div
				// TODO: transition height
				className={
					'm-3 border-gray-500 overflow-hidden ' +
					(itemIndex === selectedPath ? '' : 'h-0')
				}
			>
				{path.map((stop) => {
					let change = changeTransportType(
						prev,
						stop,
						last.arriving.hhmm(),
					);
					prev = stop;
					return change;
				})}
			</div>
		</li>
	);
};

export default SearchResultItem;
