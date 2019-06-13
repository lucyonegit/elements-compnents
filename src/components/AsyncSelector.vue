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
import asyncSelector from '../mixins/fetchData'
export default {
  mixins: [asyncSelector],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: ['value', 'defaultFetchKey'],
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
    showOptions: async function () {
      // 避免第二次再次请求
      let noOptions = this.options.length === 0
      if (noOptions) {
        this.loading = true
        let res = await this.fetchOperation(
          '/data/select',
          this.defaultFetchKey
        )
        this.options = res
        this.loading = false
      }
    }
  }
}
</script>
<style scoped>
</style>
