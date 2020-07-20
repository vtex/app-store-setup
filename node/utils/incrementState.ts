export default <T>(ctx: Context, obj: T, step: string) => {
  ctx.state.body = {
    ...ctx.state.body,
    ...obj,
  }

  ctx.vtex.logger.info({ step, ...obj })
  return ctx
}
