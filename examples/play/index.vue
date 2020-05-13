<template>
  <div style="margin: 20px;">
    <el-extend-table :data="data" :column="column" :affix="affix" />
    <div style="height: 200vh;"></div>
  </div>
</template>

<script>
  const tableData = [
    { no: 1, name: 'test', remark: ';ll;kljjkahsdka' },
    { no: 1, name: 'test', remark: ';ll;kljjkahsdka' },
    { no: 1, name: 'test', remark: ';ll;kljjkahsdka' },
    { no: 1, name: 'test', remark: ';ll;kljjkahsdka' }
  ]
  const column = [
    { prop: 'no', label: 'no' },
    { prop: 'name', label: 'name' },
    { prop: 'remark', label: 'remark' },
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
