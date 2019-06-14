<template>
  <div class="optionBar">
    <div class="leftBar">
      <template v-for="(item,index) in optionData">
        <el-input
          class="inputstyle"
          v-if="item.type=='input'"
          :key="item.key"
          size="mini"
          :placeholder="item.placeholder"
          v-model="optionData[index].value"
          @input="onChange"
        ></el-input>
        <AsyncSelector
          v-if="item.type=='select' && item.async"
          :allOption="{optionData,connectName:optionData[index].connect || ''}"
          :key="item.key"
          :defaultFetchKey="optionData[index].defaultfetch"
          v-model="optionData[index].value"
          @onSelect="(value)=>onSelect({connectName:optionData[index].connect || '',index,value})"
          @changeDefaultfetch="changeDefaultfetch"
        />
        <el-select
          class="inputstyle"
          size="mini"
          v-if="item.type=='select' && item.async != true"
          v-model="optionData[index].value"
          :placeholder="item.placeholder"
          :key="item.key"
          @change="onChange"
        >
          <el-option
            v-for="item in item.options"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
      <el-button type="primary" size="mini" icon="el-icon-search" round @click="onSearch">搜索</el-button>
    </div>
    <div class="rightBar">
      <Render :render="extra"/>
    </div>
  </div>
</template>
<script>
import AsyncSelector from './AsyncSelector'
import Render from './render'
export default {
  props: {
    option: {
      type: Array,
      required: true
    },
    extra: {
      type: Function,
      required: false
    }
  },
  components: { AsyncSelector, Render },
  data: function () {
    return {
      optionData: []
    }
  },
  // 动态生成model
  created: function () {
    let length = this.option.length
    for (let i = 0; i < length; i++) {
      let item = {
        ...this.option[i],
        value: this.option[i].defaultValue || '',
        defaultfetch: ''
      }
      this.optionData.push(item)
    }
  },
  mounted () {},
  methods: {
    onSelect: function ({ connectName, index, value }) {
      // 当前下拉框选择后，查询与之联动查询的selectorName
      console.log(connectName)
      if (connectName !== '') {
        // 找出对应联合查询的seletorIndex
        let optionSelectorIndex = this.optionData.findIndex((v, k) => {
          return v.name === connectName
        })
        // 修改对应selector的默认选项，在AsyncSelector组建中观测defaultfetch改变，作为参数请求另外的selector的options
        this.optionData[optionSelectorIndex].defaultfetch = value
      }
      let data = { ...this.formatData() }
      this.emitEvent(data)
    },
    onChange: function (e) {
      this.emitEvent(this.formatData())
    },
    onSearch: function () {
      this.emitEvent(this.formatData())
    },
    // 格式化输出数据，转化为{key,value}形式
    formatData: function () {
      let searchData = {}
      if (this.optionData.length !== 0) {
        this.optionData.forEach(v => {
          searchData[v.name] = v.value
        })
      }
      return searchData
    },
    emitEvent: function (res) {
      this.$emit('onSearch', res)
    },
    changeDefaultfetch: function ({ optionSelectorIndex, value }) {
      // 反馈下一个seletor的搜索参数
      this.optionData[optionSelectorIndex].defaultfetch = value
    }
  }
}
</script>
<style scoped>
.inputstyle {
  width: 200px;
}
.optionBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
</style>
