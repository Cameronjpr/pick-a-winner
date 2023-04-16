import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const res = await fetch(`https://fantasy.premierleague.com/api/fixtures`, {
		headers: {
			'Access-Control-Allow-Origin': 'https://fantasy.premierleague.com'
		}
	});

	const { fixtures } = await parent();

	return {
		apiFixtures: await res.json(),
		fixtures
	};
}) satisfies PageServerLoad;
