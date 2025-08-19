<template>
	<div class="">
		<div class="flex w-full">
			<svg width="24" :height="height" viewBox="0 0 24 76" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M19.2901 9.17005L7.70015 3.07005C4.95015 1.62005 1.96015 4.55005 3.35015 7.33005L4.97015 10.57C5.42015 11.47 5.42015 12.53 4.97015 13.43L3.35015 16.67C1.96015 19.45 4.95015 22.37 7.70015 20.93L19.2901 14.83C21.5701 13.63 21.5701 10.37 19.2901 9.17005Z"
					:stroke="stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				<path d="M12 24L12 52" :stroke="stroke" stroke-linecap="round" stroke-dasharray="4 4" />
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M4.23926 62.3912C4.25367 58.1506 7.70302 54.7247 11.9436 54.7391C16.1842 54.7535 19.6102 58.2028 19.5958 62.4434V62.5304C19.5436 65.2869 18.0045 67.8347 16.1175 69.826C15.0384 70.9466 13.8333 71.9387 12.5262 72.7825C12.1767 73.0848 11.6583 73.0848 11.3088 72.7825C9.36033 71.5143 7.65019 69.9131 6.25665 68.0521C5.01461 66.4293 4.30942 64.4597 4.23926 62.4173L4.23926 62.3912Z"
					:stroke="stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				<circle cx="11.9179" cy="62.539" r="2.46087" :stroke="stroke" stroke-width="1.5" stroke-linecap="round"
					stroke-linejoin="round" />
			</svg>

			<!-- Address Text -->
			<div class="relative w-full ms-2 overflow-hidden text-sm" :class="`h-[${height}px]`">
				<p class="text-gray-800 absolute top-0 truncate whitespace-nowrap">{{ fromAddress }}</p>
				<p class="text-gray-800 absolute bottom-0 truncate whitespace-nowrap">{{ toAddress }}</p>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: "AlertBox",
	props: {
		fromAddress: String,
		toAddress: String,
		height: {type: Number, default: 70},
		stroke: {type: String, default: '333333'},
	},
};
</script>