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
            editable: true
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
                  const { changeValue } = this
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

### Component Object on 覆盖 event

:::demo 编辑组件是用on来覆盖event事件。

```html
<el-edit-table @change="changeHandle" :data="tableData" :column="column">
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
            label: 'remark',
            prop: 'remark',
            component: {
              name: 'el-input',
              on: {
                input({ row, prop }, $event) {
                  row[prop] = $event
                }
              }
            }
          }
        ]
      };
    },
    methods: {
      changeHandle(code, { level, province, city, district }) {
        console.log('change:', code, level, province, city, district)
      },
      tabHandle(code, { level, province, city, district }) {
        console.log('tab:', code, level, province, city, district)
      }
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
| editable | 可编辑 | boolean | — | true（暂时可能无效，后面完善。） |
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
| editable | 可编辑 | boolean | — | 默认是false，值为true时相当于component为el-input |
| component | 编辑项定义 | string/object | — | — |
| 其他 | 其他属性会自动映射到el-table-column上 | — | — | — |

### Component Object
| 参数      | 说明          | 类型      | 可选值                           | 备注  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 声明组件 | string/VueComponentOptions | — | — |
| event | 双向绑定触发事件 | srting | — | 默认值input，会被on中的同名回调事件覆盖，需要自行处理双向绑定 |
| on | 编辑组件触发事件回调 | array[function] | — | 需要注意this的指向问题，会覆盖event定义事件，不建议使用，如果需要监听编辑组件的修改可使用table中的change事件，判断参数中的prop, index即可判断出具体改变 |
| 其他 | 其他属性会自动映射到组件的属性上 | — | — | — |
