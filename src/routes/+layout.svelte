<script>
	import '../app.postcss';
	import Navigation from '../lib/components/Navigation.svelte';
</script>

<slot />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');

	:global(*) {
		font-family: 'Quicksand', sans-serif;
		@apply scroll-smooth;
	}
</style>
