<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';

	export let loggedIn: boolean;
</script>

<Navbar let:hidden let:toggle class="mb-24 sm:pt-4 pt-2">
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			<b class="font-bold text-primary-500">Easy</b>logs
		</span>
	</NavBrand>
	<div class="flex md:order-2">
		{#if loggedIn}
			<Button href="/dashboard" class="font-bold">Dashboard</Button>
		{:else}
			<Button href="/login" class="font-bold">
				Get Early Access
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
				></Button
			>
		{/if}
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden} class="order-1">
		<NavLi class="font-semibold" href="/" active={true}>Home</NavLi>
		<NavLi class="font-semibold" href="/#features">Features</NavLi>
		<NavLi class="font-semibold" href="/#">Blog</NavLi>
		<NavLi class="font-semibold" href="/#pricing">Pricing</NavLi>
	</NavUl>
</Navbar>
