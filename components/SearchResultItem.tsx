import AnimateHeight from 'react-animate-height';
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

interface ExpandButtonProps {
	expanded: boolean;
	onClick: () => void;
}

const ExpandButton = (props: ExpandButtonProps) => {
	const style = {
		backgroundImage: '',
	};

	if (props.expanded) {
		style.backgroundImage = 'url(/images/minus-circle-blue.svg)';
	} else {
		style.backgroundImage = 'url(/images/plus-circle-blue.svg)';
	}

	return (
		<button
			onClick={props.onClick}
			className="mt-2 w-8 h-8 float-right"
			style={style}
		/>
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

	const lineNumbers = [...new Set(path.map((l) => l.lineNumber))].map(
		(lineNumber) => {
			let style = OUT_STYLES.get(lineNumber) as LineStyle;
			return (
				<span
					key={lineNumber}
					style={style}
					className="mr-1 py-1 px-2 rounded-md"
				>
					{lineNumber}
				</span>
			);
		},
	);

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
		>
			<div className="p-3 flex justify-between">
				<div className="pb-1">
					<div>{first.fromStop.stopName}</div>
					<div className="py-2">{lineNumbers}</div>
				</div>
				<div className="">
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
					<ExpandButton
						onClick={() =>
							itemIndex === selectedPath
								? setSelectedPath(-1)
								: setSelectedPath(itemIndex)
						}
						expanded={itemIndex === selectedPath}
					/>
				</div>
			</div>
			<AnimateHeight
				duration={200}
				height={itemIndex === selectedPath ? 'auto' : 0}
			>
				<div className="h-4 text-center">
					<div className="inline-block w-4/5 border-b-2 border-gray-500">
						{' '}
					</div>
				</div>
				<div>
					<div className={'m-3 border-gray-500 overflow-hidden'}>
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
				</div>
			</AnimateHeight>
		</li>
	);
};

export default SearchResultItem;
