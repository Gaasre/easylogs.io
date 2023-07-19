<script>
	import { Easylogs } from 'easylogs-client';
	import { Button } from 'flowbite-svelte';

	const easyLogs = new Easylogs();
	const ctaClick = () => {
		easyLogs.sendLog({
			message: `New click on the CTA Button`,
			namespace: 'LandingPage',
			type: 'warning',
			website: 'localhost'
		});
	};
</script>

<div class="px-2 mb-48">
	<div class="bg-primary-500 mx-auto py-10 max-w-7xl text-center rounded-xl dark:bg-primary-600">
		<h3 class="sm:text-6xl text-4xl font-bold mb-6 mx-auto text-center dark:text-white">
			Get to know whats next for EasyLogs
		</h3>
		<p class="sm:text-lg text-base font-semibold mb-8 max-w-lg mx-auto text-center dark:text-white/90">
			Sign up now and take the first step towards simplifying your logging process.
		</p>
		<Button on:click={ctaClick} size="lg" color="light" pill>Start Your Free Trial</Button>
	</div>
</div>
