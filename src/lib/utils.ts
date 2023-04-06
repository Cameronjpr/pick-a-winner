import dayjs from 'dayjs';
import type { RawFixture } from './types';
dayjs.locale('en-gb');
dayjs().format();

export function getLastFriday() {
	return dayjs().startOf('week').subtract(2, 'day').add(12, 'hour').format();
}

export function getNextFriday() {
	return dayjs().startOf('week').add(5, 'day').add(12, 'hour').format();
}

export function getThisWeeksGames(fixtures: Array<RawFixture>) {
	return fixtures.filter((fixture: RawFixture) => {
		return (
			dayjs(fixture.kickoff_time).isAfter(getLastFriday()) &&
			dayjs(fixture.kickoff_time).isBefore(getNextFriday())
		);
	});
}
