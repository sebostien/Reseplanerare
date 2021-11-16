// Return seconds from 00:00
// parseTime(12:34) === 45240
export const parseTime = (time: string) => {
	if (time.length != 5 || !time.includes(':'))
		return 'Invalid format in time: ' + time;

	const [hours, minutes] = time.split(':');

	return +hours * 3600 + +minutes * 60;
};

export const timeBetween = (t1: string, t2: string): number => {
	let n1 = parseTime(t1);
	let n2 = parseTime(t2);

	if (typeof n1 == 'string' || typeof n2 === 'string') return 0;

	return timeToMinutes(n1 - n2);
};

export const timeToMinutes = (time: number): number => {
	return Math.floor(time / 60);
};

export const timeWithinMinutes = (
	t1: string,
	t2: string,
	minutes: number,
): boolean => {
	return Math.abs(timeBetween(t1, t2)) <= minutes;
};
