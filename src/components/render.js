export default {
  name: 'Render',
  functional: true,
  props: {
    render: [Function, String],
    rowdata: Object,
    dataIndex: String
  },
  render: (h, ctx) => {
    if (typeof (ctx.props.render) !== 'string') {
      return ctx.props.render(h, ctx.props.rowdata || {})
    } else {
      return h('span', ctx.props.rowdata.row[ctx.props.dataIndex])
    }
  }
}
