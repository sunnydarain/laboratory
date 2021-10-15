<script>
export default {
  props: {
    // 数据
    value: {
      type: String||Number,
      default: ''
    },
    // 配置选项
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 校验成功标志
      validateSuccess: true,
      // 是否显示校验失败特效
      isShowFailure: false,
      // 错误提示词
      failureWord: ''
    }
  },
  mounted() {
    // console.log('cInput')
  },
  methods: {
    // 判断布局
    judgeLayout() {
      if(Object.is(this.config.layout, 'horizontal')) {
        return (
          <a-row type="flex" align="middle">
            <a-col span={this.config.offset}>
              <a-row type="flex" justify="end" align="middle">
                {this.isAsterisk()}
                <a-col>
                  <p class="label">
                    {this.config.labelName}
                  </p>
                </a-col>
              </a-row>
            </a-col>
            <a-col class={(this.config.validateTrigger && this.isShowFailure) && 'validate-failure'} span={24-this.config.offset}>
              <a-input value={this.value} onBlur={() => this.validate()} onChange={(e) => this.valueChange(e)}></a-input>
            </a-col>
          </a-row>
        )
      }
    },
    // 校验
    validate() {
      if(this.config.validateTrigger) {
        this.validateSuccess = true
        this.isShowFailure = false
        this.failureWord = ''
        try {
          this.config.rules.forEach(v => {
            if(v.required) {
              if([[],'',0,null,undefined].includes(this.value)) {
                throw new Error(v.msg)
              }
            }
          })
        } catch (e) {
          this.isShowFailure = true
          this.result = false
          this.validateSuccess = false
          this.failureWord = e.message || '不能为空'
        }
      }else {
        return ''
      }
      this.$emit('getValidate', this.validateSuccess)
    },
    // 数据改变
    async valueChange(e) {
      await this.$emit('getValue', e.target.value)
      await this.validate()
    },
    // 是否显示*号
    isAsterisk() {
      // 校验成功
      if(!this.config.required || this.config.notShowStar) {
        return (
          <a-col></a-col>
        )
      }
      // 校验失败&&未校验
      return (
        <a-col><span class="validator">*</span></a-col>
      )
    }
  },
  render() {
    return (
      <a-col span={this.config.span}>
        {
          this.judgeLayout()
        }
        <a-row>
          <a-col span={24-this.config.offset} offset={this.config.offset}>
            <p class="validate-failure-text">{this.failureWord}</p>
          </a-col>
        </a-row>
      </a-col>
    )
  }
}
</script>

<style lang="stylus" scoped>
.label
  margin-right 8px
.validator
  color red
  font-size 14px
  margin-right 2px
.validate-failure
  /deep/ .ant-input
    border-color red!important
    box-shadow rgba(230,0,0,0.2)!important
  /deep/ .ant-input:focus
    border-color red!important
    box-shadow rgba(230,0,0,0.2)!important
.validate-failure-text
  color red
  font-size 13px
  padding 5px 0
  box-sizing border-box
</style>