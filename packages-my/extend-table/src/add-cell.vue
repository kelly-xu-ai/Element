<template>
  <div class="el-extend-table--add-cell">
    <span class="el-extend-table--add-cell-index">
      {{(currentPage - 1) * pageSizes + (index + 1)}}
    </span>
    <div class="el-extend-table--add-cell-box">
      <i @click.stop="$emit('remove-row', index)" class="el-icon-remove el-extend-table--add-cell-remove"></i>
      <i @click.stop="$emit('add-row', index)" class="el-icon-circle-plus el-extend-table--add-cell-plus"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {},
    row: {},
    pageInfo: {},
    defaultCell: {
      type: null,
      default: () => ({})
    }
  },
  computed: {
    currentPage() {
      return this.pageInfo.currentPage || 0
    },
    pageSizes() {
      return this.pageInfo.pageSizes || 0
    }
  }
}
</script>
