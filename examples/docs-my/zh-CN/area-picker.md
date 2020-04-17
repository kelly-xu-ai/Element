## AreaPicker 地区选择器

用于地区选择。

### 基础用法

:::demo `v-model`的值为当前被选中的地址的`code`。

```html
<el-area-picker v-model="area" @tab="tabHandle" @change="changeHandle" placeholder="请选择地址"></el-area-picker>{{area}}

<script>
  export default {
    data() {
      return {
        area: ''
      };
    },
    methods: {
      changeHandle(code, { level, province, city, district }) {
        console.log('change:', code, level, province, city, district)
      },
      tabHandle(code, { level, province, city, district }) {
        console.log('tab:', code, level, province, city, district)
      }
    }
  }
</script>
```
:::

### 禁用状态

:::demo 为`el-area-picker`设置`disabled`属性，则整个选择器不可用。

```html
<el-area-picker :value="area" disabled placeholder="请选择地址"></el-area-picker>
<el-button @click="changeArea">修改地址</el-button>

<script>
  export default {
    data() {
      return {
        area: '320115'
      };
    },
    methods: {
      changeArea() {
        this.area = this.area === '320114' ? '320115' : '320114';
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 绑定值 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 选中code值改变时触发 | code, { level, province, city, district } |
| tab | 选中标签时触发 | code, { level, province, city, district } |
