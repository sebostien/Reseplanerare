import { Stop } from '../../util/DataTypes';
import { STOPS } from '../../util/dataToGeoJson';
import type { NextApiRequest, NextApiResponse } from 'next';

export type ReturnGeoData = {
	stops: Stop[];
};

const geoJson = (req: NextApiRequest, res: NextApiResponse<ReturnGeoData>) => {
	// TODO: select lines and stops
	const stops = [...STOPS.values()];

	res.status(200).json({ stops });
};

export default geoJson;
