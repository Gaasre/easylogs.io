<script lang="ts">
	import { Badge, Button, Input, Label, Modal, Radio, Spinner } from 'flowbite-svelte';
	import { Filter, Plus } from 'lucide-svelte';
	import type { IFilter } from '$lib/interfaces/Filter';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	export let newFilter: (filter: IFilter) => Promise<void>;
	export let filters: IFilter[];

	let loading = false;

	const saveFilter = async () => {
		loading = true;
		await newFilter({
			name: newFilterName,
			type: newFilterType,
			value: newFilterValue
		});
		await invalidateAll();
		loading = false;
		filterModal = false;
	};

	let newFilterName = '';
	let newFilterType = 'contains';
	let newFilterValue = '';

	let active = false;
	let filterModal = false;

	const toggleFilter = (filterIndex: number) => {
		filters[filterIndex] = { ...filters[filterIndex], active: !filters[filterIndex].active };
		goto(
			`/dashboard/${$page.data.domain}?date=${$page.data.date}&filters=${filters
				.filter((x) => x.active)
				.map((x) => x.name)
				.join(',')}`
		);
	};
</script>

<Label>Saved Filters:</Label>
<div>
	{#each filters as filter, index}
		<button class="mr-1" on:click={() => toggleFilter(index)}>
			<Badge
				class="transition-all duration-200 cursor-pointer"
				color={filter.active ? 'blue' : 'dark'}
			>
				{#if filter.active}
					<Filter size={8} class="mr-2" />
				{/if}
				{filter.name}</Badge
			>
		</button>
	{/each}
	<button on:click={() => (filterModal = true)}>
		<Badge
			class="hover:bg-primary-200 transition-colors duration-200 cursor-pointer"
			color="primary"><Plus size={8} class="mr-2" />New Filter</Badge
		>
	</button>
	<Modal
		title="New Custom Filter"
		bind:open={filterModal}
		size="xs"
		autoclose={false}
		class="w-full"
	>
		<div class="mb-4">
			<Label for="filter_name" class="mb-2">Filter name <b class="text-red-500">*</b></Label>
			<Input
				bind:value={newFilterName}
				type="text"
				id="filter_name"
				placeholder="Your filter's name"
				required
			/>
		</div>

		<div class="mb-4">
			<Label for="filter_type" class="mb-2">Filter Type</Label>
			<div id="filter_type" class="flex gap-4">
				<Radio bind:group={newFilterType} value="contains">Contains</Radio>
				<Radio bind:group={newFilterType} value="start-with">Starts with</Radio>
				<Radio bind:group={newFilterType} value="ends-with">Ends with</Radio>
			</div>
		</div>

		<div class="mb-4">
			<Label for="filter_value" class="mb-2">Filter value <b class="text-red-500">*</b></Label>
			<Input
				bind:value={newFilterValue}
				type="text"
				id="filter_value"
				placeholder="Your filter's name"
				required
			/>
		</div>

		<Button on:click={saveFilter} class="w-full" disabled={loading}>
			{#if loading}
				<Spinner class="mr-3" size="4" />
			{/if}
			Save</Button
		>
	</Modal>
</div>
