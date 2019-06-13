
// import http from '../store/Api/warpAxios'
const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas'
]

const promiseData = (data) => {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(data)
    }, 2000)
  })
}
export default {
  methods: {
    // 获取异步加载下拉组件内容
    fetchOperation: function (url = '', options = {}) {
      console.log(url, options)
      return promiseData(states.map((item, index) => {
        return { key: index, value: item + '123', label: item }
      }))
    }
  }
}
