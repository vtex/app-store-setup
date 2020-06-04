export const storeInVbase = (state: SetupState) =>
  state.ctx.clients.vbase
    .saveJSON('vtex.app-store-setup', 'configs', {
      ...state,
      ctx: undefined,
    })
    .then(_ => state)
