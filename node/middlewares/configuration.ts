export function storeInVbase(ctx: Context, next: () => Promise<any>) {
  return ctx.clients.vbase
    .saveJSON('vtex.app-store-setup', 'configs', ctx.state.body)
    .then(_ => next())
}

export function fetchConfiguration(ctx: Context) {
  return ctx.clients.vbase.getJSON('vtex.app-store-setup', 'configs', true)
}
