<script lang="ts">
	import { getThisWeeksGames } from '@lib/utils';

	import VoteCard from '@lib/VoteCard.svelte';
	import type { LayoutData } from '../$types';

	export let data: LayoutData;

	const { fixtures } = data;


	let fixtureIndex = 0;
	let fixture = fixtures[fixtureIndex];

	async function handleVote(e: CustomEvent<{ fixture: number; picked: number }>) {
		fixtureIndex = fixtureIndex + 1;
		console.log('fixtureIndex', fixtureIndex)
		const { fixture, picked } = e.detail;
	}

</script>


{#if fixtures?.length}
	<h1>swipe to play</h1>
	<section>
		{#if fixtureIndex < fixtures.length}
			{#key fixtureIndex}
				<VoteCard on:vote={handleVote} fixture={fixtures[fixtureIndex]} />
			{/key}
		{:else}
			<h2>That’s all the games for this week.</h2>
		{/if}
	</section>
{:else}
	<h2>No games found.</h2>
{/if}

<style>
	h2 {
		font-size: 1.25rem;
	}

	section {
		display: flex;
		justify-content: center;
		height: 400px;
	}
</style>
