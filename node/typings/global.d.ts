interface LogisticsConfigurations {
  currency: string
  id: string
}
interface SetupState {
  ctx: Context
  salesChannelMap: Record<string, string>
  brandId?: number
  specifications?: Array<{ name: string; id: number }>
  categoryId?: number
  specificationGroupId?: number
  carriers?: LogisticsConfigurations[]
  docks?: LogisticsConfigurations[]
  warehouses?: LogisticsConfigurations[]
}
