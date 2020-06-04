interface DayOfWeekDelivery {
  dayOfWeek: number
  deliveryRanges: string[]
}

interface CarrierInput {
  id: string
  slaType: string
  name: string
  scheduledDelivery?: boolean
  maxRangeDelivery?: number
  dayOfWeekForDelivery?: DayOfWeekDelivery[] | null
  dayOfWeekBlockeds?: string[]
  freightValue?: FreightValue[]
  factorCubicWeight?: string | null
  freightTableProcessStatus?: number
  freightTableValueError?: string | null
  modals?: string[]
  onlyItemsWithDefinedModal?: boolean
  deliveryOnWeekends?: boolean
  carrierSchedule?: string[]
  maxDimension?: {
    weight: number
    height: number
    width: number
    length: number
    maxSumDimension: number
  }
  exclusiveToDeliveryPoints?: boolean
  minimunCubicWeight?: number
  isPolygon?: boolean
  numberOfItemsPerShipment?: number | null
}

interface FreightValue {
  absoluteMoneyCost: string
  country: string
  maxVolume: number
  operationType?: number
  pricePercent: number
  pricePercentByWeight: number
  timeCost: string
  weightEnd: number
  weightStart: number
  zipCodeEnd: string
  zipCodeStart: string
  polygon: string
}

interface DockInput {
  id: string
  name: string
  priority: number
  freightTableIds: string[]
  dockTimeFake?: string | null
  timeFakeOverhead?: string | null
  salesChannels: string[]
  wmsEndPoint?: string
  pickupStoreInfo?: {
    isPickupStore: boolean
    storeId: string | null
    friendlyName: string | null
    additionalInfo: string | null
    dockId: string | null
  }
  address: {
    postalCode: string
    country: {
      acronym: string
      name: string
    }
    city: string
    state: string
    neighborhood: string
    street: string
    number: string
    complement: string | null
  }
}

interface WarehouseInput {
  id: string
  name: string
  warehouseDocks: Array<{
    dockId: string
  }>
}
