<script>
	import { Button } from 'flowbite-svelte';
</script>

<div class="max-w-3xl text-center mx-auto mb-24">
	<h1 class="font-bold sm:text-7xl text-4xl mb-6 dark:text-white">
		Unlock the Power of Simplified <span class="text-primary-700">Logging</span>
	</h1>
	<p class="font-semibold sm:text-xl text-lg mb-6 max-w-xl mx-auto dark:text-white">
		Efficient, Lightweight, and Easy-to-Use Log Management Solution.
	</p>

	<div class="p-2 border border-gray-400 rounded-full sm:w-3/4 w-auto sm:mx-auto mx-4 flex mb-16">
		<input
			class="border-none dark:bg-gray-900 dark:text-white focus:ring-0 grow rounded-lg"
			placeholder="Enter your e-mail"
			type="text"
		/>
		<Button size="lg" pill>Get a demo</Button>
	</div>

	<ul class="max-w-2xl flex sm:flex-row flex-col sm:space-y-0 space-y-6 justify-between items-center mx-auto font-medium sm:mb-36 mb-16 dark:text-white">
		<li class="flex items-center space-x-3">
			<span class="bg-primary-400 dark:bg-primary-600 rounded-full w-9 h-9 flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-check"><polyline points="20 6 9 17 4 12" /></svg
				>
			</span>
			<span>Easy Integration</span>
		</li>
        <li class="flex items-center space-x-3">
			<span class="bg-primary-400 dark:bg-primary-600 rounded-full w-9 h-9 flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-check"><polyline points="20 6 9 17 4 12" /></svg
				>
			</span>
			<span>Realtime Logs</span>
		</li>
        <li class="flex items-center space-x-3">
			<span class="bg-primary-400 dark:bg-primary-600 rounded-full w-9 h-9 flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-check"><polyline points="20 6 9 17 4 12" /></svg
				>
			</span>
			<span>Powerful Filtering</span>
		</li>
	</ul>

</div>

<div class="bg-primary-400 dark:bg-primary-600 dark:text-white text-center max-w-5xl sm:mx-auto mx-2 rounded-2xl pt-11 relative sm:pb-[600px] pb-[300px] sm:mb-56 mb-32">
    <p class="sm:text-4xl text-2xl">Flexible and Scalable Logging Made Easy</p>
    <p class="sm:text-8xl text-4xl font-bold">Simplified Control</p>
    <img class="mx-auto absolute -bottom-10 left-1/2 -translate-x-1/2" src="hero-illustration.png" alt="illustration">
</div>
