<script lang="ts">
	import { getThisWeeksGames } from '@lib/utils';
	import type { LayoutData } from './$types';
	import dayjs from 'dayjs';
	import PocketBase from 'pocketbase';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import { onMount } from 'svelte';
	import VoteButton from '@lib/VoteButton.svelte';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import VoteCard from '@lib/VoteCard.svelte';
	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	dayjs.locale('en-gb');
	dayjs.extend(advancedFormat);
	dayjs().format();

	export let data: LayoutData;

	const { fixtures, tokens } = data;

	const fixturesForWeek = getThisWeeksGames(fixtures);
	let fixtureIndex = 0;

	type Vote = {
		fixture: number;
		picked: number;
		count: number;
	};
	let votes: Array<Vote> = [];

	onMount(async function () {
		votes = await pb.collection('votes').getFullList();
	});

	function handleVote(e) {
		console.log('vote', e.detail);
		fixtureIndex = fixtureIndex + 1;
		console.log(fixtureIndex);
	}
</script>

<h1>this week’s games</h1>

{#if fixturesForWeek?.length}
	{#if fixtureIndex < fixturesForWeek.length}
		<VoteCard on:vote={handleVote} fixture={fixturesForWeek[fixtureIndex]} />
	{:else}
		<h2>That’s all the games for this week.</h2>
	{/if}
{:else}
	<h2>No games found.</h2>
{/if}

<style>
	article {
		padding-block: 1rem;
		margin-bottom: 1rem;
	}

	article:last-child {
		margin-bottom: 0;
	}

	article {
		padding: 0;
		padding-top: 0.5rem;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		grid-gap: 1rem;
		border: none;
	}

	time {
		display: inline;
	}

	h2 {
		font-size: 1.25rem;
	}
</style>
