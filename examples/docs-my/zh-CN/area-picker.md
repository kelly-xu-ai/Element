## AreaPicker 地区选择器

用于地区选择。

### 基础用法

:::demo `v-model`的值为当前被选中的地址的`code`。

```html
<el-area-picker v-model="area" @tab="tabHandle" @change="changeHandle" placeholder="请选择地址"></el-area-picker>

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

### 可清空

:::demo 包含清空按钮，可将选择器清空为初始状态。

```html
<el-area-picker v-model="area" clearable placeholder="请选择地址"></el-area-picker>

<script>
  export default {
    data() {
      return {
        area: ''
      };
    }
  }
</script>
```
:::

### 地域级别

:::demo 地域级别：province、city、district，通过设置level属性来配置它们。

```html
<el-area-picker v-model="province" level="province" placeholder="请选择地址"></el-area-picker>
<el-area-picker v-model="city" level="city" placeholder="请选择地址"></el-area-picker>
<el-area-picker v-model="district" level="district" placeholder="请选择地址"></el-area-picker>

<script>
  export default {
    data() {
      return {
        province: '',
        city: '',
        district: ''
      };
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
| clearable | 可清空 | boolean | — | false |
| level | 地域级别 | string | province/city/district | district |
| referenceClass | input框class | string/object/array | — | [] |
| referenceStyle | input框style | string/object | — | {} |
|  placement        |  出现位置  | string | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  bottom-start |
| 其他 | 参照el-input | — | — | — |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 选中code值改变时触发 | code, { level, province, city, district } |
| tab | 选中标签时触发 | code, { level, province, city, district } |
| focus | 选择器聚焦时触发 | event |
| blur | 选择器失焦时触发 | event |
| clear | 点击清空时触发 | — |
