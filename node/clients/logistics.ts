import { InstanceOptions, IOContext, RequestTracingConfig } from '@vtex/api'

import { createTracing } from '../utils/tracing'
import VtexCommerce from './vtexcommerce'

const routes = {
  configuration: () => `pvt/configuration`,
  carriers: () => `${routes.configuration()}/carriers`,
  docks: () => `${routes.configuration()}/docks`,
  warehouses: () => `${routes.configuration()}/warehouses`,
}

export default class Logistics extends VtexCommerce {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, 'logistics', options)
  }

  public createCarrier(
    {
      id,
      slaType,
      name,
      scheduledDelivery = false,
      maxRangeDelivery = 0,
      dayOfWeekForDelivery = null,
      dayOfWeekBlockeds = [],
      factorCubicWeight = null,
      freightValue = [],
      freightTableProcessStatus = 1,
      freightTableValueError = null,
      modals = [],
      onlyItemsWithDefinedModal = false,
      deliveryOnWeekends = true,
      carrierSchedule = [],
      maxDimension = {
        height: 0,
        length: 0,
        weight: 0,
        width: 0,
        maxSumDimension: 0,
      },
      exclusiveToDeliveryPoints = false,
      minimunCubicWeight = 0,
      isPolygon = false,
      numberOfItemsPerShipment = null,
    }: CarrierInput,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'logistics-createCarrier'
    return this.http.post<boolean>(
      routes.carriers(),
      {
        id,
        slaType,
        name,
        scheduledDelivery,
        maxRangeDelivery,
        dayOfWeekForDelivery,
        dayOfWeekBlockeds,
        factorCubicWeight,
        freightValue,
        freightTableProcessStatus,
        freightTableValueError,
        modals,
        onlyItemsWithDefinedModal,
        deliveryOnWeekends,
        carrierSchedule,
        maxDimension,
        exclusiveToDeliveryPoints,
        minimunCubicWeight,
        isPolygon,
        numberOfItemsPerShipment,
      },
      {
        metric,
        tracing: createTracing(metric, tracingConfig),
      }
    )
  }

  public createDock(
    {
      address,
      id,
      name,
      priority,
      salesChannels,
      freightTableIds,
      dockTimeFake = null,
      timeFakeOverhead = null,
      wmsEndPoint = '',
      pickupStoreInfo = {
        isPickupStore: false,
        storeId: null,
        friendlyName: null,
        additionalInfo: null,
        dockId: null,
      },
    }: DockInput,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'logistics-createCarrier'
    return this.http.post<boolean>(
      routes.docks(),
      {
        id,
        name,
        priority,
        salesChannels,
        freightTableIds,
        dockTimeFake,
        timeFakeOverhead,
        wmsEndPoint,
        pickupStoreInfo: {
          ...pickupStoreInfo,
          address: {
            ...address,
          },
        },
      },
      {
        metric,
        tracing: createTracing(metric, tracingConfig),
      }
    )
  }

  public createWarehouse(
    warehouseInput: WarehouseInput,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'logistics-createWarehouse'
    return this.http.post(routes.warehouses(), warehouseInput, {
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }
}
