<script lang="ts">
	import '../app.css';
</script>

<nav>
	<ul>
		<a href="/">Home</a>
		<a href="/about">About</a>
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
	}

	nav ul {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		list-style: none;
		max-width: 800px;
		margin: 0 auto;
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
