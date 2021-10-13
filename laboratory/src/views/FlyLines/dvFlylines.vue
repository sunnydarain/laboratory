<template lang="pug">
	.container
		dv-flyline-chart-enhanced.dataview-container(:dev="false",:config="config")
</template>

<script>
	import config from '../../assets/map/zhenzhou'
	export default {
		data() {
			return {
				config: config
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.container
		width 100%
		height 100%
		display flex
		flex-direction row
		justify-content center
		align-items center
		.dataview-container
			width 1000px
			height 800px
</style>