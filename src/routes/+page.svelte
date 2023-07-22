<script>
	import Header from '$lib/components/landing_page/Header.svelte';
	import Hero from '$lib/components/landing_page/Hero.svelte';
	import Features from '$lib/components/landing_page/Features.svelte';
	import Cta from '$lib/components/landing_page/Cta.svelte';
	import Pricing from '$lib/components/landing_page/Pricing.svelte';
	import Footer from '$lib/components/landing_page/Footer.svelte';

	export let data;
</script>

<svelte:head>
	<title>EasyLogs.io - Simplify Your Log Management</title>
	<meta name="description" content="Streamline log management effortlessly with EasyLogs.io. Our efficient and user-friendly platform simplifies the process, empowering you to gain real-time insights.">
</svelte:head>

<Header loggedIn={data.session ? true : false} />
<Hero />
<Features />
<Pricing />
<Cta />
<Footer />
