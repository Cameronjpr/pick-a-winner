import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { conn } from '@db/db';
import dayjs from 'dayjs';

export const POST = (async ({ request }) => {
	const { code, homeTeam, awayTeam, kickoff } = await request.json();

	const res = await conn.execute(
		'INSERT INTO Fixture (code, home, away, kickoffTime, updatedAt) VALUES (?, ?, ?, ?, ?)',
		[Number(code), Number(homeTeam), Number(awayTeam), dayjs(kickoff).toDate(), dayjs().toDate()]
	);

	return json(res);
}) satisfies RequestHandler;
