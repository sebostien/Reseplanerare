import { LineStyle, TransportTypes } from '../util/DataTypes';
import { OUT_STYLES } from '../util/ParseData';

interface Props {
	lineNumber: string;
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

	return (
		<span style={style} className="mr-1 py-1 px-2 rounded-md">
			{lineNumber}
		</span>
	);
};

export default LineSymbol;
