<template>
  <div style="margin: 20px;">
    <!-- <el-extend-base-table
      class="el-extend-table"
      column-draggable
      border
      :data="data"
      :column="dcc"
      @change-column-list="changeColumnList">
      <el-table-column :no-drag="true" fixed="left" type="selection" width="55" />
      <el-table-column
        v-for="(item, columnIndex) in column"
        :key="columnIndex"
        v-bind="copyBinds(item)"
        :label="item.label"
      >
        <template slot-scope="{ row, $index }">
          <template>
            <span :key="item.prop">
              {{ item.format ? item.format({ index: $index, value: row[item.prop], row }) : row[item.prop] === undefined ? '' : row[item.prop] }}
            </span>
          </template>
        </template>
      </el-table-column>
    </el-extend-base-table> -->
    <!-- <el-popover
      placement="top-start"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <span slot="reference" class="advanced-search-shaixuan">
        <span>高级搜索</span>
      </span>
    </el-popover> -->

    <el-dropdown :tabindex="-1">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
        column: Object.freeze(column)
      }
    },
    computed: {
      dcc() {
        return [ { type: 'selection', fixed: 'left', noDrag: true }, ...this.column]
        // return this.column
      }
    },
    methods: {
      changeColumnList(column) {
        this.column = column.filter(item => item.type !== 'selection')
      },
      copyBinds(bind) {
        const copy = {}
        Object.keys(bind).forEach(key => {
          if (!['prop', 'label', 'render', 'slot', 'format', 'editor', 'editable', 'rules'].includes(key)) {
            copy[key] = bind[key]
          }
        })
        return copy
      }
    }
  };
</script>
