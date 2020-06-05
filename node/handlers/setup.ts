import { json } from 'co-body'

import { setupPipe } from '../resources/setupPipe'

export async function setup(ctx: Context) {
  const { salesChannels } = await json(ctx.req)

  ctx.state.body = {
    salesChannelMap: salesChannels,
  }

  try {
    const state = await setupPipe(ctx)

    ctx.status = 200
    ctx.body = { ...state, ctx: undefined }
  } catch (error) {
    ctx.status = 500
    ctx.body = error
  }
}
