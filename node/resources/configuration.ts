export const storeInVbase = (ctx: Context) =>
  ctx.clients.vbase
    .saveJSON('vtex.app-store-setup', 'configs', ctx.state.body)
    .then(_ => ctx.state.body)

export const fetchConfiguration = (ctx: Context) =>
  ctx.clients.vbase.getJSON('vtex.app-store-setup', 'configs')
