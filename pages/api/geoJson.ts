import { Stop } from '../../util/DataTypes';
import { STOPS } from '../../util/dataToGeoJson';
import type { NextApiRequest, NextApiResponse } from 'next';
import { timeBetween, timeWithinMinutes } from '../../util/Time';

export type ReturnGeoData = {
	stops: Record<string, Stop>;
};

const geoJson = (req: NextApiRequest, res: NextApiResponse<ReturnGeoData>) => {
	// TODO: select lines and stops

	const time = req.query.time as string;

	if (!time || time.length < 5) return res.status(200).json({ stops: {} });

	const stops = Object.fromEntries(
		[...STOPS.entries()].map(([k, v]) => {
			// If event is not within a hour => Remove the event
			let t = Object.assign({}, v);
			if (
				v.event !== undefined &&
				!timeWithinMinutes(v.event, time, 60)
			) {
				delete t.event;
			}

			return [k, t];
		}),
	);

	res.status(200).json({ stops });
};

export default geoJson;
