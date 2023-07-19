<script>
	import { goto, invalidateAll } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import Website from '$lib/components/dashboard/Website.svelte';
	import { Button } from 'flowbite-svelte';
	import { Plus } from 'lucide-svelte';

	export let data;
</script>

<Header
	signOut={async () => {
		await data.supabase.auth.signOut();
		await invalidateAll()
		goto('/');
	}}
	email={data.session?.user.email ?? ''}
/>
<div class="py-8" />
<div class="container w-full mx-auto dark:text-white">
	<div class="pb-4 border-b mb-8 flex justify-between">
		<h1 class="font-bold text-3xl">Websites</h1>
		<Button class="gap-2">
			<Plus size="14" />
			<span> New website </span></Button
		>
	</div>
	<div class="grid sm:grid-cols-3 grid-cols-1 gap-4">
		{#each data.websites as website}
			<Website
				domain={website.domain}
				successes={website.success_count ?? 0}
				errors={website.error_count ?? 0}
				warnings={website.warning_count ?? 0}
				infos={website.info_count ?? 0}
			/>
		{/each}
	</div>
</div>
