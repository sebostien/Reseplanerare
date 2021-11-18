interface Props {
	height: number;
	viewBox: string;
	style?: {
		background?: string;
		transform?: string;
		fill?: string;
		stroke?: string;
	};
	children: JSX.Element | JSX.Element[];
}

const Svg = (props: Props) => {
	const { height, viewBox, style } = props;
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			height={height}
			viewBox={viewBox}
			style={style}
			cursor="pointer"
		>
			{props.children}
		</svg>
	);
};

export default Svg;
