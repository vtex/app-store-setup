import { json } from 'co-body'

import { setupPipe } from '../resources/setupPipe'
import { BRL_SALES_CHANNEL_ID } from '../utils/constants'

export async function setup(ctx: Context) {
  const { salesChannels } = (await json(ctx.req)) as ChannelRequest

  ctx.state.body = {
    salesChannels: salesChannels.map(salesChannel => ({
      ...salesChannel,
      currency: salesChannels.find(({ mkp }) => mkp === BRL_SALES_CHANNEL_ID)
        ? 'BRL'
        : 'USD',
    })),
  }
  const {
    state: { body: state },
  } = await setupPipe(ctx)

  ctx.status = 200
  ctx.body = { ...state, ctx: undefined }
}
