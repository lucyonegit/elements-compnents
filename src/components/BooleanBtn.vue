<template>
  <div>
    <el-button type="primary" size="mini" icon="el-icon-search" round @click="clickEvent">
      <slot name="btnText"></slot>
    </el-button>
    <slot :status="status" :clickEvent="clickEvent"></slot>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      status: false
    }
  },
  methods: {
    clickEvent: function() {
      this.status = !this.status
    }
  }
}
</script>
