<script>
export default {
  props: {
    // 不显示*号
    notShowStar: {
      type: Boolean,
      default: false
    },
    // 控制栅格大小
    span: {
      type: Number,
      default: 12
    },
    // 控制栅格内部布局
    layout: {
      type: String,
      default: 'horizontal',// horizontal vertical
    },
    // 横向结构的偏移量 
    offset: {
      type: Number,
      default: 6
    },
    // 标签名称
    labelName: {
      type: String,
      default: '测试标签：'
    },
    // 数据
    value: {
      type: String,
      default: ''
    },
    // 必填选项
    required: {
      type: Boolean,
      default: false
    },
    // 触发校验
    validateTrigger: {
      type: Boolean,
      default: false
    },
    // 校验规则
    rules: {
      type: Array,
      default: () => [{required: true, msg: '此选择框不能为空'}]
    }
  },
  data() {
    return {
      // 校验成功标志
      validateSuccess: true,
      // 是否显示校验失败特效
      isShowFailure: false,
      // 错误提示词
      failureWord: '',
      options: [
        {name: 'xx1',value: '1'},
        {name: 'xx2',value: '2'},
        {name: 'xx3',value: '3'},
        {name: 'xx4',value: '4'},
      ]
    }
  },
  mounted() {
    // console.log('cInput')
  },
  methods: {
    // 判断布局
    judgeLayout() {
      if(Object.is(this.layout, 'horizontal')) {
        return (
          <a-row type="flex" align="middle">
            <a-col span={this.offset}>
              <a-row type="flex" justify="end" align="middle">
                {this.isAsterisk()}
                <a-col>
                  <p class="label">
                    {this.labelName}
                  </p>
                </a-col>
              </a-row>
            </a-col>
            <a-col class={(this.validateTrigger && this.isShowFailure) && 'validate-failure'} span={24-this.offset}>
              <a-select value={this.value} onBlur={() => this.validate()} onChange={(e) => this.valueChange(e)}>
                {
                  this.options.map(v => (<a-select-option key={v.value}>{v.name}</a-select-option>))
                }
              </a-select>
            </a-col>
          </a-row>
        )
      }
    },
    // 校验
    validate() {
      if(this.validateTrigger) {
        this.validateSuccess = true
        this.isShowFailure = false
        this.failureWord = ''
        try {
          this.rules.forEach(v => {
            if(v.required) {
              if(this.value.length === 0) {
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
    valueChange(e) {
      this.$emit('getValue', e)
    },
    // 是否显示*号
    isAsterisk() {
      // 校验成功
      if(!this.required || this.notShowStar) {
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
      <a-col span={this.span}>
        {
          this.judgeLayout()
        }
        <a-row>
          <a-col span={24-this.offset} offset={this.offset}>
            <p class="validate-failure-text">{this.failureWord}</p>
          </a-col>
        </a-row>
      </a-col>
    )
  }
}
</script>

<style lang="stylus" scoped>
/deep/ .ant-select
  width 100%
.label
  margin-right 8px
.validator
  color red
  font-size 14px
  margin-right 2px
.validate-failure
  /deep/ .ant-select
    border-color red!important
    box-shadow rgba(230,0,0,0.2)!important
  /deep/ .ant-select:focus
    border-color red!important
    box-shadow rgba(230,0,0,0.2)!important
.validate-failure-text
  color red
  font-size 13px
  padding 5px 0
  box-sizing border-box
</style>