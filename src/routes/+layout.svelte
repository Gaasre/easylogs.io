<script lang="ts">
	import '../app.postcss';
	import { theme } from '../store';
	theme.subscribe((val) => {
		if (val) {
			if (val == 'dark') {
				window.document.body.classList.add('dark');
			} else {
				window.document.body.classList.remove('dark');
			}
		}
	});
</script>

<div class="bg-white dark:bg-gray-900 min-h-screen">
	<slot />
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');

	:global(*) {
		font-family: 'Quicksand', sans-serif;
		@apply scroll-smooth;
	}
</style>
