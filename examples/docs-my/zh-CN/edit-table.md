## EditTable 可编辑表格

用于表格编辑（需要配合v-model接口的组件使用）。

### 基础用法

:::demo 使用`prop`，`format`，`render`，`slot`来确定表格的展示方式，用component来定义表格编辑方式。

```html
<el-edit-table @change="changeHandle" :data="tableData" :column="column">
  <template slot="remark" slot-scope="{ value, row, index }">
    <span style="color: red">备注：{{value}}</span>
  </template>
</el-edit-table>

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

### 表单联动

读取行数据，设置编辑状态，动态修改值等。

:::demo 可以使用editable，可以在自定义组件中修改row的值，可以使用watch来监听修改等方式。

```html
<el-edit-table :data="tableData" :column="column">
</el-edit-table>

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

### on中事件改写默认事件

当输入数字以外的字符时不生效，且退回原来的值。

:::demo 用on中的事件来限定输入。ps：当event，on，rules中事件同名时，触发事件顺序event>on>rules（目前rules不生效）。

```html
<el-edit-table :data="tableData" :column="column">
  <template slot="remark" slot-scope="{ value, row, index }">
    <span style="color: red">备注：{{value}}</span>
  </template>
</el-edit-table>

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
| change | 编辑值发生改变时触发 | { row, prop, index, value, oldValue } |
| 其他 | 参照el-table | 参照el-table |

### Column Item
| 参数      | 说明          | 类型      | 可选值                           | 备注  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| prop | 列对应键值 | string | — | — |
| label | 列标题 | srting | — | — |
| format | 格式化数据 | function | — | 参数{ index, value, row } |
| render | render函数 | function | — | 参数h, { index, value, row } |
| slot | 插槽 | string | — | 作用域插槽slot-scope="{ index, value, row }" |
| editable | 可编辑 | boolean/() => boolean | — | 当不存在component时，不生效。存在component时，默认值是true。当为function时会传入参数{ row, index } |
| component | 编辑项定义 | string/object | — | — |
| rules | 验证规则 | object/array | — | 参考el-form中的验证（暂时可能无效，后面完善） |
| 其他 | 其他属性会自动映射到el-table-column上 | — | — | — |

### Component Object
| 参数      | 说明          | 类型      | 可选值                           | 备注  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 声明组件 | string/VueComponentOptions | — | — |
| event | 双向绑定触发事件 | srting | — | 默认值input，当event，on，rules中事件同名时目前触发顺序是event>on>rules |
| on | 编辑组件触发事件回调 | object{function/array[function]} | — | 需要注意this的指向问题，不建议使用，如果需要监听编辑组件的修改可使用table中的change事件，判断参数中的prop, index即可判断出具体改变 |
| 其他 | 其他属性会自动映射到组件的属性上 | — | — | 所有组件props上都会额外被传入row, column, index |
