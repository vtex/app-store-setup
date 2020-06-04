import { InstanceOptions, IOContext, RequestTracingConfig } from '@vtex/api'

import { createTracing } from '../utils/tracing'
import VtexCommerce from './vtexcommerce'

const routes = {
  account: () => `account`,
}

export default class Logistics extends VtexCommerce {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, 'license-manager', options)
  }

  public getAccountInfo(tracingConfig?: RequestTracingConfig) {
    const metric = 'licenseManager-getAccount'
    return this.http.get(routes.account(), {
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }
}
