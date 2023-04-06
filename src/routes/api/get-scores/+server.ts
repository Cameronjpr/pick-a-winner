import { supabaseClient } from '@lib/db';
import type { Fixture } from '@lib/types';
import { formatFixtures } from '@lib/util/fixture';
import { json, redirect } from '@sveltejs/kit';

export const GET = async ({ url, fetch, params, setHeaders }) => {
	const res = await fetch(
		`https://fantasy.premierleague.com/api/fixtures/?event=${params.gameweek}`,
		{
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		}
	);

	if (!res.ok) {
		return {
			status: res.status
		};
	}

	const fixtures = await res.json();
	const formattedFixtures = formatFixtures(fixtures);

	const { data: usersData, error } = await supabaseClient.from('Users').select();

	/* 
    1. Get all users
    2. Get all selections for each user
    3. Get all fixtures for those selections
    4. Calculate points for each fixture
    5. Calculate total points for each user
    6. Update user points
  */

	setHeaders({
		age: res?.headers?.get('age'),
		'cache-control': 'max-age=60'
	});

	return json({
		event: Number(params.gameweek),
		fixtures: gameweekFixtures as Array<Fixture>
	});
};
