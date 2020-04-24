<template>
  <el-table
    v-bind="$attrs"
    v-on="$listeners"
    :data="data"
    style="width: 100%">
    <el-table-column
      v-for="(item, columnIndex) in column"
      v-bind="copyBinds(item)"
      :key="columnIndex"
      :label="item.label">
      <template
        slot-scope="{ row, $index }">
        <component
          v-if="editRows.includes(row) && getEditable(item, row, $index)"
          :is="getComponent(item.component)"
          :value="row[item.prop]"
          :row="row"
          :column="item"
          :index="$index"
          v-bind="getComponentBind(item.component)"
          v-on="getModelEvent({item, row, index: $index, value: row[item.prop]})"/>
        <RowCell
          v-else-if="item.render"
          :render="item.render"
          :value="row[item.prop]"
          :index="$index"
          :row="row"/>
        <slot
          v-else-if="item.slot"
          :name="item.slot"
          :value="row[item.prop]"
          :index="$index"
          :row="row"/>
        <span
          v-else
          style="margin-left: 10px">
          {{ item.format ? item.format({index: $index, value: row[item.prop], row}) : row[item.prop] || '' }}
        </span>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="{ row, $index }">
        <slot
          name="eidt"
          :index="$index"
          :row="row"
          :is-edit="editRows.includes(row)">
          <el-button
            v-if="!editRows.includes(row)"
            size="mini"
            @click="editStart($index)">编辑</el-button>
          <el-button
            v-else
            size="mini"
            @click="editEnd($index)">完成</el-button>
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import RowCell from './row-cell'
function isEditable(item, row, index) {
  if (!item.component) return false
  const { editable = true } = item
  if (typeof editable === 'boolean') return editable
  if (typeof editable === 'function') return editable({ row, index })
  return false
}
function mergeEvents(...rest) {
  const a = rest[0]
  const b = rest[1]
  rest.splice(0, 2)
  if (!(a && b)) {
    return a || {}
  } else {
    const copy = {}
    Object.keys(a).forEach(key => {
      if (key in b) {
        const eventA = Array.isArray(a[key]) ? a[key] : [a[key]]
        const eventB = Array.isArray(b[key]) ? b[key] : [b[key]]
        copy[key] = [...eventA, ...eventB]
      } else {
        copy[key] = a[key]
      }
    })
    Object.keys(b).forEach(key => {
      if (!(key in copy)) {
        copy[key] = b[key]
      }
    })
    if (rest.length) {
      return mergeEvents(copy, ...rest)
    }
    return copy
  }
}
function getEvent(component) {
  if (component && typeof component === 'object' && component.event) {
    return component.event
  }
  return 'input'
}
function getOns(component, params) {
  if (component && component.on && typeof component.on === 'object') {
    const copy = {}
    Object.keys(component.on).forEach(key => {
      copy[key] = function(...$event) {
        component.on[key](params, ...$event)
      }
    })
    return copy
  }
  return {}
}
export default {
  name: 'ElEditTable',
  components: {
    RowCell
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    column: {
      type: Array,
      default: () => []
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      editRows: []
    }
  },
  methods: {
    getEditable(item, row, index) {
      return this.editable && isEditable(item, row, index)
    },
    copyBinds(bind) {
      const copy = {}
      Object.keys(bind).forEach(key => {
        if (!['prop', 'label', 'render', 'slot', 'format', 'component', 'editable', 'rules'].includes(key)) {
          copy[key] = bind[key]
        }
      })
      return copy
    },
    getComponent(component = 'el-input') {
      if (typeof component === 'string') {
        return component
      } else if (component && typeof component === 'object') {
        return component.name || 'el-input'
      }
      return 'el-input'
    },
    getComponentBind(component) {
      if (component && typeof component === 'object') {
        const copy = {}
        Object.keys(component).forEach(key => {
          if (!['event', 'on', 'row', 'column', 'index'].includes(key)) {
            copy[key] = component[key]
          }
        })
        return copy
      }
      return {}
    },
    getValidateEvents() {
      return {}
    },
    getModelEvent({ item, row, index, value}) {
      const event = getEvent(item.component)
      const changeEvent = {
        [event]: $value => {
          row[item.prop] = $value
          this.$emit('change', {row, prop: item.prop, index, value: $value, oldValue: value})
        }
      }
      const ons = getOns(item.component, {row, prop: item.prop, index, oldValue: value})
      const validateEvents = this.getValidateEvents(item.rules)
      return mergeEvents(changeEvent, ons, validateEvents)
    },
    editStart(index) {
      const row = this.data[index]
      if (row && !this.editRows.includes(row)) {
        this.editRows.push(row)
      }
    },
    editEnd(index) {
      const row = this.data[index]
      this.editRows.splice(this.editRows.indexOf(row), 1)
    }
  }
}
</script>
