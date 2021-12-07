export default class TimeDate {
	hours: number;
	minutes: number;
	days: number;
	constructor(hours: number, minutes: number, days: number = 0) {
		this.hours = hours;
		this.minutes = minutes;
		this.days = days;
		this.fixLimits();
	}

	static fromString(time: string) {
		const [hours, minutes] = time.split(':');
		if (isNaN(parseInt(hours)) || isNaN(parseInt(minutes))) {
			console.error(`Incorecct time format: ${time}`);
			return new TimeDate(1 / 0, 1 / 0, 1 / 0);
		}

		const date = new TimeDate(+hours, +minutes);
		date.fixLimits();
		return date;
	}

	static add(t1: TimeDate, t2: TimeDate) {
		const d = t1.days + t2.days;
		const h = t1.hours + t2.hours;
		const m = t1.minutes + t2.minutes;
		const date = new TimeDate(h, m, d);
		date.fixLimits();
		return date;
	}

	addHours(h: number) {
		this.hours += h;
		return this;
	}

	addMinutes(m: number) {
		this.minutes += m;
		return this;
	}

	static timeBetween(t1: TimeDate, t2: TimeDate) {
		let max;
		let min;

		if (t1.days === t2.days) {
			if (t1.hours === t2.hours) {
				max = t1.minutes >= t2.minutes ? t1 : t2;
				min = t1.minutes >= t2.minutes ? t2 : t1;
			} else {
				max = t1.hours >= t2.hours ? t1 : t2;
				min = t1.hours >= t2.hours ? t2 : t1;
			}
		} else {
			max = t1.days >= t2.days ? t1 : t2;
			min = t1.days >= t2.days ? t2 : t1;
		}

		return new TimeDate(
			max.hours - min.hours,
			max.minutes - min.minutes,
			max.days - min.days,
		);
	}

	// TODO: negative numbers
	// Converts time back to "[0,23]h:[0,59]m"
	fixLimits() {
		if (!this.isValid) return this;

		while (this.minutes < -1) {
			this.hours -= 1;
			this.minutes += 60;
		}

		while (this.hours < -1) {
			this.days -= 1;
			this.hours += 24;
		}

		while (this.minutes >= 60) {
			this.hours += 1;
			this.minutes -= 60;
		}

		while (this.hours >= 24) {
			this.days += 1;
			this.hours -= 24;
		}

		return this;
	}

	isAfterOrEqual(t: TimeDate) {
		if (this.days > t.days) return true;
		if (this.days < t.days) return false;

		// Days is equal
		if (this.hours > t.hours) return true;
		if (this.hours < t.hours) return false;

		// Hours is equal
		return this.minutes >= t.minutes;
	}

	get isValid() {
		return (
			this.hours !== 1 / 0 &&
			this.minutes !== 1 / 0 &&
			this.days !== 1 / 0
		);
	}

	/**
	 * Returns time as string "hh:mm"
	 */
	hhmm() {
		this.fixLimits();
		let h = this.hours.toString();
		let m = this.minutes.toString();

		if (h.length > 2 || m.length > 2) console.log(h, m);

		return `${'0'.repeat(2 - h.length) + h}:${
			'0'.repeat(2 - m.length) + m
		}`;
	}

	/**
	 * Returns time as string "xxh xx min"
	 */
	hm() {
		this.fixLimits();
		if (this.hours === 0) return `${this.minutes} min`;
		return `${this.hours}h ${this.minutes} min`;
	}

	copy() {
		return new TimeDate(this.hours, this.minutes, this.days);
	}
}
