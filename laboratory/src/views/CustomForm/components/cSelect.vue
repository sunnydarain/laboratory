<script>
export default {
  props: {
    // 选择器类型（common: 普通类型，treeSig: 树单选，treeMulti: 树多选）
    // 数据
    value: {
      type: String||Array,
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
      failureWord: '',
      options: [
        {name: 'xx1',value: '1'},
        {name: 'xx2',value: '2'},
        {name: 'xx3',value: '3'},
        {name: 'xx4',value: '4'},
      ],
      treeOptions: {
        id: '1',
        name: 'tree',
        value: 'all',
        data: [
          {
            id: '2',
            name: 'tree1',
            value: '0',
            data: [
              {id: '3',name: 'xx1',value: '1'},
              {id: '4',name: 'xx2',value: '2'},
            ]
          },
          {
            id: '5',
            name: 'tree2',
            value: '3',
            data: [
              {id: '6',name: 'xx3',value: '4'},
              {id: '7',name: 'xx4',value: '5'},
            ]
          }
        ]
      }
    }
  },
  mounted() {
    // console.log('cInput')
  },
  methods: {
    // 判断布局
    judgeLayout() {
      if(Object.is(this.config.layout, 'horizontal')) {
        if(Object.is(this.config.sType, 'common')) {
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
                <a-select value={this.value} onBlur={() => this.validate()} onChange={(e) => this.valueChange(e)}>
                  {
                    this.options.map(v => (<a-select-option key={v.value}>{v.name}</a-select-option>))
                  }
                </a-select>
              </a-col>
            </a-row>
          )
        }
        if(Object.is(this.config.sType, 'treeSig')) {
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
                <a-tree-select value={this.value} onBlur={() => this.validate()} onChange={(e) => this.valueChange(e)}>
                  <a-tree-select-node key={this.treeOptions.id} value={this.treeOptions.value} title={this.treeOptions.name}>
                    {
                      this.treeOptions.data.map(v => this.ergodicTreeData(v))
                    }
                  </a-tree-select-node>
                </a-tree-select>
              </a-col>
            </a-row>
          )
        }
        if(Object.is(this.config.sType, 'treeMulti')) {
          console.log(2)
        }
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
              if([[],'',0,{},null,undefined].includes(this.value)) {
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
      await this.$emit('getValue', e)
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
    },
    // 遍历树形数据
    ergodicTreeData(item) {
      if(!item.data) {
        return (
          <a-tree-select-node key={item.id} value={item.value} title={item.name}></a-tree-select-node>
        )
      }
      if(item.data) {
        return (
          <a-tree-select-node key={item.id} value={item.value} title={item.name}>
            {
              item.data.map(v => this.ergodicTreeData(v))
            }
          </a-tree-select-node>
        )
      }
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
/deep/ .ant-select
  width 100%
.label
  margin-right 8px
.validator
  color red
  font-size 14px
  margin-right 2px
.validate-failure
  /deep/ .ant-select-selection
    border-color red!important
    box-shadow rgba(230,0,0,0.2)!important
  /deep/ .ant-select-selection:focus
    border-color red!important
    box-shadow rgba(230,0,0,0.2)!important
.validate-failure-text
  color red
  font-size 13px
  padding 5px 0
  box-sizing border-box
</style>