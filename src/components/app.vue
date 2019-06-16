<template>
  <div>
    <el-input v-model="input"/>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Mytable :columns="columns" :data="tableData"/>
  </div>
</template>
<script>
import Mytable from './table'
export default {
  components: { Mytable },
  data() {
    return {
      input: '',
      columns: [
        {
          key: 'name',
          label: '名字',
          dataIndex: 'name'
        },
        {
          key: 'address',
          label: '地址',
          dataIndex: 'address'
        },
        {
          key: 'date',
          label: '日期',
          dataIndex: 'date'
        },
        {
          key: 'setting',
          label: '操作',
          render: h => {
            return (
              <el-button type="primary" size="mini" icon="el-icon-search" round>
                搜索
              </el-button>
            )
          }
        }
      ],
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  mounted: function() {
    console.log('mounted')
  },
  destroyed: function() {
    console.log('destroyed')
  },
  methods: {
    getInput: function() {
      console.log(`我的子组件的方法:input值为:${this.input}`)
    },
    add: function() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function() {
      this.items.splice(this.randomIndex(), 1)
    }
  }
}
</script>
