import { json } from 'co-body'

import { setupPipe } from '../resources/setupPipe'

export const setup = async (ctx: Context) => {
  const { salesChannelMap } = await json(ctx.req)

  const state = await setupPipe({
    ctx,
    salesChannelMap,
  })

  delete state.ctx

  ctx.status = 200
  ctx.body = state
}
