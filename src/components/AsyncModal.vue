<template>
  <el-dialog :title="title" :visible="visible" :show-close="showclose" @close="onClose">
    <div class="content" v-if="afterVisible">
      <slot name="default"></slot>
    </div>
    <span slot="footer" class="dialog-footer">
      <slot name="footerBar" :onCancel="onCancel"></slot>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data: function() {
    return {
      afterVisible: true
    }
  },
  props: {
    title: {
      type: String,
      default: '标题',
      required: false
    },
    visible: {
      type: Boolean,
      default: false,
      required: false
    },
    showclose: {
      type: Boolean,
      default: true
    },
    slotProps: {
      type: Object
    }
  },
  watch: {
    visible: function(newVal) {
      if (newVal) {
        this.afterVisible = true
      }
    }
  },
  mounted: function() {},
  methods: {
    onClose: function() {
      let timer = setTimeout(() => {
        this.afterVisible = false
        clearTimeout(timer)
      }, 300)
      //防止执行两次cancel事件导致弹窗无法关闭
      if (this.visible) {
        this.$emit('cancel')
      }
    },
    onCancel: function() {
      this.$emit('cancel')
    }
  }
}
</script>
