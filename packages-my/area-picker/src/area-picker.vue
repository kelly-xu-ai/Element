<template>
  <el-popover ref="popover" v-bind="$attrs" :disabled="disabled">
    <div :title="labelValue" class="area-picker" slot="reference">
      <el-input v-model="labelValue" :disabled="disabled" readonly></el-input>
    </div>
    <div>
      <el-tabs
        v-model="areaLevel"
        :before-leave="beforeLeave">
        <el-tab-pane label="省份" name="province">
          <div class="area-picker-province">
            <div
              class="area-picker-province-type"
              v-for="(type, index) in ['A-G', 'H-K', 'L-S', 'T-Z']"
              :key="type">
              <div class="area-picker-province-title">{{type}}</div>
              <div class="area-picker-province-content">
                <div
                  class="area-picker-province-cell"
                  v-for="item in provinceData[index]"
                  :key="item.code">
                  <el-tag
                    style="cursor: pointer;border: none;"
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
          <div class="area-picker-city">
            <div
              class="area-picker-cell"
              v-for="item in cityData"
              :key="item.code">
              <el-tag
                style="cursor: pointer;border: none;"
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
          <div class="area-picker-district">
            <div
              class="area-picker-cell"
              v-for="item in districtData"
              :key="item.code">
              <el-tag
                style="cursor: pointer;border: none;"
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
import areaData from './city_code.json'
import provinceMap from './province.json'
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
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {},
    level: {
      type: String,
      default: 'district'
    },
    disabled: Boolean
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
      districtData: []
    }
  },
  computed: {
    showCity() {
      return ['city', 'district'].includes(this.level)
    },
    showDistrict() {
      return ['district'].includes(this.level)
    }
  },
  watch: {
    level() {
      this.unpdate()
    }
  },
  methods: {
    unpdate() {
      this.changeValue(this.level)
    },
    reset() {
      this.labelValue = ''
      this.codeValue = ''
      this.province = {}
      this.city = {}
      this.district = {}
      this.areaLevel = 'province'
      this.$emit('change', '')
    },
    getDataByCode(code) {
      const province = getProvinceByCode(code)
      if (!province) {
        return this.reset()
      }
      let city
      if (this.showCity) {
        this.chooseProvince(province)
        city = getCityByCode(province.city, code)
      } else {
        this.province = { name: province.name, code: province.code }
        this.changeValue('province')
        return
      }

      if (!city) {
        return this.reset()
      }
      let district
      if (this.showDistrict) {
        this.chooseCity(city)
        district = getDistrictByCode(city.area, code)
      } else {
        this.city = { name: city.name, code: city.code }
        this.changeValue('city')
        return
      }
      if (!district) {
        return this.reset()
      } else {
        this.chooseDistrict(district)
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
    changeValue(type) {
      const { code } = this[type]
      if (this.codeValue !== code) {
        this.labelValue = [this.province.name, this.city.name, this.district.name].filter(i => i).join('/')
        this.codeValue = code
        if (this.level === type) {
          this.$emit('change', this.codeValue)
        }
      }
      if (this.level === type) {
        this.$refs.popover && this.$refs.popover.doClose()
      }
    },
    chooseProvince(province) {
      this.province = { name: province.name, code: province.code }
      this.city = {}
      this.district = {}
      this.cityData = Object.freeze(province.city)
      if (this.showCity) {
        this.areaLevel = 'city'
      }
      this.changeValue('province')
    },
    chooseCity(city) {
      this.city = { name: city.name, code: city.code }
      this.district = {}
      this.districtData = Object.freeze(city.area)
      if (this.showDistrict) {
        this.areaLevel = 'district'
      }
      this.changeValue('city')
    },
    chooseDistrict(district) {
      this.district = { name: district.name, code: district.code }
      this.changeValue('district')
    }
  },
  created() {
    this.provinceData = Object.freeze(this.formaterProvince(areaData))
    if (this.value) {
      this.getDataByCode(this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
%picker-area {
  width: 400px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.area-picker {
  display: inline-block;
  &-province {
    width: 400px;
    &-type {
      display: flex;
    }
    &-title {
      width: 30px;
      min-width: 30px;
      text-align: right;
      padding: 4px 0;
    }
    &-content {
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    &-cell {
      width: 20%;
      text-align: center;
      padding: 4px 0;
    }
  }
  &-city, &-district {
    @extend %picker-area
  }
  &-cell {
    width: 25%;
    padding: 4px 10px;
    box-sizing: border-box;
  }
}
</style>
