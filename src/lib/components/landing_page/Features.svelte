<script>
	import { Button } from 'flowbite-svelte';
	import { ArrowRight, Unplug, Zap, Filter } from 'lucide-svelte';
</script>

<div
	id="features"
	class="max-w-5xl mx-auto flex sm:flex-row flex-col sm:py-24 py-12 dark:text-white"
>
	<div class="sm:w-1/2 px-10 sm:mb-0 mb-10">
		<h2 class="text-4xl font-extrabold mb-5">Simplify Your Log Management Workflow</h2>
		<p class="mb-4 text-lg">
			Effortlessly manage your logs with our intuitive logging app. Say goodbye to complex setups
			and tedious log analysis.
		</p>
		<p class="mb-5 text-lg">
			Our user-friendly interface streamlines your log management workflow, allowing you to focus on
			what matters most - your application's performance.
		</p>
		<Button pill class="space-x-3"><span>Get Started</span> <ArrowRight size={18} /></Button>
	</div>
	<div class="relative sm:w-1/2 mx-auto space-y-4">
		<div
			class="w-56 rounded-lg shadow-lg text-center p-5 sm:absolute -top-16 left-0 dark:bg-gray-800"
		>
			<div
				class="p-4 bg-[#DFF3FE] rounded-full flex items-center justify-center w-fit mx-auto mb-4"
			>
				<Zap size={32} color="#1BC2FD" />
			</div>
			<p class="font-bold">Real-time Log Monitoring</p>
		</div>
		<div
			class="w-56 rounded-lg shadow-lg text-center p-5 sm:absolute bottom-0 left-8 dark:bg-gray-800"
		>
			<div
				class="p-4 bg-[#E1F3E8] rounded-full flex items-center justify-center w-fit mx-auto mb-4"
			>
				<Unplug size={32} color="#1ADD75" />
			</div>
			<p class="font-bold">Seamless Integration</p>
		</div>
		<div
			class="w-56 rounded-lg shadow-lg text-center p-5 sm:absolute top-0 right-0 dark:bg-gray-800"
		>
			<div
				class="p-4 bg-[#FAEFE2] rounded-full flex items-center justify-center w-fit mx-auto mb-4"
			>
				<Filter size={32} color="#EF8013" />
			</div>
			<p class="font-bold">Powerful Search and Filtering</p>
		</div>
	</div>
</div>
