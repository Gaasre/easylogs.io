<script lang="ts">
	import Log from '$lib/components/Log.svelte';
	import type { ILog } from '$lib/interfaces/Log';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let logs: ILog[] | null;
</script>

{#if logs}
	{#each logs as log (log.id)}
		<div transition:fly={{ duration: 300, y: -100, easing: cubicOut }}>
			<Log {log} />
		</div>
	{/each}
{/if}
