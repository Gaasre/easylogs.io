<script lang="ts">
	import {
		Navbar,
		NavBrand,
		DropdownDivider,
		Avatar,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		Button
	} from 'flowbite-svelte';
	import { LogOut, Moon, Sun } from 'lucide-svelte';
	import { theme } from '../../store';
	import type { AuthError } from '@supabase/supabase-js';

	export let email: string;
	export let signOut: () => Promise<void>;

	let currentTheme = '';
	theme.subscribe((val) => {
		if (val) {
			currentTheme = val;
		}
	});

	const toggleDarkMode = () => {
		theme.set(currentTheme == 'dark' ? 'light' : 'dark');
	};
</script>

<Navbar class="mb-10 sm:pt-4 pt-2">
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			<b class="font-bold text-primary-500">Easy</b>logs
		</span>
	</NavBrand>
	<div class="flex md:order-2">
		<div class="flex items-center md:order-2 gap-2">
			<Button class="!p-2" size="sm" color="alternative" pill on:click={toggleDarkMode}>
				{#if currentTheme == 'light'}
					<Sun size="14" />
				{:else}
					<Moon size="14" />
				{/if}
			</Button>
			<Avatar id="avatar-menu" />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block truncate text-sm font-medium">{email}</span>
			</DropdownHeader>
			<DropdownItem>Settings</DropdownItem>
			<DropdownDivider />
			<DropdownItem
				on:click={async () => {
					await signOut();
				}}
				class="gap-2 flex items-center"><LogOut size="14" /><span>Sign out</span></DropdownItem
			>
		</Dropdown>
	</div>
</Navbar>
