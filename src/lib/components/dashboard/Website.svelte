<script lang="ts">
	import { Badge } from 'flowbite-svelte';

	export let domain: string;
	export let errors: number;
	export let infos: number;
	export let successes: number;
	export let warnings: number;
</script>

<a
	href={`/dashboard/${domain}`}
	class="dark:text-gray-200 dark:bg-gray-800 dark:border-gray-700 min-w-[300px] p-4 px-10 cursor-pointer rounded-lg bg-white hover:bg-gray-50 dark:hover:bg-gray-800/70 shadow-md border transition-all duration-300"
>
	<p class="font-bold mb-4">{domain}</p>
	<div class="grid grid-cols-4 gap-2 text-center">
		<Badge large color="blue">{infos}</Badge>
		<Badge large color="red">{errors}</Badge>
		<Badge large color="green">{warnings}</Badge>
		<Badge large color="yellow">{successes}</Badge>
	</div>
</a>
