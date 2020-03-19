<script>
  import bus from '../../bus';
  import { tintColor } from '../../color.js';
  import { ACTION_USER_CONFIG_UPDATE } from '../../components/theme/constant.js';
  const varMap = {
    'primary': '$--color-primary',
    'success': '$--color-success',
    'warning': '$--color-warning',
    'danger': '$--color-danger',
    'info': '$--color-info',
    'white': '$--color-white',
    'black': '$--color-black',
    'textPrimary': '$--color-text-primary',
    'textRegular': '$--color-text-regular',
    'textSecondary': '$--color-text-secondary',
    'textPlaceholder': '$--color-text-placeholder',
    'borderBase': '$--border-color-base',
    'borderLight': '$--border-color-light',
    'borderLighter': '$--border-color-lighter',
    'borderExtraLight': '$--border-color-extra-light'
  };
  const original = {
    primary: '#038EE3',
    success: '#56964F',
    warning: '#E89E25',
    danger: '#DE0010',
    info: '#909399',
    white: '#FFFFFF',
    black: '#000000',
    textPrimary: '#303133',
    textRegular: '#606266',
    textSecondary: '#909399',
    textPlaceholder: '#C0C4CC',
    borderBase: '#DCDFE6',
    borderLight: '#E4E7ED',
    borderLighter: '#EBEEF5',
    borderExtraLight: '#F2F6FC'
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
        primary: '',
        success: '',
        warning: '',
        danger: '',
        info: '',
        white: '',
        black: '',
        textPrimary: '',
        textRegular: '',
        textSecondary: '',
        textPlaceholder: '',
        borderBase: '',
        borderLight: '',
        borderLighter: '',
        borderExtraLight: ''
      }
    },
    watch: {
      global: {
        immediate: true,
        handler(value) {
          Object.keys(original).forEach((o) => {
            if (value[varMap[o]]) {
              this[o] = value[varMap[o]]
            } else {
              this[o] = original[o]
            }
          });
        }
      }
    },
  }
</script>

## Color 色彩

为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。

### 主色

智互联主要品牌颜色是值得信赖和成熟稳重的科技蓝色。

<el-row :gutter="12">
 <el-col :span="12" :xs="{span: 12}">
    <div class="demo-color-box"
    style="background: #002237"
    >Primary<div class="value">#002237</div>
      <div 
        class="bg-color-sub"
      >
        <div class="bg-custom-sub-item" 
        style="background: #001521">
        <div class="value">#001521</div>
        </div>
        <div class="bg-custom-sub-item" 
        style="background: #025B90">
        <div class="value">#025B90</div>
        </div>
        <div class="bg-custom-sub-item" 
        style="background: #0176BA">
        <div class="value">#0176BA</div>
        </div>
      </div>
    </div>
  </el-col>
  <el-col :span="12" :xs="{span: 12}">
    <div class="demo-color-box" :style="{ background: primary }">Brand Color
      <div class="value">#038EE3</div>
     <div 
        class="bg-color-sub"
      >
        <div class="bg-custom-sub-item" 
        style="background: #0171b6">
        <div class="value">#0171b6</div>
        </div>
        <div class="bg-custom-sub-item" 
        style="background: #43B7FF">
        <div class="value">#43B7FF</div>
        </div>
        <div class="bg-custom-sub-item" 
        style="background: #d5edfc">
        <div class="value" style="color: #43B7FF">#d5edfc</div>
        </div>
      </div>
    </div>
  </el-col>
</el-row>

### 辅助色

除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。

<el-row :gutter="12">
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: success }"
    >Success<div class="value">#56964F</div>
      <div 
        class="bg-color-sub"
      >
        <div class="bg-custom-sub-item" 
        style="background: #46BD39;width: 50%;">
        <div class="value">#46BD39</div>
        </div>
         <div class="bg-custom-sub-item" 
        style="background: #92D051;width: 50%;">
        <div class="value">#92D051</div>
        </div>
      </div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: warning }"
    >Warning<div class="value">#E89E25</div>
      <div 
          class="bg-color-sub"
        >
       <div class="bg-custom-sub-item" 
        style="background: #FFB02F;width: 100%;">
        <div class="value">#FFB02F</div>
        </div>
      </div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: danger }"
    >Danger<div class="value">#DE0010</div>
      <div 
          class="bg-color-sub"
        >
       <div class="bg-custom-sub-item" 
        style="background: #BA0210;width: 100%;">
        <div class="value">#BA0210</div>
        </div>
      </div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    :style="{ background: info }"
    >Info<div class="value">#909399</div>
      <div 
          class="bg-color-sub"
        >
        <div 
          class="bg-success-sub-item" 
          v-for="(item, key) in Array(2)"
          :key="key"
          :style="{ background: tintColor(info, (key + 8) / 10) }"
            >
        </div>
      </div>
    </div>
  </el-col>
</el-row>

<el-row :gutter="12">
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    style="background: #00aca7"
    >Custom<div class="value">#00aca7</div>
      <div 
        class="bg-color-sub"
      >
        <div class="bg-custom-sub-item" 
          style="background: #0bd4d3;width: 100%;">
          <div class="value">#0bd4d3</div>
          </div>
        </div>
      </div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    style="background: #975FE4"
    >Custom<div class="value">#975FE4</div>
      <div 
          class="bg-color-sub"
        >
        <div class="bg-custom-sub-item" 
          style="background: #D2B5FA;width: 100%;">
          <div class="value">#D2B5FA</div>
          </div>
        </div>
      </div>
    </div>
  </el-col>
   <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    style="background: #BAD87D"
    >Custom<div class="value">#BAD87D</div>
      <div 
          class="bg-color-sub"
        >
         <div class="bg-custom-sub-item" 
          style="background: #BAD87D;width: 100%;">
          </div>
        </div>
      </div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box"
    style="background: #0280FF"
    >Custom<div class="value">#0280FF</div>
      <div 
          class="bg-color-sub"
        >
         <div class="bg-custom-sub-item" 
          style="background: #0280FF;width: 100%;">
          </div>
        </div>
      </div>
    </div>
  </el-col>
</el-row>

### 中性色

中性色用于文本、背景和边框颜色。通过运用不同的中性色，来表现层次结构。

<el-row :gutter="12">
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textPrimary }"
      >主要文字<div class="value">{{textPrimary}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textRegular }"
      >
      常规文字<div class="value">{{textRegular}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textSecondary }"
      >次要文字<div class="value">{{textSecondary}}</div></div>
      <div class="demo-color-box demo-color-box-other"
      :style="{ background: textPlaceholder }"
      >占位文字<div class="value">{{textPlaceholder}}</div></div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: borderBase }"
      >一级边框<div class="value">{{borderBase}}</div></div>
      <div class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: borderLight }"
      >二级边框<div class="value">{{borderLight}}</div></div>
      <div class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: borderLighter }"
      >三级边框<div class="value">{{borderLighter}}</div></div>
      <div class="demo-color-box demo-color-box-other demo-color-box-lite"
      :style="{ background: borderExtraLight }"
      >四级边框<div class="value">{{borderExtraLight}}</div></div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div 
      class="demo-color-box demo-color-box-other"
      :style="{ background: black }"
      >基础黑色<div class="value">{{black}}</div></div>
      <div
      class="demo-color-box demo-color-box-other"
      :style="{ background: white, color: '#303133', border: '1px solid #eee' }"
      >基础白色<div class="value">{{white}}</div></div>
      <div class="demo-color-box demo-color-box-other bg-transparent">透明<div class="value">Transparent</div>
      </div>
    </div>
  </el-col>
</el-row>
