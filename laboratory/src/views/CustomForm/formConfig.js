export default [
  {
    colNum: 2,
    content: [
      {
        itemType: 'a-input',
        span: 12,
        layout: 'horizontal',
        offset: 6,
        labelName: '字段名称1',
        field: 'zdmc1',
        value: '',
        coordinate: [0,0],
        required: true,
        validateTrigger: true,
        rules: [{required: true, msg: '字段名称1不能为空'}],
      },
      {
        itemType: 'a-input',
        span: 12,
        layout: 'horizontal',
        offset: 6,
        labelName: '字段名称2',
        field: 'zdmc2',
        value: '',
        coordinate: [0,1],
        required: true,
        validateTrigger: true,
        rules: [{required: true, msg: '字段名称2不能为空'}]
      }
    ]
  },
  {
    colNum: 2,
    content: [
      {
        itemType: 'a-input',
        span: 12,
        layout: 'horizontal',
        offset: 6,
        labelName: '字段名称3',
        field: 'zdmc3',
        value: '',
        coordinate: [1,0],
        required: false,
        validateTrigger: false,
        rules: [{required: false, msg: '字段名称3不能为空'}],
      },
      {
        itemType: 'a-select',
        span: 12,
        layout: 'horizontal',
        offset: 6,
        labelName: '字段名称4',
        field: 'zdmc4',
        value: '',
        coordinate: [1,1],
        required: true,
        validateTrigger: true,
        rules: [{required: true, msg: '字段名称4不能为空'}]
      }
    ]
  },
  {
    colNum: 2,
    content: [
      {
        itemType: 'a-select',
        span: 12,
        layout: 'horizontal',
        offset: 6,
        labelName: '字段名称5',
        field: 'zdmc5',
        value: '',
        coordinate: [2,0],
        required: false,
        validateTrigger: false,
        rules: [{required: false, msg: '字段名称4不能为空'}]
      }
    ]
  },
]