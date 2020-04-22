<template>
  <div style="margin: 20px;">
    <el-edit-table @change="changeHandle" :data="tableData" :column="column">
      <template slot="remark" slot-scope="{ value, row, index }">
        <span style="color: red">索引: {{index}}</span>
        <span style="color: green">值：{{value}}</span>
        <span style="color: yellow">行: {{row}}</span>
      </template>
    </el-edit-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            name: '1',
            age: 10,
            remark: '112313'
          },
          {
            name: '2',
            age: 13,
            remark: '112313'
          },
          {
            name: '6',
            age: 18,
            remark: '112313'
          }
        ],
        column: [
          {
            label: '姓名',
            prop: 'name',
          },
          {
            label: '年龄',
            prop: 'age',
            render(h, { value }) {
              return h('span', `${value}岁`)
            }
          },
          {
            label: '备注',
            prop: 'remark',
            slot: 'remark'
          }
        ]
      };
    },
    methods: {
      changeHandle(e) {
        console.log(e)
      }
    }
  };
</script>
