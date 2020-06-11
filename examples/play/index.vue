<template>
  <div style="margin: 20px;">
    <el-extend-table column-draggable border :data="data" :column.sync="column">
    </el-extend-table>
  </div>
</template>

<script>
  const tableData = Array.from({ length: 5 }).map((i, index) => {
    return {
      t1: 't1' + (index + 1),
      t2: 't2' + (index + 1),
      t3: 't3' + (index + 1),
      t4: 't4' + (index + 1),
      t5: 't5' + (index + 1),
      t6: 't6' + (index + 1),
      t7: 't7' + (index + 1)
    }
  })
  const column = [
    {
      prop: 't1',
      label: 't1',
      minWidth: 130,
      fixed: 'left'
    },
    {
      prop: 't2',
      label: 't2',
      minWidth: 130,
      fixed: 'left'
    },
    {
      prop: 't3',
      label: 't3',
      minWidth: 130
    },
    {
      prop: 't4',
      label: 't4',
      minWidth: 130
    },
    {
      prop: 't5',
      label: 't5',
      minWidth: 130
    },
    {
      prop: 't6',
      label: 't6',
      minWidth: 130,
      fixed: 'right'
    },
    {
      prop: 't7',
      label: 't7',
      minWidth: 130,
      fixed: 'right'
    },
  ]
  export default {
    data() {
      return {
        data: tableData,
        column: column
      }
    },
    computed: {
      affix() {
        return {
          target: window
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
.el-extand-table {
  .sortabled-chosen {
    display: none;
  }
}
</style>