// import type { LayoutServerLoad } from './$types';

import PocketBase from 'pocketbase';
import type { RawFixture } from '../lib/types';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export async function load({ fetch }) {
	const res = await fetch(`https://fantasy.premierleague.com/api/fixtures`, {
		headers: {
			'Access-Control-Allow-Origin': 'https://fantasy.premierleague.com'
		}
	});

	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	// you can also fetch all records at once via getFullList
	const records = await pb.collection('votes').getFullList({
		sort: '-created'
	});

	console.log(records);

	return {
		remainingTokens: 5,
		players: JSON.stringify(records),
		fixtures: (await res.json()) as Array<RawFixture>
	};
}
