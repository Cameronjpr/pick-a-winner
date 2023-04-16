<script lang="ts">
	import { getThisWeeksGames } from '@lib/utils';

	import { teams } from '@lib/teams';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { apiFixtures, fixtures } = data;

	const fixturesForThisWeek = getThisWeeksGames(apiFixtures);

  const fixturesNotYetAdded = fixturesForThisWeek.filter((f) => {
    return !fixtures.find((fixture) => fixture.code === f.code);
  });

	async function addFixture() {
		fixturesForThisWeek.forEach(async (f) => {
			const response = await fetch('/api/fixtures', {
				method: 'POST',
				body: JSON.stringify({
					code: f.code,
					homeTeam: f.team_h,
					awayTeam: f.team_a,
					kickoff: f.kickoff_time
				}),
				headers: {
					'content-type': 'application/json'
				}
			});
		});
	}
</script>

<h1>Admin</h1>

<section>
  {#if fixturesNotYetAdded.length === 0}
    <h2>All fixtures for this week have been added.</h2>
  {:else}
	<h2>Predicted fixtures for this week</h2>
	{#each fixturesNotYetAdded as fixture}
  {@const home = teams[fixture.team_h - 1]?.shortName}
  {@const away = teams[fixture.team_a - 1]?.shortName}
  <div>
    <span>{home} vs {away}</span>
    <span>{fixture.kickoff_time}</span>
  </div>
	{/each}
	<button on:click={addFixture}>Add fixtures</button>
  {/if}
</section>

<style>
	section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-gap: 0.5rem;
	}
</style>
