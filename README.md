
##   \<Option/\>
#### 搜索过滤条件组件。实现Json化模板渲染下拉框，文本框组，支持自定义渲染，联合查询。


- ##### Attributes
prop名称 | 类型
---|---
option | Array<Object>
extra | { (h:Function) : JSX }

- ##### Methods
Methods名称 | 说明
---|---
onSearch | Array<Object>
extra | { (res：Object)：void } 


- 基本用法

```html
<template>
    <Option :option="config" :extra="extra" @onSearch="onSearch"/>
 </template>
 ```
 ```javascript
 
 const config = [
    {
      key: 1,
      type: 'select',
      async: true,
      placeholder: '请选择类型',
      defaultValue: 'defaultValue',
      name: 'type',
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
      placeholder: '请输入内容',
      name: 'person'
    }
    const extra = function(h){
     return (
      <el-button
          size="small"
          type="primary"
          round={true}
          onClick={}
        >
          新产品接入
      </el-button>
    )
 }
```

## \<BooleanBtn/\>
#### 布尔值容器组件。可包裹modal等组件自动实现布尔值切换，无需在父组件维护状态


- **基本用法**

```html
<BooleanBtn>
  <template slot="btnText">搜索</template>
  <template slot="default" slot-scope="slotProps">
    <el-dialog title="提示" :visible="slotProps.status" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="slotProps.clickEvent">取 消</el-button>
        <el-button type="primary" @click=";">确 定</el-button>
      </span>
    </el-dialog>
  </template>
</BooleanBtn>
```

**slotProps暴露出状态status与方法clickEvent用来改变status**




