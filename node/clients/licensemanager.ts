import {
  InstanceOptions,
  IOContext,
  JanusClient,
  RequestTracingConfig,
} from '@vtex/api'

import { createTracing } from '../utils/tracing'

const routes = {
  account: () => `${routes.base()}/account`,
  base: () => `license-manager`,
}

export default class Logistics extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        VtexIdclientAutCookie: ctx.authToken,
        ...options?.headers,
      },
    })
  }

  public getAccountInfo(tracingConfig?: RequestTracingConfig) {
    const metric = 'licenseManager-getAccount'
    return this.http.get(routes.account(), {
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }
}
