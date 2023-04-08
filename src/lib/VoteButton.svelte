<script lang="ts">
	import PocketBase from 'pocketbase';
	import { teams } from './teams';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	type Vote = {
		fixture: number;
		picked: number;
		count: number;
	};

	export let fixture: number;
	export let fixtureVotes: Vote | undefined;
	export let team: number;
	let voteLoading = false;

	async function assignToken(picked: number, fixture: number) {
		voteLoading = true;

		const data = {
			fixture,
			picked,
			count: fixtureVotes?.picked === picked ? fixtureVotes?.count + 1 : 1
		};

		try {
			const record = await pb.collection('votes').create(data);
			fixtureVotes = record;
		} finally {
			voteLoading = false;
		}
	}

	console.log(fixtureVotes);
</script>

<button on:click={() => assignToken(team, fixture)} class={voteLoading ? 'loading' : ''}>
	{teams[team - 1]?.shortName}
	{#if fixtureVotes && fixtureVotes.picked === team}
		<div>
			{#each Array(fixtureVotes.count) as _, i}
				<span>⚽️</span>
			{/each}
		</div>
	{/if}
</button>

<style>
	button {
		display: grid;
		grid-template-rows: 1fr 1fr;
		align-items: center;
		gap: 1rem;
		justify-content: center;
		cursor: pointer;
		padding: 1rem;
		background: var(--color-base);
		border: 2px solid var(--color-text);
		border-radius: 4px;
	}

	.loading {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
