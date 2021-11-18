import Image from 'next/image';
import Svg from './Svg';

const getEventIcon = (): JSX.Element => {
	// https://www.svgrepo.com/svg/37856/ticket
	return (
		<Svg
			height={32}
			viewBox="0 0 297 297"
			style={{
				background: 'black',
				transform: `translate(-50%,-50%)`,
			}}
		>
			<g fill="#ffffff">
				<path d="M286.542,69.021c-13.263,0-24.053-10.79-24.053-24.053c0-5.775-4.683-10.458-10.457-10.458H44.969   c-5.775,0-10.458,4.683-10.458,10.458c0,13.263-10.79,24.053-24.053,24.053C4.683,69.021,0,73.703,0,79.479v138.043   c0,5.775,4.683,10.457,10.458,10.457c13.263,0,24.053,10.79,24.053,24.053c0,5.775,4.683,10.458,10.458,10.458h207.063   c5.774,0,10.457-4.683,10.457-10.458c0-13.263,10.79-24.053,24.053-24.053c5.775,0,10.458-4.682,10.458-10.457V79.479   C297,73.703,292.317,69.021,286.542,69.021z M276.085,208.291c-16.413,3.924-29.359,16.87-33.283,33.283H54.198   c-3.924-16.413-16.87-29.359-33.283-33.283V88.709c16.413-3.924,29.359-16.87,33.283-33.283h188.604   c3.924,16.413,16.87,29.359,33.283,33.283V208.291z" />
				<path d="M53.596,107.191h26.046c5.775,0,10.457-4.682,10.457-10.457c0-5.775-4.682-10.458-10.457-10.458H53.596   c-5.775,0-10.458,4.683-10.458,10.458C43.138,102.51,47.82,107.191,53.596,107.191z" />
				<path d="M108.184,107.191h26.045c5.775,0,10.458-4.682,10.458-10.457c0-5.775-4.683-10.458-10.458-10.458h-26.045   c-5.775,0-10.458,4.683-10.458,10.458C97.726,102.51,102.408,107.191,108.184,107.191z" />
				<path d="M162.771,107.191h26.045c5.775,0,10.458-4.682,10.458-10.457c0-5.775-4.683-10.458-10.458-10.458h-26.045   c-5.775,0-10.458,4.683-10.458,10.458C152.313,102.51,156.996,107.191,162.771,107.191z" />
				<path d="M243.404,86.276h-26.046c-5.775,0-10.457,4.683-10.457,10.458c0,5.775,4.682,10.457,10.457,10.457h26.046   c5.775,0,10.458-4.682,10.458-10.457C253.862,90.959,249.18,86.276,243.404,86.276z" />
				<path d="M79.642,189.809H53.596c-5.775,0-10.458,4.682-10.458,10.457c0,5.775,4.683,10.458,10.458,10.458h26.046   c5.775,0,10.457-4.683,10.457-10.458C90.099,194.49,85.417,189.809,79.642,189.809z" />
				<path d="M134.228,189.809h-26.045c-5.775,0-10.458,4.682-10.458,10.457c0,5.775,4.683,10.458,10.458,10.458h26.045   c5.775,0,10.458-4.683,10.458-10.458C144.686,194.49,140.004,189.809,134.228,189.809z" />
				<path d="M188.816,189.809h-26.045c-5.775,0-10.458,4.682-10.458,10.457c0,5.775,4.683,10.458,10.458,10.458h26.045   c5.775,0,10.458-4.683,10.458-10.458C199.274,194.49,194.592,189.809,188.816,189.809z" />
				<path d="M243.404,189.809h-26.046c-5.775,0-10.457,4.682-10.457,10.457c0,5.775,4.682,10.458,10.457,10.458h26.046   c5.775,0,10.458-4.683,10.458-10.458C253.862,194.49,249.18,189.809,243.404,189.809z" />
				<path d="M60.429,169.059c0.94,1.019,2.161,1.535,3.632,1.535c1.454,0,2.664-0.512,3.597-1.523c0.908-0.987,1.369-2.449,1.369-4.346   v-27.337h7.588c1.607,0,2.862-0.388,3.729-1.154c0.907-0.798,1.367-1.856,1.367-3.144c0-1.28-0.451-2.338-1.342-3.146   c-0.861-0.779-2.125-1.176-3.754-1.176H51.456c-1.547,0-2.776,0.381-3.651,1.13c-0.924,0.792-1.392,1.865-1.392,3.192   c0,1.282,0.447,2.337,1.329,3.135c0.852,0.771,2.102,1.163,3.714,1.163h7.588v27.337C59.044,166.604,59.51,168.063,60.429,169.059z   " />
				<path d="M89.595,128.101c-1.455,0-2.667,0.518-3.602,1.541c-0.904,0.995-1.364,2.442-1.364,4.302v30.781   c0,1.861,0.465,3.314,1.381,4.316c0.94,1.03,2.146,1.553,3.585,1.553c1.487,0,2.72-0.517,3.659-1.535   c0.918-0.996,1.384-2.455,1.384-4.334v-30.781c0-1.882-0.467-3.336-1.388-4.324C92.31,128.611,91.08,128.101,89.595,128.101z" />
				<path d="M119.575,136.482c1.818,0,3.354,0.421,4.564,1.255c1.246,0.855,2.358,2.193,3.306,3.972   c0.681,1.283,1.302,2.184,1.897,2.746c0.704,0.669,1.712,1.008,2.999,1.008c1.206,0,2.244-0.463,3.086-1.376   c0.821-0.89,1.238-1.935,1.238-3.107c0-1.864-0.729-3.839-2.163-5.868c-1.409-1.987-3.446-3.67-6.057-5.004   c-2.607-1.332-5.609-2.007-8.924-2.007c-2.715,0-5.311,0.492-7.72,1.461c-2.419,0.977-4.559,2.417-6.358,4.282   c-1.798,1.864-3.197,4.135-4.158,6.748c-0.954,2.586-1.438,5.549-1.438,8.809c0,2,0.191,3.92,0.568,5.706   c0.379,1.796,0.958,3.511,1.72,5.1c0.76,1.588,1.695,3.048,2.786,4.347c1.228,1.433,2.592,2.604,4.056,3.481   c1.465,0.879,3.112,1.534,4.898,1.947c1.758,0.406,3.728,0.612,5.861,0.612c2.847,0,5.387-0.467,7.55-1.389   c2.168-0.922,3.981-2.148,5.389-3.643c1.394-1.479,2.436-3.017,3.094-4.574c0.665-1.57,1.002-3.066,1.002-4.444   c0-1.267-0.447-2.345-1.328-3.201c-0.873-0.852-1.935-1.283-3.155-1.283c-1.439,0-2.525,0.466-3.227,1.382   c-0.567,0.738-1.044,1.689-1.405,2.796c-0.724,1.973-1.795,3.481-3.186,4.48c-1.384,0.992-3.12,1.496-5.16,1.496   c-1.887,0-3.544-0.447-4.93-1.33c-1.373-0.873-2.457-2.233-3.224-4.042c-0.793-1.878-1.195-4.293-1.195-7.174   c0-4.289,0.898-7.614,2.67-9.885C114.364,137.561,116.636,136.482,119.575,136.482z" />
				<path d="M165.735,165.355c0.376,0.648,0.808,1.366,1.292,2.155c0.556,0.905,1.249,1.645,2.063,2.197   c0.866,0.588,1.969,0.886,3.28,0.886c1.441,0,2.618-0.417,3.501-1.241c0.899-0.843,1.356-1.862,1.356-3.028   c0-0.933-0.231-1.895-0.687-2.86c-0.421-0.888-1.026-1.885-1.846-3.042l-10.572-15.145l8.97-8.498   c1.399-1.336,2.109-2.748,2.109-4.195c0-1.252-0.464-2.328-1.378-3.197c-0.899-0.854-2.07-1.286-3.479-1.286   c-1.087,0-1.993,0.253-2.697,0.753c-0.576,0.409-1.248,1.018-2.055,1.86l-13.737,14.326v-11.097c0-1.883-0.465-3.338-1.386-4.324   c-0.939-1.008-2.17-1.518-3.657-1.518c-1.516,0-2.743,0.522-3.651,1.556c-0.87,0.993-1.312,2.436-1.312,4.287v29.05   c0,1.284,0.027,2.244,0.083,2.935c0.063,0.79,0.252,1.502,0.583,2.158c0.43,0.771,1.048,1.39,1.833,1.837   c0.778,0.445,1.607,0.671,2.464,0.671c1.467,0,2.691-0.51,3.638-1.512c0.933-0.986,1.405-2.452,1.405-4.357v-7.629l5.243-5.026   L165.735,165.355z" />
				<path d="M208.988,136.961c1.526,0,2.71-0.375,3.519-1.113c0.835-0.763,1.259-1.771,1.259-2.997c0-1.208-0.424-2.207-1.259-2.97   c-0.809-0.738-1.992-1.113-3.519-1.113h-20.893c-1.266,0-2.34,0.197-3.194,0.587c-0.949,0.435-1.655,1.134-2.096,2.078   c-0.409,0.866-0.607,1.923-0.607,3.23v29.369c0,1.982,0.482,3.476,1.435,4.439c0.956,0.966,2.457,1.456,4.463,1.456h21.506   c1.507,0,2.69-0.384,3.518-1.139c0.853-0.781,1.286-1.798,1.286-3.024c0-1.261-0.432-2.296-1.286-3.078   c-0.827-0.756-2.011-1.14-3.518-1.14h-17.396v-9.021h15.372c1.496,0,2.653-0.379,3.44-1.129c0.798-0.762,1.202-1.746,1.202-2.928   c0-1.19-0.415-2.172-1.234-2.92c-0.792-0.721-1.938-1.085-3.408-1.085h-15.372v-7.503H208.988z" />
				<path d="M228.835,169.059c0.939,1.019,2.162,1.535,3.633,1.535c1.454,0,2.663-0.512,3.597-1.523   c0.907-0.987,1.368-2.449,1.368-4.346v-27.337h7.588c1.607,0,2.863-0.388,3.729-1.154c0.907-0.798,1.368-1.856,1.368-3.144   c0-1.28-0.452-2.338-1.343-3.146c-0.861-0.779-2.125-1.176-3.754-1.176h-25.157c-1.548,0-2.777,0.381-3.652,1.13   c-0.923,0.792-1.392,1.865-1.392,3.192c0,1.282,0.448,2.337,1.329,3.135c0.853,0.771,2.102,1.163,3.715,1.163h7.588v27.337   C227.451,166.604,227.917,168.063,228.835,169.059z" />
			</g>
		</Svg>
	);
};

const getBigIcon = (text: string): JSX.Element => {
	// https://www.vasttrafik.se/Static/dist/map-marker-empty-blue-ac56c1522c4912d2a7dc68b95e05d84f.svg
	return (
		<Svg
			height={32}
			viewBox={`0 0 42 55`}
			style={{
				transform: `translate(-12px,-100%)`,
			}}
		>
			<g fill="#009ddb">
				<path
					d="M21,52.9c-3.4-6-15.8-28.2-15.8-36C5.2,8.2,12.3,1.1,21,1.1s15.8,7.1,15.8,15.8C36.8,24.6,24.4,46.9,21,52.9z"
					fillRule="evenodd"
					clipRule="evenodd"
				/>
				<path d="M21,2.1c8.2,0,14.8,6.6,14.8,14.8c0,6.4-9.5,24.5-14.8,33.9C15.7,41.4,6.2,23.3,6.2,16.9 C6.2,8.8,12.8,2.1,21,2.1 M21,0.1c-9.3,0-16.8,7.5-16.8,16.8s16.8,38,16.8,38s16.8-28.7,16.8-38S30.3,0.1,21,0.1L21,0.1z" />
			</g>
			<circle cx="21" cy="16.2" r="13.6" fill="#00394d" />
			<text
				x="50%"
				y="50%"
				fontSize="20px"
				dominantBaseline="text-after-edge"
				textAnchor="middle"
				fill="#ffffff"
			>
				{text}
			</text>
		</Svg>
	);
};

const getSmallIcon = (): JSX.Element => {
	const SIZE = 24;
	return (
		<Svg
			height={SIZE}
			viewBox={`0 0 ${SIZE} ${SIZE}`}
			style={{
				fill: '#ff0',
				stroke: 'none',
				transform: `translate(${-SIZE / 2}px,${-SIZE / 2}px)`,
			}}
		>
			<circle cx={SIZE / 2} cy={SIZE / 2} r="3" fill="#999" />
		</Svg>
	);
};

const getIcon = (
	stop: string,
	from: string,
	to: string,
	hasEvent: boolean,
): JSX.Element => {
	if (stop === from) {
		return getBigIcon('A');
	}

	if (stop === to) {
		return getBigIcon('B');
	}

	if (hasEvent) {
		return getEventIcon();
	}

	return getSmallIcon();
};

interface Props {
	stop: string;
	from: string;
	to: string;
	hasEvent: boolean;
}

const PinIcon = (props: React.PropsWithChildren<Props>): JSX.Element => {
	const { stop, from, to, hasEvent } = props;
	const svgIcon = getIcon(stop, from, to, hasEvent);

	return svgIcon;
};

export default PinIcon;
