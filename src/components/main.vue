<template>
  <div>
    <Option :option="conf" :extra="extra" @onSearch="onSearch"/>
    <BooleanBtn>
      <template slot="btnText">弹窗</template>
      <template slot="default" slot-scope="slotProps">
        <el-dialog title="提示" :visible="slotProps.status" width="30%">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="slotProps.clickEvent">取 消</el-button>
            <el-button type="primary" @click="()=>{console.log('done')}">确 定</el-button>
          </span>
        </el-dialog>
      </template>
    </BooleanBtn>
  </div>
</template>

<script>
import Option from './Option'
import BooleanBtn from './BooleanBtn'
export default {
  components: { Option, BooleanBtn },
  data () {
    return {
      conf: [
        {
          key: 1,
          type: 'select',
          async: true,
          placeholder: '请选择品牌',
          defaultValue: '默认值',
          name: 'pinpai',
          connect: 'pro'
        },
        {
          key: 11,
          type: 'select',
          async: true,
          placeholder: '请选择产品',
          defaultValue: '默认值',
          name: 'pro'
        },
        {
          key: 2,
          type: 'select',
          async: false,
          placeholder: '请选择',
          name: 'status',
          options: [
            { key: 1, label: '1111', value: 1 },
            { key: 2, label: '2222', value: 2 }
          ]
        },
        {
          key: 3,
          type: 'input',
          async: false,
          placeholder: '请输入内容',
          name: 'person'
        }
      ]
    }
  },
  methods: {
    extra: function (h) {
      return (
        <el-button
          size="small"
          type="primary"
          round={true}
          onClick={() => console.log(111)}
        >
          hello
        </el-button>
      )
    },
    onSearch: function (res) {
      console.log(res)
    }
  }
}
</script>
