// import type { LayoutServerLoad } from './$types';

import { conn } from '../db/db';
import type { RawFixture, SlimFixture } from '../lib/types';

export async function load({ fetch }) {
	const { rows: fixtures } = await conn.execute('SELECT * FROM Fixture', { as: 'array' });

	if (!fixtures) {
		return {
			fixtures: []
		};
	}

	return {
		fixtures: fixtures as SlimFixture[]
	};
}
