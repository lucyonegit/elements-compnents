<template>
  <el-select
    size="mini"
    v-model="changeValue"
    placeholder="请输入关键词"
    automatic-dropdown
    @visible-change="showOptions"
    @change="onChange"
    :loading="loading"
  >
    <el-option label="default" value="默认值"></el-option>
    <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>
<script>
import asyncSelector from '../mixins/common'
export default {
  mixins: [asyncSelector],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: ['value', 'defaultFetchKey', 'allOption'],
  data () {
    return {
      options: [],
      loading: true,
      changeValue: ''
    }
  },
  created: function () {
    // 写入默认值
    this.changeValue = this.value || ''
  },
  methods: {
    onChange: function (value) {
      // 实现v-model
      this.$emit('change', value)
      // 触发父组件事件
      this.$emit('onSelect', value)
    },
    getOptions: async function (newVal) {
      // 根据一个参数去请求结果，参数用于联动查询
      this.loading = true
      let res = await this.fetchOperation(
        '/data/select',
        newVal || this.defaultFetchKey
      )
      return res
    },
    showOptions: async function () {
      // 避免第二次再次请求
      let noOptions = this.options.length === 0
      if (noOptions) {
        this.getOptions().then(res => {
          this.options = res
          this.loading = false
        })
      }
    }
  },
  watch: {
    defaultFetchKey: async function (newVal, oldVal) {
      console.log('defaultFetchKey changed')
      let { optionData, connectName } = this.allOption
      if (connectName !== '') {
        let optionSelectorIndex = optionData.findIndex((v, k) => {
          return v.name === connectName
        })
        // 修改与之关联的selector的默认搜索选项，作为参数查询options
        this.$emit('changeDefaultfetch', { optionSelectorIndex, value: newVal })
      }
      this.getOptions(newVal).then(res => {
        this.options = res
        this.changeValue = res[parseInt(Math.random() * 10)].label
        // 改变v-model
        this.$emit('change', res[5].value)
        this.loading = false
      })
    }
  }
}
</script>
<style scoped>
</style>
