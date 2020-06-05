export default <T>(ctx: Context, obj: T) => {
  ctx.state.body = {
    ...ctx.state.body,
    ...obj,
  }
  return ctx
}
