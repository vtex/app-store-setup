import { fetchConfiguration } from '../resources/configuration'

export async function configuration(ctx: Context) {
  ctx.body = fetchConfiguration(ctx)
  ctx.status = 200
}
