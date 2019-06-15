<template>
  <Modal :visible="visible" title="我的标题" :showclose="showclose" @cancel="slotProps.clickEvent">
    <App ref="myapp" slot="default"/>
    <div slot="footerBar" slot-scope="props">
      <el-button @click="props.onCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="()=>{ getitemdata(props.onCancel) }"
        :loading="btnLoading"
      >确 定</el-button>
    </div>
  </Modal>
</template>
<script>
import Modal from './AsyncModal'
import App from './app'
export default {
  components: { Modal, App },
  props: ['visible', 'showclose', 'slotProps'],
  data() {
    return {
      input: '',
      btnLoading: false,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    getitemdata: function(done) {
      this.btnLoading = true
      this.$refs['myapp'].getInput()
      let r = setTimeout(() => {
        this.btnLoading = false
        done()
        clearTimeout(r)
      }, 1000)
    }
  }
}
</script>
