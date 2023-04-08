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

	type Vote = {
		fixture: number;
		picked: number;
		count: number;
	};
	let votes: Array<Vote> = [];

	onMount(async function () {
		votes = await pb.collection('votes').getFullList();
	});
</script>

<h1>this week’s games</h1>

{#if fixturesForWeek?.length}
	{#each fixturesForWeek as f, i}
		<VoteCard fixture={f} />
		<!-- {@const fixtureVotes = votes.find((v) => v.fixture == f.code)}

		{#if i === 0 || dayjs(f.kickoff_time).day() !== dayjs(fixturesForWeek[i - 1].kickoff_time).day()}
			<h2>{dayjs(f.kickoff_time).format('dddd Do MMMM')}</h2>
		{/if}
		<article>
			<VoteButton team={f.team_h} fixture={f.code} {fixtureVotes} />
			<time>{dayjs(f.kickoff_time).format('h:mma')}</time>
			<VoteButton team={f.team_a} fixture={f.code} {fixtureVotes} />
		</article> -->
	{/each}
	<button on:click={() => console.log(votes)}>Save</button>
{:else}
	<h2>No games found.</h2>
	<!-- <VoteCard fixture={f} /> -->
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
