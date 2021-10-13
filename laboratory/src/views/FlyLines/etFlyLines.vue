<template lang="pug">
	.container
		.echarts-container(ref="echarts")
</template>

<script>
	import * as myEcharts from 'echarts'
	import chinaMap from '../../assets/map/geochina.json'
	export default {
		data() {
			return {
				
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				let myEchart = myEcharts.init(this.$refs.echarts)
				const coord = chinaMap.features.map(val => {
					if(val.properties.name) {
						return {
							name: val.properties.name,
							value: val.properties.center
						}
					}
				}).filter(v => v != undefined)
				// console.log(coord)
				// 定义起始点的数组
				const lines_coord = []
				coord.forEach((v, index) => {
					index > 0 && lines_coord.push({
						coords: [v.value, coord[0].value]
					})
				})
				// console.log(lines_coord)
				myEcharts.registerMap('chinaMap', chinaMap)
				myEchart.setOption({
					geo: {
						name: '地图',
						map: 'chinaMap',
						zlevel: 10,
						show: true,
						layoutCenter: ['50%', '50%'],
						roam: false,
						layoutSize: '90%',
						zoom: 1,
						label: {
							normal: {
								show: true,
								textStyle: {
									fontSize: 12,
									color: '#43D0D6'
								}
							}
						},
						itemStyle: {
							emphasis: {
								label: {
									show: true,
								},
								areaColor: '#FFB800'
							},
							normal: {
								areaColor: '#1b579c',
								borderWidth: 1,
								borderColor: '1ECEF4'
							}
						}
					},
					series: [
						{
							type: 'effectScatter',
							coordinateSystem: 'geo',
							zlevel: 15,
							symbolSize: 6,
							rippleEffect: {
								period: 0,
								brushType: 'stroke',
								scale: 0
							},
							itemStyle: {
								color: '#FFB800',
								opacity: 0
							},
							data: coord.slice(1)
						},
						{
							type: 'effectScatter',
							coordinateSystem: 'geo',
							zlevel: 15,
							symbolSize: 10,
							// 调整气泡的样式
							rippleEffect: {
								period: 10,// 呼吸频率
								brushType: 'fill', // stroke
								scale: 6 // 气泡大小
							},
							itemStyle: {
								color: '#FF5722',
								opacity: 1
							},
							data: coord.slice(0, 1)
						},
						{
							type: 'effectScatter',
							coordinateSystem: 'geo',
							zlevel: 15,
							symbolSize: 10,
							// 调整气泡的样式
							rippleEffect: {
								period: 10,// 呼吸频率
								brushType: 'fill',
								scale: 6 // 气泡大小
							},
							itemStyle: {
								color: '#FF5722',
								opacity: 1
							},
							data: [coord[25]]
						},
						{
							type: 'effectScatter',
							coordinateSystem: 'geo',
							zlevel: 15,
							symbolSize: 10,
							// 调整气泡的样式
							rippleEffect: {
								period: 10,// 呼吸频率
								brushType: 'fill',
								scale: 6 // 气泡大小
							},
							itemStyle: {
								color: '#FF5722',
								opacity: 1
							},
							data: [coord[11]]
						},
						{
							type: 'lines',
							coordinateSystem: 'geo',
							zlevel: 15,
							symbolSize: 12,
							effect: {
								show: true,
								period: 5,
								trailLength: 0,
								symbol: 'arrow',
								symbolSize: 5,
								color: '#01AAED'
							},
							itemStyle: {
								normal: {
									borderWidth: 1,
									lineStyle: {
										type: 'solid',
										shadowBlur: 10
									}
								}
							},
							lineStyle: {
								normal: {
									width: 1,
									opacity: 0.6,
									curveness: 0.2,
									color: '#FFB800'
								}
							},
							// data: lines_coord
							// data: [lines_coord[12],lines_coord[20]]
							data: [lines_coord[10]]
						},
						{
							type: 'lines',
							coordinateSystem: 'geo',
							zlevel: 15,
							symbolSize: 12,
							effect: {
								show: true,
								period: 5,
								trailLength: 0,
								symbol: 'arrow',
								symbolSize: 5,
								color: '#01AAED'
							},
							itemStyle: {
								normal: {
									borderWidth: 1,
									lineStyle: {
										type: 'solid',
										shadowBlur: 10
									}
								}
							},
							lineStyle: {
								normal: {
									width: 1,
									opacity: 0.6,
									curveness: 0.2,
									color: '#FFB800'
								}
							},
							// data: lines_coord
							// data: [lines_coord[12],lines_coord[20]]
							data: [lines_coord[24]]
						}
					]
				})
				window.addEventListener('resize', () => {
					myEchart.resize()
				})
			},
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
		.echarts-container
			width 1000px
			height 800px
			background-color #1b579c
</style>