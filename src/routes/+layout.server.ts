// import type { LayoutServerLoad } from './$types';

import type { RawFixture } from '../lib/types';

export async function load({ fetch }) {
	const res = await fetch(`https://fantasy.premierleague.com/api/fixtures`, {
		headers: {
			'Access-Control-Allow-Origin': 'https://fantasy.premierleague.com'
		}
	});

	return {
		fixtures: (await res.json()) as Array<RawFixture>
	};
}
