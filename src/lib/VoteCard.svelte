<script lang="ts">
	import type { RawFixture } from './types';

	export let fixture: RawFixture;

	let cardActive = false;
	let originX = 0;
	let originY = 0;
	let vote: number | null = null;
	let probableVote: number | null = null;

	function handleActivate(e: MouseEvent) {
		cardActive = true;
		originX = e.clientX;
		originY = e.clientY;
	}

	function handleDeactivate(e: MouseEvent) {
		cardActive = false;

		console.log(e.clientX);

		const deltaX = e.clientX - originX;

		console.log(deltaX);

		if (deltaX < -100) {
			vote = fixture.team_h;
		} else if (deltaX > 100) {
			vote = fixture.team_a;
		} else {
			console.log('no vote');
		}

		const card = document.querySelector('article');

		if (card) {
			card.style.transform = 'translate(0px)';
		}
	}

	function handleTouchDeactivate(e: TouchEvent) {
		cardActive = false;

		console.log(e.touches[0].clientX);

		const deltaX = e.touches[0].clientX - originX;

		console.log(deltaX);

		if (deltaX < -100) {
			vote = fixture.team_h;
		} else if (deltaX > 100) {
			vote = fixture.team_a;
		} else {
			console.log('no vote');
		}

		const card = document.querySelector('article');

		if (card) {
			card.style.transform = 'translate(0px)';
		}
	}

	function handleMoveCard(e: MouseEvent) {
		if (cardActive) {
			const deltaX = e.clientX - originX;
			const deltaY = e.clientY - originY;
			const card = document.querySelector('article');

			if (deltaX < 0) {
				probableVote = fixture.team_h;
			} else if (deltaX > 0) {
				probableVote = fixture.team_a;
			} else {
				probableVote = null;
			}

			if (card) {
				card.style.transform = `translate(${deltaX}px)`;
			}
		}
	}

	function handleTouchMoveCard(e: TouchEvent) {
		if (cardActive) {
			const deltaX = e.touches[0].clientX - originX;
			const deltaY = e.touches[0].clientY - originY;
			const card = document.querySelector('article');

			if (deltaX < 0) {
				probableVote = fixture.team_h;
			} else if (deltaX > 0) {
				probableVote = fixture.team_a;
			} else {
				probableVote = null;
			}

			if (card) {
				card.style.transform = `translate(${deltaX}px)`;
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
	on:touchend={handleTouchDeactivate}
	on:mousedown={handleActivate}
	on:mouseup={handleDeactivate}
	on:mousemove={handleMoveCard}
>
	<time>12:30pm</time>
	<section>
		<div class="team-info">
			<h2>Leeds</h2>
		</div>
		<div class="team-info">
			<h2>Crystal Palace</h2>
		</div>
	</section>
	<div class="vote-summary">
		{#if vote === fixture.team_h}
			<span>Voted Leeds</span>
		{:else if vote === fixture.team_a}
			<span>Voted Crystal Palace</span>
		{:else if probableVote === fixture.team_h}
			<span>Voting Leeds...</span>
		{:else if probableVote === fixture.team_a}
			<span>Voting Crystal Palace...</span>
		{:else}
			<span>Swipe to vote!</span>
		{/if}
	</div>
</article>

<style>
	article {
		display: grid;
		grid-template-rows: 1fr 1fr 1fr;
		grid-gap: 1rem;
		padding: 1rem;
		margin-bottom: 1rem;
		border: 1px solid black;
		border-radius: 1rem;
		box-shadow: 0 0.5rem 0.75rem 0.1rem rgba(0, 0, 0, 0.2);
		min-height: 300px;
		max-width: 500px;
		cursor: pointer;
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
		background-color: antiquewhite;
	}

	.vote-summary {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 3rem;
		background-color: antiquewhite;
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
