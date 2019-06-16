<template>
  <div>
    <table cellspacing="0">
      <tr>
        <th v-for="(item,index) in columns" :key="index">{{item.label}}</th>
      </tr>
      <tr v-for="(item) in columns" :key="item.key">
        <td v-for="(item,index) in columns" :key="item.id">
          <Render
            :render="item.dataIndex ? data[index][item.dataIndex] : item.render"
            :rowdata="data[index]"
            :dataIndex="item.dataIndex"
          />
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import Render from './render'
export default {
  components: { Render },
  props: ['columns', 'data']
}
</script>
<style scoped>
table {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid rgb(220, 220, 220);
  border-bottom: 0;
  border-collapse: collapse;
}
table tbody tr:nth-child(2n + 1) {
  background: rgb(245, 245, 245);
}
table th {
  height: 50px;
  text-align: left;
  padding: 10px;
  border-right: 1px solid rgb(240, 240, 240);
}
tr {
  border: 1px solid rgb(220, 220, 220);
}
tr:hover {
  background: rgb(240, 240, 240);
}
td {
  height: 40px;
  padding: 10px;
  border-right: 1px solid rgb(240, 240, 240);
}
</style>
