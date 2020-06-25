import { json } from 'co-body'

import { BRL_SALES_CHANNEL_ID } from '../utils/constants'

export async function prepare(ctx: Context, next: () => Promise<any>) {
  const { salesChannels } = (await json(ctx.req)) as ChannelRequest

  ctx.state.body = {
    salesChannels: salesChannels.map(salesChannel => ({
      ...salesChannel,
      currency: salesChannels.find(({ mkp }) => mkp === BRL_SALES_CHANNEL_ID)
        ? 'BRL'
        : 'USD',
    })),
  }

  ctx.status = 200
  ctx.body = 'Setup started'

  next()
}
