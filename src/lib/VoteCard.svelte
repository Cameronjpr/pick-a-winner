<script lang="ts">
	import { teams } from './teams';
	import type { RawFixture, SlimFixture } from './types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let fixture: SlimFixture;

	const { home, away } = fixture;

	let cardActive = false;
	let originX = 0;
	let originY = 0;
	let deltaX = 0;
	let vote: number | null = null;
	let probableVote: number | null = null;

	function handleVote() {
		console.log('handle vote', vote);
		if (vote !== null) {
			console.log('voted for', vote);

			dispatch('vote', {
				picked: vote,
				fixture: fixture.id
			});
		}
	}

	function handleActivate(e: MouseEvent) {
		cardActive = true;
		originX = e.clientX;
		originY = e.clientY;
	}

	function handleDeactivate() {
		cardActive = false;

		if (deltaX < -100) {
			vote = fixture.home;
		} else if (deltaX > 100) {
			vote = fixture.away;
		} else {
			console.log('no vote');
		}

		const card = document.querySelector('article');

		if (card) {
			card.style.transform = 'translate(0px)';
			handleVote();
		}

		deltaX = 0;
	}

	function handleMoveCard(e: MouseEvent) {
		if (cardActive) {
			deltaX = e.clientX - originX;
			const card = document.querySelector('article');

			if (deltaX < 0) {
				probableVote = fixture.home;
			} else if (deltaX > 0) {
				probableVote = fixture.away;
			} else {
				probableVote = null;
			}

			if (card) {
				card.style.transform = `rotate(${deltaX / 50}deg) translateX(${deltaX}px`;
			}
		}
	}

	function handleTouchMoveCard(e: TouchEvent) {
		if (cardActive) {
			deltaX = e.touches[0].clientX - originX;
			const card = document.querySelector('article');

			if (deltaX < 0) {
				probableVote = fixture.home;
			} else if (deltaX > 0) {
				probableVote = fixture.away;
			} else {
				probableVote = null;
			}

			if (card) {
				card.style.transform = `rotate(${deltaX / 50}deg) translateX(${deltaX}px`;
			}
		}
	}

	function handleTouchActivate(e: TouchEvent) {
		cardActive = true;
		originX = e.touches[0].clientX;
		originY = e.touches[0].clientY;
	}
</script>

<article
	on:touchstart={handleTouchActivate}
	on:touchmove={handleTouchMoveCard}
	on:touchend={handleDeactivate}
	on:mousedown={handleActivate}
	on:mouseup={handleDeactivate}
	on:mousemove={handleMoveCard}
	style="border: 2px solid {probableVote
		? teams[probableVote - 1].primaryColor
		: 'var(--color-base)'}"
>
	<time>12:30pm</time>
	<section>
		<div class="team-info">
			<h2>
				{teams[home-1].shortName}
			</h2>
		</div>
		<div class="team-info">
			<h2>{teams[away-1].shortName}</h2>
		</div>
	</section>
	<!-- <div class="vote-summary">
		{#if vote === fixture.home}
			<span>Voted {homeTeam}</span>
		{:else if vote === fixture.away}
			<span>Voted {awayTeam}</span>
		{:else if probableVote === fixture.home}
			<span>Voting {homeTeam}...</span>
		{:else if probableVote === fixture.away}
			<span>Voting {awayTeam}...</span>
		{:else}
			<span>Swipe to vote!</span>
		{/if}
	</div> -->
</article>

<style>
	article {
		background-color: white;
		display: grid;
		grid-template-rows: auto 1fr auto;
		grid-gap: 1rem;
		padding: 1rem;
		margin-bottom: 1rem;
		border: 2px solid black;
		border-radius: 1rem;
		box-shadow: 0 0.5rem 0.75rem 0.1rem rgba(0, 0, 0, 0.2);
		min-width: 300px;
		max-width: 500px;
		aspect-ratio: 3 / 4;
		cursor: pointer;
		transform-origin: bottom center;
		user-select: none;
	}

	article:last-child {
		margin-bottom: 0;
	}

	article section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.team-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.vote-summary {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 3rem;
		border-radius: 1rem;
		background-color: var(--color-base);
		border: 2px solid var(--color-base);
	}

	section h2 {
		text-align: center;
	}

	article time {
		display: block;
		margin-bottom: 0.5rem;
		text-align: center;
	}
</style>
