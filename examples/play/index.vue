<template>
  <div style="margin: 20px;">
    <el-extend-table :data="tableData" :column="column" trigger="hover" :scrollbar="false">
      <template slot="remark" slot-scope="{ value }">
        <span style="color: red">备注：{{value}}</span>
      </template>
    </el-extend-table>
    <el-select v-model="value" clearable @input="inputHandle" placeholder="请选择">
      <el-option label="1111111" value="1"></el-option>
      <el-option label="2222222" value="2"></el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    methods: {
      inputHandle(value, label) {
        console.log(value, label)
      }
    },
    data() {
      return {
        value: '1',
        tableData: [
          {
            name: '',
            method: 1,
            cost: 1000
          },
          {
            name: '',
            method: 2,
            cost: 1000
          },
          {
            name: '',
            method: 3,
            cost: 10000
          }
        ],
        column: [
          {
            label: '用户',
            prop: 'name',
            editor: {
              component: 'el-date-picker',
              appendToBody: false
            }
          },
          {
            label: '付费方式',
            prop: 'method',
            format({ value }) {
              return ['', '按量付费', '按月付费', '按年付费'][value] || ''
            },
            editor: {
              component: {
                props: ['value', 'row'],
                render(h) {
                  return h(
                    'el-select',
                    {
                      props: {
                        value: this.value
                      },
                      on: {
                        input: value => {
                          this.row.cost = [0, 0, 1000, 10000][value]
                          this.$emit('input', value)
                        }
                      }
                    },
                    [
                      h('el-option', {props: {label: '按量付费', value: 1}}),
                      h('el-option', {props: {label: '按月付费', value: 2}}),
                      h('el-option', {props: {label: '按年付费', value: 3}})
                    ]
                  )
                }
              },
              placeholder: '请选择付费方式'
            }
          },
          {
            label: '付费金额',
            prop: 'cost',
            format({ row, value }) {
              if (row.method === 2) {
                return `${value}$/月`
              } else if (row.method === 3) {
                return `${value}$/年`
              } else {
                return `${value}$`
              }
            },
            editor({ row }) {
              if (row.method === 1) {
                return 'el-input-number'
              } else {
                return {
                  component: {
                    props: ['value', 'row'],
                    render(h) {
                      const opMap = [
                        [], [],
                        [['1000/月', 1000], ['2000/月', 2000], ['3000/月', 3000]],
                        [['10000/年', 10000], ['20000/年', 20000], ['30000/年', 30000]]
                      ]
                      const option = opMap[this.row.method]
                      return h(
                        'el-select',
                        {
                          props: {
                            value: this.value
                          },
                          on: {
                            input: value => { this.$emit('input', value) }
                          }
                        },
                        option.map(i => {
                          return h('el-option', {props: {label: i[0], value: i[1]}})
                        })
                      )
                    }
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
