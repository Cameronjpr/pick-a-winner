<script lang="ts">
	import { enhance } from '$app/forms';
	import { teams } from '../lib/teams';
	import { getThisWeeksGames } from '../lib/utils';
	import type { LayoutData } from './$types';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';

	dayjs.locale('en-gb');
	dayjs.extend(advancedFormat);
	dayjs().format();

	export let data: LayoutData;

	const { fixtures } = data;

	const fixutesForWeek = getThisWeeksGames(fixtures);
</script>

<h1>This week’s games</h1>

{#if fixutesForWeek}
	<form use:enhance>
		{#each fixutesForWeek as f}
			<article>
				<date>{dayjs(f.kickoff_time).format('dddd Do MMMM')}</date>
				<time>{dayjs(f.kickoff_time).format('h:mmA')}</time>

				<fieldset class="team-selection">
					<label for="team-{f.team_h}">
						<input name="fixture-{f.code}" id="team-{f.team_h}" type="radio" />
						{teams[f.team_h - 1]?.shortName}
					</label>
					<label for="team-{f.team_a}">
						<input name="fixture-{f.code}" id="team-{f.team_a}" type="radio" />
						{teams[f.team_a - 1]?.shortName}
					</label>
				</fieldset>
			</article>
		{/each}
		<button type="submit">Submit</button>
	</form>
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

	.team-selection {
		padding: 0;
		padding-top: 0.5rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
		border: none;
	}

	.team-selection input[type='radio'] {
		background-color: white;
		border: 2px solid black;
		border-radius: 4px;
		padding: 0.5rem 1rem;
		width: 0px;
		height: 0px;
	}

	.team-selection label {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 1rem;
		background: var(--color-base);
		border: 2px solid var(--color-text);
		border-radius: 4px;
	}

	.team-selection label:focus-within {
		border: 2px solid var(--color-primary);
		color: var(--color-base);
	}

	.team-selection label:has(input:checked) {
		background: var(--color-secondary);
		color: var(--color-base);
	}

	date {
		display: inline;
		font-size: 0.75rem;
	}

	time {
		display: inline;
		font-size: 0.75rem;
	}

	h2 {
		font-size: 1.25rem;
	}

	button[type='submit'] {
		margin-top: 2rem;
	}
</style>
