<template>
  <div style="margin: 20px;">
    <el-extend-table style="width: 500px;" size="small" checkable :data="data" :height="200" :column="column" :affix="affix" />
  </div>
</template>

<script>
  const tableData = [
    { no: 1, name: 'test', remark: ';ll;kljjkahsdkafsdaffsdaf' },
    { no: 1, name: 'test', remark: ';ll;kljjkahsdsdafsdafkfsadfsaa' },
    { no: 1, name: 'test', remark: ';ll;kljjkahsadfsdafadsfsadfsdka' },
    { no: 1, name: 'test', remark: ';ll;kljjkahssdfsdafsadfdka' },
    { no: 1, name: 'test', remark: ';ll;kljjkahssdfsdafsadfdka' },
    { no: 1, name: 'test', remark: ';ll;kljjkahssdfsdafsadfdka' }
  ]
  const column = [
    { prop: 'no', label: 'no', width: 100 },
    { prop: 'name', label: 'name', width: 300 },
    { prop: 'remark', label: 'remark', width: 300, 'show-overflow-tooltip': true },
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
