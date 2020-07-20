import { AppClient, InstanceOptions, IOContext } from '@vtex/api'

export default class AppStoreSeller extends AppClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('vtex.app-store-seller@0.x', ctx, {
      ...options,
      retries: 3,
      timeout: 20000,
    })
  }

  public async getSpecifications() {
    return this.http.get<TargetSpecifications[]>('_v/catalog-specifications')
  }
}

interface TargetSpecifications {
  name: string
  isRequired: boolean
}
