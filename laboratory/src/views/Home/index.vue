<template lang="pug">
	.container
		.home-header
		.home-body
			.home-body-aside
				AsideMenu(:menuData="menuData")
			.home-body-content
				router-view
</template>

<script>
	import menuData from '../../mock/homeMenuData'
	export default {
		components: {
			AsideMenu: () => import('./components/asideMenu.vue')
		},
		data() {
			return {
				menuData: menuData
			}
		},
		methods: {
		
		}
	}
</script>

<style lang="stylus" scoped>
@import "../../assets/common/commonBase.styl";
.container
	width 100%
	height 100%
	display flex
	flex-direction column
	.home-header
		width 100%
		height $headerH
		flex-shrink 0
		background-color #ccc
	.home-body
		width 100%
		height 'calc(100% - %s)' % $headerH
		flex-shrink 0
		display flex
		flex-direction row
		.home-body-aside
			width $asideW
			height 100%
			/deep/ .ant-menu
				height 100%
		.home-body-content
			width 'calc(100% - %s)' % $asideW
			height 100%
</style>