<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { Label, Input, Button, Helper, Spinner } from 'flowbite-svelte';

	export let data;

	let email = '';
	let emailInvalid = true;
	let loading = false;

	let googleLoading = false;

	let emailSent = false;
	let errorText = '';

	const handleLogin = async () => {
		loading = true;
		try {
			const { error } = await data.supabase.auth.signInWithOtp({
				email
			});

			if (error) throw error;
			emailSent = true;
		} catch (error: any) {
			errorText = error.error_description || error.message;
		}
		loading = false;
	};

	const handleGoogleLogin = async () => {
		googleLoading = true;
		try {
			const { error } = await data.supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					queryParams: {
						access_type: 'offline',
						prompt: 'consent'
					}
				}
			});
			if (error) throw error;
		} catch (error: any) {
			errorText = error.error_description || error.message;
		}
		loading = false;
	};

	const setEmailValidity = () => {
		emailInvalid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
	};
</script>

<main class="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
	<div class="bg-white p-8 rounded-lg border border-gray-200 shadow-xl max-w-md dark:bg-gray-800 dark:border-gray-700 dark:text-white">
		<h1 class="text-3xl font-bold mb-4">Welcome to <b class="text-primary-500 dark:text-primary-700">Easy</b>Logs</h1>
		<h2 class="text-lg mb-6 font-medium">
			Sign in to your account to join the beta and start tracking your website or app activities.
		</h2>
		<Button color="light" on:click={handleGoogleLogin} class="w-full mb-6">
			{#if googleLoading}
				<Spinner class="mr-3" size="4" />
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-chrome"
					><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line
						x1="21.17"
						x2="12"
						y1="8"
						y2="8"
					/><line x1="3.95" x2="8.54" y1="6.06" y2="14" /><line
						x1="10.88"
						x2="15.46"
						y1="21.94"
						y2="14"
					/></svg
				>
			{/if}
			<span class="ml-2">Sign in with Google</span>
		</Button>

		<div class="h-px bg-gray-200 w-2/3 mx-auto my-4" />

		<div class="mb-2">
			<Label for="input-group-1" class="block mb-2">Your Email</Label>
			<Input
				id="email"
				type="email"
				bind:value={email}
				on:input={() => setEmailValidity()}
				placeholder="email@example.com"
			>
				<svg
					slot="left"
					aria-hidden="true"
					class="w-5 h-5 text-gray-500 dark:text-gray-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path
						d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
					/></svg
				>
			</Input>
		</div>
		<Button class="w-full" on:click={handleLogin} disabled={emailInvalid}>
			{#if loading}
				<Spinner class="mr-3" size="4" />
			{/if}Sign in with email</Button
		>
	</div>
</main>
