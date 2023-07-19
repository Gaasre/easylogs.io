<script lang="ts">
	import Logs from '$lib/components/Logs.svelte';
	import Chart from '$lib/components/Chart.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import { onDestroy, tick } from 'svelte';
	import type { ILog } from '$lib/interfaces/Log.js';
	import type { IFilter } from '$lib/interfaces/Filter.js';
	import { goto, invalidateAll } from '$app/navigation';
	import {
		Button,
		ButtonGroup,
		Chevron,
		ChevronLeft,
		ChevronRight,
		Dropdown,
		Input,
		Search,
		Spinner
	} from 'flowbite-svelte';
	import moment from 'moment';
	import Filters from '$lib/components/Filters.svelte';
	import Header from '$lib/components/Header.svelte';

	export let data;

	let offset = 1;
	let maxPages = 1;
	let pageLoading = false;
	const PAGE_COUNT = 20;
	let canLoadMore = false;

	$: {
		data = data;
		canLoadMore = data.count > data.logs.length;
		maxPages = Math.ceil(data.count / PAGE_COUNT);
		offset = 1 + (maxPages - Math.ceil(data.count / data.logs.length));
	}

	const nextDay = () => {
		goto(
			`/dashboard/${data.domain}?date=${moment(data.date, 'YYYY-MM-DD')
				.add(1, 'days')
				.format('YYYY-MM-DD')}`
		);
	};
	const previousDay = () => {
		goto(
			`/dashboard/${data.domain}?date=${moment(data.date, 'YYYY-MM-DD')
				.subtract(1, 'days')
				.format('YYYY-MM-DD')}`
		);
	};

	const changePage = () => {
		goto(`/dashboard/${data.domain}?date=${data.date}`);
	};

	const newFilter = async (filter: IFilter) => {
		filter.user_id = data.session?.user.id;
		await data.supabase.from('filter').insert(filter);
	};

	const deleteFilter = async (filter: IFilter) => {
		await data.supabase.from('filter').delete().eq('id', filter.id);
	};

	const loadMore = async () => {
		const from = offset * PAGE_COUNT;
		const to = from + PAGE_COUNT - 1;

		pageLoading = true;

		const anon = data.filters
			?.filter((x) => x.active)
			.map((x) => {
				if (x.type == 'contains') {
					return `value.ilike.*${x.value}*`;
				} else if (x.type == 'starts-with') {
					return `value.ilike.${x.value}*`;
				} else if (x.type == 'ends-with') {
					return `value.ilike.*${x.value}`;
				}

				return `value.ilike.*${x.value}*`;
			});

		const { data: logs } = await data.supabase
			.from('logs')
			.select('*')
			.eq('website', data.domain)
			.or(anon && anon.length > 0 ? anon.join('&') : 'value.ilike.**')
			.order('date', { ascending: false })
			.gte('date', moment(data.date, 'YYYY-MM-DD').startOf('day').toISOString())
			.lte('date', moment(data.date, 'YYYY-MM-DD').endOf('day').toISOString())
			.range(from, to)
			.returns<ILog[]>();

		if (data.logs && logs) {
			data.logs = [...data.logs, ...logs];
			const el = document.querySelector('#loadMore');
			await tick();
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' });
			}
		}
		pageLoading = false;
	};

	const channel = data.supabase
		.channel('schema-db-changes')
		.on(
			'postgres_changes',
			{
				event: 'INSERT',
				schema: 'public',
				table: 'logs'
			},
			(payload) => {
				let log = payload.new as ILog;
				if (data.logs) {
					data.logs = [log, ...data.logs];
				} else {
					data.logs = [log];
				}
				invalidateAll();
			}
		)
		.subscribe();

	onDestroy(() => {
		channel.unsubscribe();
	});
</script>

<Header
	signOut={async () => {
		await data.supabase.auth.signOut();
		await invalidateAll();
		goto('/');
	}}
	email={data.session?.user.email ?? ''}
/>
<div class="py-8" />
<div class="container w-full mx-auto">
	<div class="flex justify-between mb-6">
		<div>
			<Button size="sm" color="alternative"><Chevron>{data.domain}</Chevron></Button>
			<Dropdown class="px-3 pb-3 text-sm z-20">
				<div slot="header" class="p-3">
					<Search size="md" />
				</div>
				<ul class="overflow-y-auto max-h-56">
					{#each data.websites ?? [] as website}
						<li class="rounded p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
							<a class="block" href={`/dashboard/${website.domain}`}>
								{website.domain}
							</a>
						</li>
					{/each}
				</ul>
			</Dropdown>
		</div>
		<div>
			<ButtonGroup size="sm">
				<Button on:click={previousDay} color="primary"><ChevronLeft /></Button>
				<Input type="date" bind:value={data.date} on:input={changePage} />
				<Button on:click={nextDay} color="primary"><ChevronRight /></Button>
			</ButtonGroup>
		</div>
	</div>
	<div class="mb-6">
		<Filters {newFilter} filters={data.filters ?? []} {deleteFilter} />
	</div>
	<div>
		<div
			class="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 dark:text-white shadow-lg"
		>
			<div class="py-4 sm:py-6 grid sm:grid-cols-4 grid-cols-2 gap-y-8">
				<div class="border-r px-10">
					<div class="uppercase font-medium">Errors</div>
					<div class="flex space-x-4 items-center">
						<div class="font-bold text-2xl">{data.stats.errors}</div>
						<div class="flex text-xs">
							<div class="text-red-500 -mt-0.5">↑</div>
							0%
						</div>
					</div>
				</div>
				<div class="sm:border-r px-10">
					<div class="uppercase font-medium">Infos</div>
					<div class="flex space-x-4 items-center">
						<div class="font-bold text-2xl">{data.stats.infos}</div>
						<div class="flex text-xs">
							<div class="text-green-500 -mt-0.5">↑</div>
							0%
						</div>
					</div>
				</div>
				<div class="border-r px-10">
					<div class="uppercase font-medium">Warnings</div>
					<div class="flex space-x-4 items-center">
						<div class="font-bold text-2xl">{data.stats.warnings}</div>
						<div class="flex text-xs">
							<div class="text-red-500 -mt-0.5">↑</div>
							0%
						</div>
					</div>
				</div>
				<div class="px-10">
					<div class="uppercase font-medium">successes</div>
					<div class="flex space-x-4 items-center">
						<div class="font-bold text-2xl">{data.stats.successes}</div>
						<div class="flex text-xs">
							<div class="text-green-500 -mt-0.5">↑</div>
							0%
						</div>
					</div>
				</div>
			</div>
			<Chart
				errors={data.statSeries.errors}
				successes={data.statSeries.successes}
				infos={data.statSeries.infos}
				warnings={data.statSeries.warnings}
				date={data.date}
			/>
		</div>
		<div class="py-8" />
		<div class="h-auto">
			<Logs logs={data.logs} />
		</div>
	</div>
	<div id="loadMore">
		{#if canLoadMore}
			<Button on:click={loadMore} color="alternative" class="w-full mt-4" disabled={pageLoading}>
				{#if pageLoading}
					<Spinner class="mr-3" size="4" />
				{/if}
				{pageLoading ? 'Loading...' : 'Load more'}
			</Button>
		{/if}
	</div>

	<div class="py-8" />
</div>
