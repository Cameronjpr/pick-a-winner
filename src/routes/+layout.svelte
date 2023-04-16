<script lang="ts">
	import '../app.css';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<nav>
	<ul>
		<a href="/">home</a>
		<a href="/play">play</a>
		<a href="/sign-in">sign in</a>
		<a href="/admin">admin</a>
	</ul>
</nav>
<main>
	<slot />
</main>

<footer>
	<p>Pick-a-winner</p>
	<p>Created by Cameron Robson</p>
</footer>

<style>
	nav {
		background-color: var(--color-base);
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		max-width: 800px;
		padding: 1rem;
		margin: 0 auto;
	}

	nav ul {
		display: flex;
		justify-content: left;
		align-items: start;
		gap: 1rem;
		padding: 0;
		margin: 0;
		list-style: none;
		border-bottom: 2px solid var(--color-text);
	}

	nav a {
		color: var(--color-text);
		text-decoration: none;
	}

	main {
		padding: 1rem;
		padding-bottom: 2rem;
		max-width: 800px;
		margin: 0 auto;
	}

	footer {
		border-top: 2px solid var(--color-text);
		background-color: var(--color-base);

		padding-top: 2rem;
		padding-inline: 1rem;
		max-width: 800px;
		margin: 0 auto;
	}
</style>
