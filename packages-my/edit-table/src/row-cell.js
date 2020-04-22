export default {
  functional: true,
  props: {
    render: Function,
    row: {
      default: () => ({})
    },
    index: Number,
    value: {}
  },
  render(h, context) {
    return context.props && context.props.render(
      h,
      {
        row: context.props.row,
        index: context.props.index,
        value: context.props.value
      }
    )
  }
}
