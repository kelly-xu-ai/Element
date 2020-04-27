<template>
  <el-table
    class="el-extend-table"
    ref="table"
    v-bind="$attrs"
    v-on="$listeners"
    :data="data"
    style="width: 100%">
    <el-table-column
      v-for="(item, columnIndex) in column"
      v-bind="copyBinds(item)"
      :key="columnIndex"
      :label="item.label"
      :prop="item.prop"
      :rules="item.rules">
      <template
        slot-scope="{ row, $index, state, message }">
        <component
          v-if="editRows.includes(row) && getEditable(item, row, $index)"
          :is="getComponent(item.editor, { row, $index, state, message })"
          :value="row[item.prop]"
          :row="row"
          :column="item"
          :index="$index"
          :state="state"
          :message="message"
          v-bind="getComponentBind(item.editor, { row, $index, state, message })"
          v-on="getModelEvent({item, row, index: $index, value: row[item.prop], state, message})"/>
        <RowCell
          v-else-if="item.render"
          :render="item.render"
          :value="row[item.prop]"
          :index="$index"
          :row="row"
          :state="state"
          :message="message"/>
        <slot
          v-else-if="item.slot"
          :name="item.slot"
          :value="row[item.prop]"
          :index="$index"
          :row="row"
          :state="state"
          :message="message"/>
        <span v-else>
          {{
            item.format
              ? item.format({index: $index, value: row[item.prop], row, state, message})
              : row[item.prop] === undefined ? '' : row[item.prop]
          }}
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
import ElTable from './table/index'
import ElTableColumn from './table/src/table-column'
function isEditable(item, row, index) {
  if (!item.editor) return false
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
function getEvent(editor) {
  if (editor && typeof editor === 'object' && editor.event) {
    return editor.event
  }
  return 'input'
}
function getOns(editor, params) {
  if (editor && editor.on && typeof editor.on === 'object') {
    const copy = {}
    Object.keys(editor.on).forEach(key => {
      copy[key] = function(...$event) {
        editor.on[key](params, ...$event)
      }
    })
    return copy
  }
  return {}
}
export default {
  name: 'ElExtendTable',
  components: {
    RowCell,
    ElTable,
    ElTableColumn
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
    clearRowValidate(index, props) {
      this.$refs.table.clearRowValidate(index, props)
    },
    clearValidate(props) {
      this.$refs.table.clearValidate(props)
    },
    validate(callback) {
      this.$refs.table.validate(callback)
    },
    validateRow(index, callback) {
      this.$refs.table.validateRow(index, callback)
    },
    validateCell(index, props, callback) {
      this.$refs.table.validateCell(index, props, callback)
    },
    getEditable(item, row, index) {
      return this.editable && isEditable(item, row, index)
    },
    copyBinds(bind) {
      const copy = {}
      Object.keys(bind).forEach(key => {
        if (!['prop', 'label', 'render', 'slot', 'format', 'editor', 'editable', 'rules'].includes(key)) {
          copy[key] = bind[key]
        }
      })
      return copy
    },
    getComponent(editor = 'el-input', { row, $index: index, state, message }) {
      if (typeof editor === 'string') {
        return editor
      } else if (editor && typeof editor === 'object') {
        return editor.component || 'el-input'
      } else if (editor && typeof editor === 'function') {
        return this.getComponent(editor({ row, index, state, message }), { row, $index: index, state, message })
      }
      return 'el-input'
    },
    getComponentBind(editor, { row, $index: index, state, message }) {
      if (typeof editor === 'function') {
        editor = editor({ row, index, state, message })
      }
      if (editor && typeof editor === 'object') {
        const copy = {}
        Object.keys(editor).forEach(key => {
          if (!['component', 'event', 'on', 'row', 'column', 'index', 'state', 'message'].includes(key)) {
            copy[key] = editor[key]
          }
        })
        return copy
      }
      return {}
    },
    getRules(rules = []) {
      return rules.filter(rule => {
        return rule.trigger && typeof rule.trigger === 'string'
      })
    },
    getValidateEvents({ item, row, index, value}) {
      const rules = this.getRules(item.rules)
      const events = {}
      rules.forEach(rule => {
        events[rule.trigger] = () => {
          this.validateCell(index, [item.prop], () => {})
        }
      })
      return events
    },
    getModelEvent({ item, row, index, value, state, message }) {
      const event = getEvent(item.editor)
      const changeEvent = {
        [event]: $value => {
          row[item.prop] = $value
          this.$emit('change', {row, prop: item.prop, index, value: $value, oldValue: value, state, message})
        }
      }
      const ons = getOns(item.editor, {row, prop: item.prop, index, oldValue: value})
      const validateEvents = this.getValidateEvents({ item, row, index, value})
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
