import AnimateHeight from 'react-animate-height';
import { Line, LineStyle, StopPoint, TransportTypes } from '../util/DataTypes';
import { OUT_STOPS, OUT_STYLES } from '../util/ParseData';
import { LinePathFind } from '../util/pathFind';
import TimeDate from '../util/Time';
import Image from 'next/image';
import LineSymbol from './LineSymbol';

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
			<div className="mb-2">
				<p className="">
					<LineSymbol lineNumber={current.lineNumber} />
					{[TransportTypes.WALK, TransportTypes.CYCLE].includes(
						current.lineName as TransportTypes,
					) ? (
						''
					) : (
						<span className=" inline-block align-bottom pl-2 mt-2">
							{current.lineName}
						</span>
					)}
				</p>
				{['CYCLE', 'WALK'].includes(current.lineNumber) ? (
					''
				) : (
					<p>
						<LineSymbol lineNumber="WHEELCHAIR" />
						<span className="inline-block align-middle pb-2 pl-2">
							{['CYCLE', 'WALK'].includes(current.lineNumber)
								? ''
								: `${
										Math.floor(Math.random() * 2) + 2
								  } lediga platser`}
						</span>
					</p>
				)}
			</div>
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
	linePath: LinePathFind;
}

const SearchResultItem = (props: PathProps): JSX.Element => {
	const { linePath, selectedPath, setSelectedPath, itemIndex } = props;
	const { path, hasEvent } = linePath;

	let prev: Line | null = null;
	const first = path[0];
	const last = path[path.length - 1];

	const lineNumbersss = [...new Set(path.map((l) => l.lineNumber))];
	if (hasEvent) lineNumbersss.unshift('EVENT');

	if (lineNumbersss.every((v) => !['CYCLE', 'WALK'].includes(v))) {
		lineNumbersss.push('WHEELCHAIR');
	}

	const lineNumbers = lineNumbersss.map((lineNumber) => {
		return <LineSymbol key={lineNumber} lineNumber={lineNumber} />;
	});

	const eventStationNames = path
		.filter((v) => v.toStop.events.length !== 0)
		.map((v) => v.toStop.stopName)
		.join(', ');

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
				<p className="px-3">
					{!hasEvent ? (
						<p className="pb-2">
							<span className="relative top-3">
								<Image
									width="36"
									height="36"
									alt="No traffic"
									src="/images/crowded-dark.png"
									className="inline-block"
								/>
							</span>
							{/* TODO: station name */}
							<span className="pl-2 inline-block">
								Denna resa undviker pågående evenmang
							</span>
						</p>
					) : (
						<span
							className="h-4 pl-8 bg-no-repeat"
							style={{
								backgroundImage:
									'url(/images/exclamation-triangle-orange-outline.svg)',
							}}
						>
							{`Denna resa kan drabbas av ökad trängsel och
							försening på grund av pågående evenemang vid ` + eventStationNames}
						</span>
					)}
				</p>
				<div className="h-4 text-center">
					<div className="inline-block w-4/5 border-b-2 border-gray-500">
						{' '}
					</div>
				</div>
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
			</AnimateHeight>
		</li>
	);
};

export default SearchResultItem;
