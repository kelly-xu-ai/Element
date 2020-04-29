<template>
  <div style="margin: 20px;">
    <el-extend-table v-model="tableData" :column.sync="column">
      <template slot="remark" slot-scope="{ value, state, message }">
        <span style="color: red">备注：{{value}} {{state}} {{message}}</span>
      </template>
    </el-extend-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            no: 1,
            name: 'name',
            remark: '444444444'
          },
          {
            no: 2,
            name: 'name2',
            remark: '2222222'
          }
        ],
        column: [
          {
            label: 'no',
            prop: 'no',
            fixed: 'left'
          },
          {
            label: 'name',
            prop: 'name',
            component: 'el-input',
            rules: [
              { required: true, message: '请输入活动名称name', trigger: 'blur' }
            ]
          },
          {
            label: '备注',
            prop: 'remark',
            slot: 'remark',
            component: 'el-input',
            rules: [
              { required: true, message: '请输入备注remark', trigger: 'blur' }
            ]
          }
        ]
      };
    }
  };
</script>
