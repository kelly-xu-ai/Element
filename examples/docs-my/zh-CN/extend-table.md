## ExtendTable 扩展表格

可用于表格编辑（需要配合v-model接口的组件使用）。

### 基础用法

表格的编辑和展示。

:::demo 使用`prop`，`format`，`render`，`slot`来确定表格的展示方式，用component来定义表格编辑方式。

```html
<el-extend-table @change="changeHandle" :data="tableData" :column="column">
  <template slot="remark" slot-scope="{ value, row, index }">
    <span style="color: red">备注：{{value}}</span>
  </template>
</el-extend-table>

<script>
  const tableData = [
    {
      name: 'test',
      age: 13,
      gender: 1,
      remark: '112313'
    },
    {
      name: 'test2',
      age: 13,
      gender: 0,
      remark: '112313'
    },
    {
      name: 'test7',
      age: 18,
      gender: 1,
      remark: '112313'
    }
  ]
  export default {
    data() {
      return {
        tableData,
        column: [
          {
            label: '姓名',
            prop: 'name',
            component: 'el-input',
            editable: false
          },
          {
            label: '年龄',
            prop: 'age',
            format({ value }) {
              return  `${value}岁`
            },
            width: '200',
            component: 'el-input-number'
          },
          {
            label: '性别',
            prop: 'gender',
            render(h, { value }) {
              const gMap =[{ icon: 'el-icon-male', label: '男' }, { icon: 'el-icon-female', label: '女'}]
              return h('span', {class: gMap[value].icon}, [gMap[value].label])
            },
            component: {
              name: {
                props: ['value'],
                render(h) {
                  return h(
                    'el-radio-group',
                    {
                      props: { value: this.value },
                      on: {
                        input: value => this.$emit('input', value)
                      } 
                    },
                    [
                      h('el-radio', { props: { label: 0 } }, ['男']),
                      h('el-radio', { props: { label: 1 } }, ['女'])
                    ]
                  )
                }
              }
            }
          },
          {
            label: '备注',
            prop: 'remark',
            slot: 'remark',
            component: {
              name: 'el-input',
              type: 'textarea'
            }
          }
        ]
      };
    },
    methods: {
      changeHandle(data) {
        console.log('change:', data)
      }
    }
  }
</script>
```
:::

### Table中表单联动

读取行数据，设置编辑状态，动态修改值等。

:::demo 可以使用editable，可以在自定义组件中修改row的值，可以使用watch来监听修改等方式。

```html
<el-extend-table :data="tableData" :column="column">
</el-extend-table>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            method: 1,
            time: 1.1,
            cost: 0,
            remark: ''
          },
          {
            method: 2,
            time: 0.3,
            cost: 10,
            remark: ''
          },
          {
            method: 3,
            time: 0.6,
            cost: 2,
            remark: ''
          },
          {
            method: 4,
            time: 0,
            cost: 15,
            remark: '坐专机'
          }
        ],
        column: [
          {
            label: '出行方式',
            prop: 'method',
            render(h, { value }) {
              const cell = [
                [],
                ['el-icon-picture-outline-round', '骑行'],
                ['el-icon-headset', '开车'],
                ['el-icon-location-outline', '地铁'],
                ['el-icon-chat-dot-round', '其他']
              ][value] || []
              return h('span', { class: [cell[0] ? cell[0] : ''] }, cell[1])
            },
            component:{
              name: {
                props: ['value', 'row'],
                render(h) {
                  return h(
                    'el-select',
                    {
                      props: {
                        placeholder: '请选择出行方式',
                        value: this.value
                      },
                      on: {
                        input: value => {
                          if (value === 1) {
                            this.row.cost = 0
                          }
                          if (value !== 4) {
                            this.row.remark = ''
                          }
                          this.$emit('input', value)
                        }
                      }
                    },
                    [
                      h('el-option', {props: {label: '骑行', value: 1}}),
                      h('el-option', {props: {label: '开车', value: 2}}),
                      h('el-option', {props: {label: '地铁', value: 3}}),
                      h('el-option', {props: {label: '其他', value: 4}})
                    ]
                  )
                }
              }
            }
          },
          {
            label: '时长',
            prop: 'time',
            format({value}) {
              return `${value}h`
            },
            component: {
              name: {
                props: ['value', 'row'],
                watch: {
                  'row.method': function(value) {
                    const time = [0, 1.1, 0.3, 0.6, 0][value]
                    this.row.time = time
                  }
                },
                render(h) {
                  return h(
                    'el-input-number',
                    {
                      props: {
                        value: this.value
                      },
                      on: {
                        change: value => this.$emit('input', value)
                      }
                    }
                  )
                }
              }
            },
            width: 200,
          },
          {
            label: '花费',
            prop: 'cost',
            format({value, row}) {
              return row.method === 1 ? '——' : `${value}￥`
            },
            component: 'el-input-number',
            width: 200,
            editable({row}) {
              return row.method !== 1
            }
          },
          {
            label: '说明',
            prop: 'remark',
            component: {
              name: 'el-input'
            },
            editable({row}) {
              return row.method === 4
            }
          }
        ]
      };
    }
  }
</script>
```
:::

### Table中表单验证

当输入数字以外的字符时不生效，且退回原来的值。

:::demo 用on中的事件来限定输入。ps：当event，on，rules中事件同名时，触发事件顺序event>on>rules（目前rules不生效）。

```html
<el-extend-table :data="tableData" :column="column">
  <template slot="name" slot-scope="{ value, state, message }">
    <span>
      {{value}}
      <el-tooltip v-if="state === 'error'" :content="message" placement="top">
        <i class="el-icon-error" style="color: #F56C6C;"></i>
      </el-tooltip>
    </span>
  </template>
  <template slot="phone" slot-scope="{ value, state, message }">
    <span>
      {{value}}
      <el-tooltip v-if="state === 'error'" :content="message" placement="top">
        <i class="el-icon-error" style="color: #F56C6C;"></i>
      </el-tooltip>
      <i v-if="state === 'success'" class="el-icon-success" style="color: #67C23A"></i>
    </span>
  </template>
</el-extend-table>

<script>
  const validateRender = function(h) {
    return h(
      'el-input',
      {
        props: { value: this.value },
        on: { input: value => this.$emit('input', value) }
      },
      [
        this.state === 'error'
          ? h(
            'el-tooltip',
            {
              props: { content: this.message, placement: 'top' },
              slot: 'suffix',
              style: { color: '#F56C6C' }
            },
            [h('i', { class: 'el-input__icon el-icon-error' })]
          )
          : h(
            'i',
            {
              class: 'el-input__icon el-icon-success',
              slot: 'suffix',
              style: { color: '#67C23A' }
            }
          )
      ]
    )
  }
  export default {
    data() {
      return {
        tableData: [
          {
            name: '张三',
            phone: '18800000000',
            address: '江苏南京'
          },
          {
            name: '李四',
            phone: '17300000000',
            address: '广州深圳'
          },
          {
            name: 'DIO',
            phone: '13100000000',
            address: '埃及'
          },
          {
            name: 'JOJO',
            phone: '18000000000',
            address: '英国'
          }
        ],
        column: [
          {
            label: '姓名',
            prop: 'name',
            slot: 'name',
            component: {
              name: {
                props: ['value', 'state', 'message'],
                render: validateRender
              }
            },
            rules: [
              { required: true, message: '请输入姓名', trigger: 'input' },
              { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'input' }
            ]
          },
          {
            label: '联系方式',
            prop: 'phone',
            slot: 'phone',
            component: {
              name: {
                props: ['value', 'state', 'message'],
                render: validateRender
              }
            },
            rules: [
              { required: true, message: '请输入联系方式', trigger: 'input' },
              {
                trigger: 'input',
                validator: (rule, value, callback) => {
                  if (/^1[3456789]\d{9}$/.test(value)) {
                    callback()
                  } else {
                    callback(new Error('请输入正确手机号!'))
                  }
                }
              }
            ]
          },
          {
            label: '地址',
            prop: 'address',
            component: {
              name: 'el-input',
              type: 'textarea'
            }
          }
        ]
      };
    }
  }
</script>
```
:::

### on中事件改写默认事件

当输入数字以外的字符时不生效，且退回原来的值。

:::demo 用on中的事件来限定输入。ps：当event，on，rules中事件同名时，触发事件顺序event>on>rules（目前rules不生效）。

```html
<el-extend-table :data="tableData" :column="column">
  <template slot="remark" slot-scope="{ value, row, index }">
    <span style="color: red">备注：{{value}}</span>
  </template>
</el-extend-table>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            no: 1,
            name: 'name',
            remark: '444444444'
          }
        ],
        column: [
          {
            label: 'no',
            prop: 'no'
          },
          {
            label: 'name',
            prop: 'name'
          },
          {
            label: '编辑时只能输入数字',
            prop: 'remark',
            component: {
              name: 'el-input',
              on: {
                input: ({row, prop, index, oldValue }, $event) => {
                  if (!/^[0-9]*$/.test($event)) {
                    row[prop] = oldValue
                  }
                }
              }
            }
          }
        ]
      };
    }
  }
</script>
```
:::

### Table Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data | 表单数据 | array | — | — |
| column | 表单列定义 | array | — | — |
| editable | 可编辑 | boolean | — | true |
| 其他 | 参照el-table | — | — | 参照el-table |

### Table Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 编辑值发生改变时触发 | { row, prop, index, value, oldValue, state, message } |
| 其他 | 参照el-table | 参照el-table |

### Table Methods
| 方法名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| validate | 对整个表格进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段 | Function(callback: Function(boolean, array)) |
| validateRow | 对整个表格一行进行校验的方法，参数为行索引和一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段 | Function(index: number, callback: Function(boolean, objetc)) |
| validateCell | 对部分表格字段进行校验的方法，参数为行索引、列props和一个回调函数。 | Function(index: number, props: array | string, callback: Function(errorMessage: string)) |
| clearValidate | 移除表格项的校验结果。传入待移除的表格项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果 | Function(props: array | string) |
| clearRowValidate | 移除表格项一行的校验结果。传入待移除的行索引和表格项的 prop 属性或者 prop 组成的数组，如不传则移除整行的校验结果 | Function(index: number, props: array | string) |

### Column Item
| 参数      | 说明          | 类型      | 可选值                           | 备注  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| prop | 列对应键值 | string | — | — |
| label | 列标题 | srting | — | — |
| format | 格式化数据 | function | — | 参数{ index, value, row, state, message } |
| render | render函数 | function | — | 参数h, { index, value, row, state, message } |
| slot | 插槽 | string | — | 作用域插槽slot-scope="{ index, value, row, state, message }" |
| editable | 可编辑 | boolean/() => boolean | — | 当不存在component时，不生效。存在component时，默认值是true。当为function时会传入参数{ row, index } |
| component | 编辑项定义 | string/object | — | — |
| rules | 验证规则 | object/array | — | 参考el-form中的验证 |
| 其他 | 其他属性会自动映射到el-table-column上 | — | — | — |

### Component Object
| 参数      | 说明          | 类型      | 可选值                           | 备注  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 声明组件 | string/VueComponentOptions | — | — |
| event | 双向绑定触发事件 | srting | — | 默认值input，当event，on，rules中事件同名时目前触发顺序是event>on>rules |
| on | 编辑组件触发事件回调 | object{function/array[function]} | — | 需要注意this的指向问题，不建议使用，如果需要监听编辑组件的修改可使用table中的change事件，判断参数中的prop, index即可判断出具体改变 |
| 其他 | 其他属性会自动映射到组件的属性上 | — | — | 所有组件props上都会额外被传入row, column, index |