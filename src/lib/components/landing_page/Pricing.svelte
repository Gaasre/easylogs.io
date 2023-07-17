<script>
	import { Button, Toggle } from 'flowbite-svelte';
	import { Check, X } from 'lucide-svelte';
</script>

<div class="text-center sm:mb-32 mb-12 sm:px-0 px-4">
	<h4 class="max-w-md sm:text-4xl text-2xl sm:font-medium font-bold mb-4 mx-auto">Choose the Right Plan for Your Logging Needs</h4>
	<p class="sm:text-base text-sm sm:font-bold font-semibold sm:mb-16 mb-8">
		Select from our flexible pricing options and unlock the features that fit your requirements.
	</p>
	<div class="flex justify-center sm:text-xl text-base font-bold space-x-4">
		<div>Pay Monthly</div>
		<Toggle />
		<div class="relative">
            <span>Pay Yearly</span>
            <img class="absolute top-1 left-2" src="arrow.png" alt="arrow">
            <span class="absolute sm:top-12 sm:left-28 top-14 left-4 sm:text-lg text-xs font-medium whitespace-nowrap">Save 25%</span>
        </div>
	</div>
</div>

<div class="flex max-w-5xl justify-center mx-auto sm:mb-32 mb-16 flex-col sm:flex-row px-4">
    <div class="sm:w-1/3 w-full px-6 py-10 rounded-xl sm:mx-0 mx-2">
        <p class="text-2xl font-bold mb-3">Starter</p>
        <p class="font-bold mb-5">Ideal for small projects or personal use</p>
        <div class="mb-6 flex items-center">
            <b class="font-bold text-6xl">$9</b>
            <p class="font-bold">/ Month</p>
        </div>
        <div class="text-center mb-10">
            <Button size="md" pill outline class="w-full font-bold py-4">Choose Starter Plan</Button>
        </div>
        <ul class="space-y-4">
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-primary-700 rounded-full">
                    <Check color="#fff" size={16} />
                </div>
                <p class="font-medium">Min 10 transactions per week</p>
            </li>
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-primary-700 rounded-full">
                    <Check color="#fff" size={16} />
                </div>
                <p class="font-medium">Access to 50+ banks</p>
            </li>
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-primary-700 rounded-full">
                    <Check color="#fff" size={16} />
                </div>
                <p class="font-medium">Review system</p>
            </li>
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-primary-400 rounded-full">
                    <X color="#fff" size={16} />
                </div>
                <p class="font-medium">Unlimited access to features</p>
            </li>
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-primary-400 rounded-full">
                    <X color="#fff" size={16} />
                </div>
                <p class="font-medium">Automatic payments</p>
            </li>
        </ul>
    </div>

    <div class="sm:w-1/3 w-full px-6 py-10 rounded-xl bg-primary-700 text-white/90 sm:mx-6 mx-0 sm:my-0 my-6 shadow-primary-400 shadow-xl">
        <p class="text-2xl font-bold mb-3">Professional</p>
        <p class="font-bold mb-5">Perfect for growing teams and businesses.</p>
        <div class="mb-6 flex items-center">
            <b class="font-bold text-6xl">$29</b>
            <p class="font-bold">/ Month</p>
        </div>
        <div class="text-center mb-10">
            <Button color="alternative" size="md" pill class="w-full font-bold py-4">Choose Starter Plan</Button>
        </div>
        <ul class="space-y-4">
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-white rounded-full">
                    <Check color="#EDA35E" size={16} />
                </div>
                <p class="font-medium">Min 10 transactions per week</p>
            </li>
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-white rounded-full">
                    <Check color="#EDA35E" size={16} />
                </div>
                <p class="font-medium">Access to 50+ banks</p>
            </li>
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-white rounded-full">
                    <Check color="#EDA35E" size={16} />
                </div>
                <p class="font-medium">Review system</p>
            </li>
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-white rounded-full">
                    <Check color="#EDA35E" size={16} />
                </div>
                <p class="font-medium">Unlimited access to features</p>
            </li>
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-primary-600 rounded-full">
                    <X color="#fff" size={16} />
                </div>
                <p class="font-medium">Automatic payments</p>
            </li>
        </ul>
    </div>

    <div class="sm:w-1/3 w-full px-6 py-10 rounded-xl sm:mx-0 mx-2">
        <p class="text-2xl font-bold mb-3">Entreprise</p>
        <p class="font-bold mb-5">Tailored solutions for large-scale applications.</p>
        <div class="mb-6 flex items-center">
            <b class="font-bold text-6xl">$100</b>
            <p class="font-bold">/ Month</p>
        </div>
        <div class="text-center mb-10">
            <Button size="md" pill outline class="w-full font-bold py-4">Choose Pro Plan</Button>
        </div>
        <ul class="space-y-4">
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-primary-700 rounded-full">
                    <Check color="#fff" size={16} />
                </div>
                <p class="font-medium">Min 10 transactions per week</p>
            </li>
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-primary-700 rounded-full">
                    <Check color="#fff" size={16} />
                </div>
                <p class="font-medium">Access to 50+ banks</p>
            </li>
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-primary-700 rounded-full">
                    <Check color="#fff" size={16} />
                </div>
                <p class="font-medium">Review system</p>
            </li>
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-primary-700 rounded-full">
                    <Check color="#fff" size={16} />
                </div>
                <p class="font-medium">Unlimited access to features</p>
            </li>
            <li class="flex space-x-3 items-center">
                <div class="p-1 bg-primary-700 rounded-full">
                    <Check color="#fff" size={16} />
                </div>
                <p class="font-medium">Automatic payments</p>
            </li>
        </ul>
    </div>

</div>
