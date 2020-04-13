<script>
  import bus from '../../bus';
  import { ACTION_USER_CONFIG_UPDATE } from '../../components/theme/constant.js';
  const varMap = [
    '$--font-size-extra-large',
    '$--font-size-large',
    '$--font-size-medium',
    '$--font-size-base',
    '$--font-size-small',
    '$--font-size-extra-small'
  ];
  const original = {
    'font_size_extra_large': '20px',
    'font_size_large': '18px',
    'font_size_medium': '16px',
    'font_size_base': '14px',
    'font_size_small': '13px',
    'font_size_extra_small': '12px'
  }
  export default {
    created() {
      bus.$on(ACTION_USER_CONFIG_UPDATE, this.setGlobal);
    },
    mounted() {
      this.setGlobal();
    },
    methods: {
      tintColor(color, tint) {
        return tintColor(color, tint);
      },
      setGlobal() {
        if (window.userThemeConfig) {
          this.global = window.userThemeConfig.global;
        }
      }
    },
    data() {
      return {
        global: {},
        'font_size_extra_large': '',
        'font_size_large': '',
        'font_size_medium': '',
        'font_size_base': '',
        'font_size_small': '',
        'font_size_extra_small': ''
      }
    },
    watch: {
      global: {
        immediate: true,
        handler(value) {
          varMap.forEach((v) => {
            const key = v.replace('$--', '').replace(/-/g, '_')
            if (value[v]) {
              this[key] = value[v]
            } else {
              this[key] = original[key]
            }
          });
        }
      }
    },
  }
</script>

## Typography 字体

我们对字体进行统一规范，力求在各个操作系统下都有最佳展示效果。<font color="#038EE3">注:高保真设计稿只会以某一种系统默认字体来设计，但设计人员会标明不同系统所用到的字体顺序。</font>

### 常用字体

```css
font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
  "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
```

```css
现6.0所用字体: Helvetica Neue, Helvetica, PingFang SC, "微软雅黑", Tahoma,
  Arial, sans-serif;
```

### 字号

需系统默认字体有所不同,但字号大小大相径庭,因此以下统一标注字号.

<table class="demo-typo-size">
  <tbody>
  <tr
    >
      <td>样式</td>
      <td>字号</td>
      <td class="color-dark-light">使用场景</td>
  </tr>
  <tr
    :style="{ fontSize: font_size_extra_large }"
    >
      <td>标准字样式</td>
      <td class="color-dark-light">{{font_size_extra_large}} Extra large</td>
      <td class="demo-typo-desc">标题文字</td>
    </tr>
 <tr
    :style="{ fontSize: font_size_large }"
    >
      <td>标准字样式</td>
      <td class="color-dark-light">{{font_size_large}} large</td>
      <td class="demo-typo-desc">用于LOGO标题，大标题，其它页面标题，图表、筛选条件内小标题文字</td>
    </tr>
 <tr
    :style="{ fontSize: font_size_medium }"
    >
      <td>标准字样式</td>
      <td class="color-dark-light">{{font_size_medium}} Medium 正常/加粗</td>
      <td class="demo-typo-desc">用于重点标题，特殊按钮、重点字提示</td>
    </tr>
<tr
    style="fontSize: 15px"
    >
    <td>标准字样式</td>
    <td class="color-dark-light">15px Medium 正常/加粗</td>
    <td class="demo-typo-desc">用于重点标题，特殊按钮、重点字提示</td>
</tr>
 <tr
    :style="{ fontSize: font_size_base }"
    >
      <td>标准字样式</td>
      <td class="color-dark-light">{{font_size_base}} Base 正常/加粗</td>
      <td class="demo-typo-desc">用于列表标题，正文文体</td>
    </tr>
  <tr
    :style="{ fontSize: font_size_small }"
    >
      <td>标准字样式</td>
      <td class="color-dark-light">{{font_size_small}} Small 正常/加粗</td>
      <td class="demo-typo-desc">重要字体、按钮、适用于大部分正文文字</td>
    </tr>
    <tr
    :style="{ fontSize: font_size_extra_small }"
    >
      <td>标准字样式</td>
      <td class="color-dark-light">{{font_size_extra_small}} Extra Small 正常/加粗</td>
      <td class="demo-typo-desc">适用于大部分正文字体及提示文字，不是太重要的文字</td>
    </tr>
  </tbody>
</table>
