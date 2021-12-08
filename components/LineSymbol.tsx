import { LineStyle, TransportTypes } from '../util/DataTypes';
import { OUT_STYLES } from '../util/ParseData';

interface Props {
	lineNumber: string | 'EVENT';
}

const LineSymbol = (props: Props): JSX.Element => {
	const { lineNumber } = props;

	let style = OUT_STYLES.get(lineNumber) as LineStyle;

	if (lineNumber === TransportTypes.WALK) {
		return (
			<div
				className="inline-block w-8 h-8 bg-no-repeat"
				style={{
					backgroundImage: 'url(/images/walk-dark.svg)',
				}}
			/>
		);
	}

	if (lineNumber === TransportTypes.CYCLE) {
		return (
			<div
				className="inline-block w-8 h-8 bg-no-repeat"
				style={{
					backgroundImage: 'url(/images/bike-dark.svg)',
				}}
			/>
		);
	}

	if (lineNumber === 'EVENT')
		return (
			<div
				className="inline-block w-8 h-8 bg-no-repeat mt-2"
				style={{
					backgroundImage:
						'url(/images/exclamation-triangle-orange-outline.svg)',
				}}
			/>
		);

	if (lineNumber === 'WHEELCHAIR')
		return (
			<div
				className="inline-block w-8 h-8 bg-no-repeat mt-2"
				style={{
					backgroundImage: 'url(/images/wheelchair-dark.svg)',
				}}
			/>
		);

	return (
		<div
			style={style}
			className="w-8 h-8 align-top text-center m-1 py-1 rounded-md  inline-block"
		>
			{lineNumber}
		</div>
	);
};

export default LineSymbol;
