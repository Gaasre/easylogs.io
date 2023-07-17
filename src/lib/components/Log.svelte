<script lang="ts">
	import { Alert, Badge, Tooltip } from 'flowbite-svelte';
	import LogTypes from '../utils/LogTypes';
	import type { ILog } from '$lib/interfaces/Log';
	import moment from 'moment';
	import { AlertCircle, AlertTriangle, CheckCircle2, XCircle } from 'lucide-svelte';

	export let log: ILog;

	const getType = (type: 'error' | 'info' | 'warning' | 'success') =>
		LogTypes[type] as 'red' | 'green' | 'blue' | 'yellow';
</script>

<Alert class="py-1 my-1 flex items-center" color={getType(log.type)}>
	{#if log.type == 'success'}
		<CheckCircle2 color="#03543F" size="14" />
	{:else if log.type == 'error'}
		<XCircle color="#9B1C1C" size="14"  />
	{:else if log.type == 'info'}
		<AlertCircle color="#1E429F" size="14"  />
	{:else if log.type == 'warning'}
		<AlertTriangle color="#723B13" size="14"  />
	{/if}
	<p class="ml-2 grow whitespace-nowrap text-ellipsis overflow-hidden" id={`logvalue-${log.id}`}>
		{#if log.namespace}
			<Badge color={getType(log.type)}>
				<span class="capitalize font-bold">{log.namespace}</span></Badge
			>
		{/if}
		{log.value}
	</p>
	<p class="min-w-[100px]">
		{moment(log.date).fromNow()}
	</p>
	<Tooltip trigger="click" triggeredBy={`#logvalue-${log.id}`}>{log.value}</Tooltip>
</Alert>
