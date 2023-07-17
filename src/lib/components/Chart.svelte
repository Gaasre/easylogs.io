<script lang="ts">
	import moment from 'moment';
	import { onMount } from 'svelte';

	export let warnings: number[][] | undefined;
	export let errors: number[][] | undefined;
	export let infos: number[][] | undefined;
	export let successes: number[][] | undefined;
	export let date: string;

	let chartView: any;

	onMount(async () => {
		const { chart } = await import('svelte-apexcharts');
		chartView = chart;
	});

	$: {
		options = {
			...options,
			series: [
				{
					name: 'Errors',
					data: errors,
					color: '#f98080'
				},
				{
					name: 'Infos',
					data: infos,
					color: '#76a9fa'
				},
				{
					name: 'Warnings',
					data: warnings,
					color: '#faca15'
				},
				{
					name: 'Successes',
					data: successes,
					color: '#31c48d'
				}
			]
		};
		options = {
			...options,
			xaxis: {
				...options.xaxis,
				min: moment(date, 'YYYY-MM-DD').startOf('day').valueOf(),
				max: moment(date, 'YYYY-MM-DD').endOf('day').valueOf()
			}
		};
	}

	let options = {
		chart: {
			type: 'area',
			toolbar: {
				show: false
			},
			height: 400,
			zoom: {
				enabled: false
			}
		},
		stroke: {
			curve: 'smooth'
		},
		fill: {
			type: 'gradient'
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
		tooltip: {
			showForSingleSeries: true
		},
		series: [
			{
				name: 'Errors',
				data: errors,
				color: '#f98080'
			},
			{
				name: 'Infos',
				data: infos,
				color: '#76a9fa'
			},
			{
				name: 'Warnings',
				data: warnings,
				color: '#faca15'
			},
			{
				name: 'Successes',
				data: successes,
				color: '#31c48d'
			}
		],
		yaxis: {
			labels: {
				formatter: (value: number) => {
					return value.toFixed(0);
				}
			}
		},
		xaxis: {
			type: 'datetime',
			tickAmount: 6,
			min: moment(date, 'YYYY-MM-DD').startOf('day').valueOf(),
			max: moment(date, 'YYYY-MM-DD').endOf('day').valueOf(),
			labels: {
				formatter: (value: any, timestamp: any) => {
					return moment(Math.ceil(value)).format('HH:mm');
				}
			}
		}
	};
</script>

{#if chartView}
	<div use:chartView={options} />
{/if}
