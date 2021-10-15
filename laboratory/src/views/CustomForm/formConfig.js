/*
  {
    notShowStar: 不显示*号
    span: 列宽
    layout: 布局
    offset: 偏移量
    labelName: 字段名称
    required: 是否为空
    validateTrigger: 验证触发
    rules: 验证规则
    coordinate: 坐标
  }
*/
export default [
  {
    colNum: 2,
    content: [
      {
        itemType: 'a-input',
        config: {
          notShowStar: false,
          span: 12,
          layout: 'horizontal',
          offset: 6,
          labelName: '字段名称1',
          required: true,
          validateTrigger: true,
          rules: [{required: true, msg: '字段名称1不能为空'}],
          coordinate: [0,0],
        },
        field: 'zdmc1',
        value: '',
      },
      {
        itemType: 'a-select',
        config: {
          sType: 'common',
          span: 12,
          layout: 'horizontal',
          offset: 6,
          labelName: '字段名称2',
          coordinate: [0,1],
          required: true,
          validateTrigger: true,
          rules: [{required: true, msg: '字段名称2不能为空'}]
        },
        field: 'zdmc2',
        value: '',
      }
    ]
  },
  {
    colNum: 2,
    content: [
      {
        itemType: 'a-select',
        config: {
          sType: 'treeSig',
          span: 12,
          layout: 'horizontal',
          offset: 6,
          labelName: '字段名称3',
          coordinate: [0,1],
          required: true,
          validateTrigger: true,
          rules: [{required: true, msg: '字段名称3不能为空'}]
        },
        field: 'zdmc3',
        value: '',
      }
    ]
  }
]