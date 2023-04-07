<script lang="ts">
	import { enhance } from '$app/forms';
	import { teams } from '@lib/teams';
	import { getThisWeeksGames } from '@lib/utils';
	import type { LayoutData } from './$types';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';

	dayjs.locale('en-gb');
	dayjs.extend(advancedFormat);
	dayjs().format();

	export let data: LayoutData;

	const { fixtures } = data;

	const fixturesForWeek = getThisWeeksGames(fixtures);

	let errors: Array<number> = [];
</script>

<h1>This week’s games</h1>

{#if fixturesForWeek}
	<form
		method="POST"
		use:enhance={({ form, data, action, cancel, submitter }) => {
			fixturesForWeek.forEach((f) => {
				console.log(data.get(`fixture-${f.code}`));
				if (data.get(`fixture-${f.code}`) === null) {
					errors.push(f.code);
				}

				console.log(errors.includes(f.code));
			});

			if (errors.length) {
				window.scrollTo(0, 0);
			}
		}}
	>
		{#each fixturesForWeek as f, i}
			{#if i === 0 || dayjs(f.kickoff_time).day() !== dayjs(fixturesForWeek[i - 1].kickoff_time).day()}
				<h2>{dayjs(f.kickoff_time).format('dddd Do MMMM')}</h2>
			{/if}
			<article>
				<fieldset class="team-selection">
					<label for={`fixture-${f.code}-${f.team_h}`}>
						<input
							name={`fixture-${f.code}-${f.team_h}`}
							id={`fixture-${f.code}-${f.team_h}`}
							type="radio"
							value={`fixture-${f.code}-${f.team_h}`}
						/>
						{teams[f.team_h - 1]?.shortName}
					</label>
					<time>{dayjs(f.kickoff_time).format('h:mma')}</time>
					<label for={`fixture-${f.code}-${f.team_a}`}>
						<input
							name={`fixture-${f.code}-${f.team_a}`}
							id={`fixture-${f.code}-${f.team_a}`}
							type="radio"
							value={`fixture-${f.code}-${f.team_a}`}
						/>
						{teams[f.team_a - 1]?.shortName}
					</label>

					{#if errors.includes(f.code)}
						<span class="error">Please select a team.</span>
					{/if}
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
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
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
		position: absolute;
		appearance: none;
		opacity: 0;
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

	.error {
		color: var(--color-error);
	}

	time {
		display: inline;
	}

	h2 {
		font-size: 1.25rem;
	}

	button[type='submit'] {
		margin-top: 2rem;
	}
</style>
