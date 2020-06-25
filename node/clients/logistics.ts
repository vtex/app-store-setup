import {
  InstanceOptions,
  IOContext,
  JanusClient,
  RequestTracingConfig,
} from '@vtex/api'

import { createTracing } from '../utils/tracing'

const routes = {
  base: () => `api/logistics/`,
  carriers: () => `${routes.configuration()}/carriers`,
  configuration: () => `${routes.base()}/pvt/configuration`,
  docks: () => `${routes.configuration()}/docks`,
  freight: (carrierId: string) =>
    `${routes.configuration()}/freights/${carrierId}/values/update`,
  warehouses: () => `${routes.configuration()}/warehouses`,
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

  public createFreightValues(
    carrierId: string,
    freightBody: FreightValue[],
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'logistics-createFreightValues'
    return this.http.post(routes.freight(carrierId), freightBody, {
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
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
      freightTableProcessStatus = 1,
      freightTableValueError = null,
      modals = [],
      onlyItemsWithDefinedModal = false,
      deliveryOnWeekends = true,
      carrierSchedule = [],
      maxDimension = {
        height: 0,
        length: 0,
        maxSumDimension: 0,
        weight: 0,
        width: 0,
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
        carrierSchedule,
        dayOfWeekBlockeds,
        dayOfWeekForDelivery,
        deliveryOnWeekends,
        exclusiveToDeliveryPoints,
        factorCubicWeight,
        freightTableProcessStatus,
        freightTableValueError,
        id,
        isPolygon,
        maxDimension,
        maxRangeDelivery,
        minimunCubicWeight,
        modals,
        name,
        numberOfItemsPerShipment,
        onlyItemsWithDefinedModal,
        scheduledDelivery,
        slaType,
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
