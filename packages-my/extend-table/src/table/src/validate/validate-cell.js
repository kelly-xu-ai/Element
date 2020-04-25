import emitter from 'element-ui/src/mixins/emitter';
import objectAssign from 'element-ui/src/utils/merge';
import { noop, getPropByPath } from 'element-ui/src/utils/util';
import AsyncValidator from 'async-validator';

export default {
  // 此处另外一个思路是伪造el-form-item，使用componentName: 'ElFormItem'来截取验证事件。
  // 但是合成事件的解决方案在此处更优。
  name: 'ElValidateCell',
  mixins: [emitter],
  inject: ['elValidate'],
  props: {
    data: {},
    rules: {
      type: [Object, Array],
      default: () => []
    },
    prop: String
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false
    }
  },
  computed: {
    fieldValue() {
      const model = this.data.row;
      if (!model || !this.prop) { return; }

      let path = this.prop;
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }

      return getPropByPath(model, path, true).v;
    }
  },
  methods: {
    clearValidate() {
      this.validateState = '';
      this.validateMessage = '';
      this.validateDisabled = false;
    },
    getRules() {
      return Array.isArray(this.rules) ? this.rules : [this.rules]
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();

      return rules.filter(rule => {
        if (!rule.trigger || trigger === '') return true;
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1;
        } else {
          return rule.trigger === trigger;
        }
      }).map(rule => objectAssign({}, rule));
    },
    validate(trigger, callback = noop) {
      this.validateDisabled = false;
      const rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        callback();
        return true;
      }

      this.validateState = 'validating';

      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger;
        });
      }
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      const model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';

        callback(this.validateMessage, invalidFields);
        this.elValidate && this.elValidate.$emit('validate', this.prop, !errors, this.validateMessage || null);
      });
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('ElValidate', 'el.validate.addField', [this]);

      let initialValue = this.fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      });
    }
  },
  beforeDestroy() {
    this.dispatch('ElValidate', 'el.validate.removeField', [this]);
  },
  render() {
    // 伪造el-form-item的class，显示出样式
    return (
      <div
        class={[
          'el-form-item',
          {
            'is-error': this.validateState === 'error',
            'is-validating': this.validateState === 'validating',
            'is-success': this.validateState === 'success'
          }
        ]}>
        {
          this.$scopedSlots.default({
            ...this.data,
            state: this.validateState,
            message: this.validateMessage
          })
        }
      </div>
    )
  }
}
