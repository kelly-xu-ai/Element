<template>
  <div style="margin: 20px;">
    <el-extend-table :data="data" :column="column" :affix="affix" />
    <div style="height: 200vh;"></div>
  </div>
</template>

<script>
  const tableData = [
    { no: 1, name: 'test', remark: ';ll;kljjkahsdkafsdaffsdaf' },
    { no: 1, name: 'test', remark: ';ll;kljjkahsdsdafsdafkfsadfsaa' },
    { no: 1, name: 'test', remark: ';ll;kljjkahsadfsdafadsfsadfsdka' },
    { no: 1, name: 'test', remark: ';ll;kljjkahssdfsdafsadfdka' }
  ]
  const column = [
    { prop: 'no', label: 'no' },
    { prop: 'name', label: 'name' },
    { prop: 'remark', label: 'remark', width: 100, 'show-overflow-tooltip': true },
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
