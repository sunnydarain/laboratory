<template lang="pug">
	.container
		.form-container
			a-row(v-for="(v, index) in config",:key="index")
				template(v-for="item in v.content")
					CInput(v-if="Object.is(item.itemType, 'a-input')",:ref="item.field",@getValue="getInputValue($event, item.field)",@getValidate="getValidate",:value="form[item.field]",:span="item.span",:layout="item.layout",:offset="item.offset",:labelName="item.labelName",:required="item.required",:validateTrigger="item.validateTrigger",:rules="item.rules")
					CSelect(v-if="Object.is(item.itemType, 'a-select')",:ref="item.field",@getValue="getInputValue($event, item.field)",@getValidate="getValidate",:value="form[item.field]",:span="item.span",:layout="item.layout",:offset="item.offset",:labelName="item.labelName",:required="item.required",:validateTrigger="item.validateTrigger",:rules="item.rules")
			a-row(type="flex",justify="center")
				a-button(type="primary",@click="validateForm") 校验表单
</template>

<script>
	import config from './formConfig'
	export default {
		components: {
			// 输入框组件
			CInput: () => import('./components/cInput.vue'),
			// 选择器组件
			CSelect: () => import('./components/cSelect.vue')
		},
		data() {
			return {
				form: {
					zdmc1: '',
					zdmc2: 'world',
					zdmc3: '',
					zdmc4: '',
					zdmc5: ''
				},
				config: config,
				validateResult: true
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				for(let i in this.config) {
					config[i].content.forEach(v => {
						v.value = this.form[v.field]
					})
				}
			},
			// 校验表单
			validateForm() {
				this.validateResult = true
				Object.keys(this.form).forEach(key => {
					this.$refs[key][0].validate()
				})
				console.log('校验表单结果', this.validateResult)
			},
			// 获取值
			getInputValue(val, type) {
				// console.log(val, type)
				this.form[type] = val
			},
			// 获取校验结果
			getValidate(val) {
				this.validateResult = this.validateResult && val
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
		padding 16px
		box-sizing border-box
		.form-container
			width 800px
			height 100%
			overflow-x hidden
			overflow-y auto
			border 1px solid #ccc
			padding 16px 24px
			box-sizing border-box
</style>