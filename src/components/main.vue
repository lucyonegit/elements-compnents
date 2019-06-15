<template>
  <div>
    <Option :option="conf" :extra="extra" @onSearch="onSearch"/>
  </div>
</template>

<script>
import Option from './Option'
import BooleanBtn from './BooleanBtn'
import Func from './func'
export default {
  components: { Option, BooleanBtn },
  data() {
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
    extra: function(h) {
      return (
        <BooleanBtn
          scopedSlots={{
            default: function(slotProps) {
              return (
                <Func
                  slotProps={slotProps}
                  showclose={true}
                  visible={slotProps.status}
                />
              )
            },
            btnText: function(props) {
              return <span>弹窗按钮</span>
            }
          }}
        />
      )
    },
    onSearch: function(res) {
      console.log(res)
    }
  }
}
</script>
