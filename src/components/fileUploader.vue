<template>
  <el-upload
    class="FileUpload"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-remove="onRemove"
    accept="file"
    :on-success="onSuccess"
    :multiple="false"
    :limit="1"
    :file-list="fileList"
  >
    <el-button size="small" :type="btnStatus.type" :icon="btnStatus.icon">{{btnStatus.btnText}}</el-button>
    <slot></slot>
  </el-upload>
</template>
<script>
export default {
  props: {
    name: String,
    nextTickProps: Object,
    formName: String
  },
  data() {
    return {
      fileList: [],
      btnStatus: {
        type: 'primary',
        icon: 'el-icon-upload',
        btnText: '点击上传'
      }
    }
  },
  mounted: function() {
    this.nextTickProps.nextTick(() => {
      this.emitToformItem()
    })
  },
  methods: {
    onSuccess: function(response, file, fileList) {
      this.emitToformItem(response.id)
      this.btnStatus = {
        type: 'success',
        icon: 'el-icon-check',
        btnText: '上传成功'
      }
    },
    onRemove: function(file, fileList) {
      this.emitToformItem()
      this.btnStatus = {
        type: 'primary',
        icon: 'el-icon-upload',
        btnText: '点击上传'
      }
    },
    // 触发校验
    emitToformItem(value) {
      this.nextTickProps.vm.formData[this.name] = value // 更改依赖formData，form-item计算属性自动计算计算参加校验的value
      if (this.$parent.$options.componentName === 'ElFormItem') {
        this.$parent.$emit('el.form.change', [value]) // 触发form-item事件，启动form校验
      } else {
        console.error(
          'fileLoader component mast be warped in form-item component'
        )
      }
    }
    // validateField(errorStatua) {
    //   let func = errorStatua ? 'validateField' : 'clearValidate'
    //   this.nextTickProps.vm.$refs[this.formName][func]([this.name])
    // }
  }
}
</script>
