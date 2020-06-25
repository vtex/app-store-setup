import { fetchConfiguration } from '../middlewares/configuration'

export async function configuration(ctx: Context) {
  ctx.body = await fetchConfiguration(ctx)
  ctx.status = ctx.body ? 200 : 404
}
