<template>
  <el-popover ref="popover" :disabled="disabled" :placement="placement">
    <div :title="labelValue" class="el-area-picker" slot="reference">
      <el-input
        v-model="labelValue"
        v-bind="$attrs"
        :disabled="disabled"
        readonly
        @focus="handleFocus"
        @blur="handleBlur"
        @mouseenter.native="inputHovering = true"
        @mouseleave.native="inputHovering = false">
        <template slot="suffix">
          <i v-show="!showClose" :class="['el-area-picker__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
          <i v-if="showClose" class="el-area-picker__caret el-input__icon el-icon-circle-close" @click="handleClearClick"></i>
        </template>
      </el-input>
    </div>
    <div>
      <el-tabs
        v-model="areaLevel"
        :before-leave="beforeLeave">
        <el-tab-pane label="省份" name="province">
          <div class="el-area-picker-province">
            <div
              class="el-area-picker-province-type"
              v-for="(type, index) in ['A-G', 'H-K', 'L-S', 'T-Z']"
              :key="type">
              <div class="el-area-picker-province-title">{{type}}</div>
              <div class="el-area-picker-province-content">
                <div
                  class="el-area-picker-province-cell"
                  v-for="item in provinceData[index]"
                  :key="item.code">
                  <el-tag
                    style="cursor: pointer;border: none;line-height: 24px;"
                    size="small"
                    :effect="province.code === item.code ? 'dark' : 'plain'"
                    :type="province.code === item.code ? '' : 'info'"
                    :title="item.name"
                    @click="chooseProvince(item)">
                    {{ item.name }}
                  </el-tag>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="城市" name="city" v-if="showCity">
          <div class="el-area-picker-city">
            <div
              class="el-area-picker-cell"
              v-for="item in cityData"
              :key="item.code">
              <el-tag
                style="cursor: pointer;border: none;line-height: 24px;"
                size="small"
                :effect="city.code === item.code ? 'dark' : 'plain'"
                :type="city.code === item.code ? '' : 'info'"
                :title="item.name"
                @click="chooseCity(item)">
                {{ item.name }}
              </el-tag>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="区/县" name="district" v-if="showDistrict">
          <div class="el-area-picker-district">
            <div
              class="el-area-picker-cell"
              v-for="item in districtData"
              :key="item.code">
              <el-tag
                style="cursor: pointer;border: none;line-height: 24px;"
                size="small"
                :effect="district.code === item.code ? 'dark' : 'plain'"
                :type="district.code === item.code ? '' : 'info'"
                :title="item.name"
                @click="chooseDistrict(item)">
                {{ item.name }}
              </el-tag>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-popover>
</template>

<script>
import areaData from 'main/config/city_code.json'
import provinceMap from 'main/config/province.json'
const codeMap = {}
areaData.forEach(i => {
  codeMap[i.code] = i
})
function mapProvince(data) {
  return data.map(province => {
    return {
      ...province,
      city: codeMap[province.code].city
    }
  })
}
function getProvinceByCode(code) {
  const pMap = areaData.filter(province => {
    const pCode = province.code
    return pCode[0] === code[0] && pCode[1] === code[1]
  })
  if (pMap[0] && !pMap[1]) {
    return pMap[0]
  }
}
function getCityByCode(citys, code) {
  const cMap = citys.filter(city => {
    const cCode = city.code
    return cCode.slice(0, 4) === code.slice(0, 4)
  })
  if (cMap[0] && !cMap[1]) {
    return cMap[0]
  }
}
function getDistrictByCode(districts, code) {
  const dMap = districts.filter(district => district.code === code)
  if (dMap[0] && !dMap[1]) {
    return dMap[0]
  }
}
export default {
  name: 'ElAreaPicker',
  props: {
    value: {},
    level: {
      type: String,
      default: 'district'
    },
    disabled: Boolean,
    placement: {
      default: 'bottom-start'
    },
    clearable: Boolean
  },
  data() {
    return {
      areaLevel: 'province',
      labelValue: '',
      codeValue: '',
      province: {},
      city: {},
      district: {},
      provinceData: [],
      cityData: [],
      districtData: [],
      inputHovering: false,
      popover: {}
    }
  },
  computed: {
    showCity() {
      return ['city', 'district'].includes(this.level)
    },
    showDistrict() {
      return ['district'].includes(this.level)
    },
    showClose() {
      let hasValue = this.value !== undefined && this.value !== null && this.value !== ''
      let criteria = this.clearable &&
        !this.disabled &&
        this.inputHovering &&
        hasValue
      return criteria
    },
    iconClass() {
      return this.popover && this.popover.showPopper ? 'arrow-up is-reverse' : 'arrow-up'
    }
  },
  watch: {
    level() {
      this.update()
    },
    value(code) {
      if (code) {
        this.getDataByCode(this.value)
      }
      this.update()
    }
  },
  methods: {
    update() {
      this.changeValue(this.level, true)
    },
    reset() {
      this.labelValue = ''
      this.codeValue = ''
      this.province = {}
      this.city = {}
      this.district = {}
      this.areaLevel = 'province'
      this.$emit('input', '')
    },
    getDataByCode(code) {
      const province = getProvinceByCode(code)
      if (!province) {
        return this.reset()
      }
      let city
      if (this.showCity) {
        this.changeProvince(province)
        this.changeValue('province', true)
        city = getCityByCode(province.city, code)
      } else {
        this.province = { name: province.name, code: province.code }
        this.changeValue('province', true)
        return
      }

      if (!city) {
        return this.reset()
      }
      let district
      if (this.showDistrict) {
        this.changeCity(city)
        district = getDistrictByCode(city.area, code)
        this.changeValue('city', true)
      } else {
        this.city = { name: city.name, code: city.code }
        this.changeValue('city', true)
        return
      }
      if (!district) {
        return this.reset()
      } else {
        this.changeDistrict(district)
        this.changeValue('district', true)
      }
    },
    formaterProvince(data) {
      return [
        mapProvince(provinceMap['A-G']),
        mapProvince(provinceMap['H-K']),
        mapProvince(provinceMap['L-S']),
        mapProvince(provinceMap['T-Z'])
      ]
    },
    beforeLeave(name) {
      if (name === 'city' && !this.province.code) {
        return false
      }
      if (name === 'district' && !this.city.code) {
        return false
      }
    },
    changeValue(type, outside) {
      const { code } = this[type]
      if (this.codeValue !== code) {
        this.labelValue = [this.province.name, this.city.name, this.district.name].filter(i => i).join('/')
        this.codeValue = code
        if (this.level === type) {
          this.$emit('input', this.codeValue)
          if (!outside) {
            this.$nextTick(() => {
              this.$emit(
                'change',
                this.codeValue,
                {
                  level: type,
                  province: { ...this.province },
                  city: { ...this.city },
                  district: { ...this.district }
                }
              )
            })
          }
        }
      }
      if (this.level !== type) {
        this.$emit('input', '')
      }
    },
    selectTab(type) {
      this.changeValue(type)
      this.$emit(
        'tab',
        this.codeValue,
        {
          level: type,
          province: { ...this.province },
          city: { ...this.city },
          district: { ...this.district }
        }
      )
      if (this.level === type) {
        this.$refs.popover && this.$refs.popover.doClose()
      }
    },
    changeProvince(province) {
      if (province.code === this.province.code) return
      this.province = { name: province.name, code: province.code }
      this.city = {}
      this.district = {}
      this.cityData = Object.freeze(province.city)
      if (this.showCity) {
        this.areaLevel = 'city'
      }
    },
    chooseProvince(province) {
      this.changeProvince(province)
      this.selectTab('province')
    },
    changeCity(city) {
      if (city.code === this.city.code) return
      this.city = { name: city.name, code: city.code }
      this.district = {}
      this.districtData = Object.freeze(city.area)
      if (this.showDistrict) {
        this.areaLevel = 'district'
      }
    },
    chooseCity(city) {
      this.changeCity(city)
      this.selectTab('city')
    },
    changeDistrict(district) {
      this.district = { name: district.name, code: district.code }
    },
    chooseDistrict(district) {
      this.changeDistrict(district)
      this.selectTab('district')
    },
    handleFocus(event) {
      if (this.disabled) {
        return
      }
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.$refs.popover && !this.$refs.popover.showPopper) {
            this.$refs.popover && this.$refs.popover.doShow()
            this.$emit('focus', event)
          }
        }, 200)
      })
    },
    handleBlur(event) {
      this.$emit('blur', event);
    },
    handleClearClick(event) {
      event.stopPropagation();
      this.reset()
      this.$refs.popover && this.$refs.popover.doClose()
      this.$emit('clear');
    }
  },
  created() {
    this.provinceData = Object.freeze(this.formaterProvince(areaData))
    if (this.value) {
      this.getDataByCode(this.value)
    }
  },
  mounted() {
    this.popover = this.$refs.popover || {}
  }
}
</script>
