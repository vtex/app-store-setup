interface LogisticsConfigurations {
  currency: string
  id: string
}

interface SetupState {
  salesChannelMap: Record<string, string>
  brandId?: number
  specifications?: Array<{ name: string; id: number }>
  categoryId?: number
  specificationGroupId?: number
  carriers?: LogisticsConfigurations[]
  docks?: LogisticsConfigurations[]
  warehouses?: LogisticsConfigurations[]
}

interface ChannelRequest {
  requester: string
  requested: string
  salesChannels: SalesChannelMap[]
  settings: AppSettings
}

interface AppSettings extends ChannelSettings {
  appId: string
  name: string
  imageUrl: string
  salesChannels: SalesChannelSettings[]
}

interface SalesChannelMap {
  affiliateId: string
  mkp: number
  seller: number
}

interface SalesChannelState extends SalesChannelMap {
  currency: string
}

interface SalesChannelSettings {
  id: number
  name: string
  description: string
  commissioning: {
    product: number
    freight: number
  }
  payment: string
}
