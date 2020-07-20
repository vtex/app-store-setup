import incrementState from '../utils/incrementState'

const DEFAULT_CARRIER_PREFIX = 'Apps'

const getLogisticsNaming = (currency: string, isId = false) => {
  const name = DEFAULT_CARRIER_PREFIX + currency
  return isId ? name.toLowerCase() : name
}

const getDefaultAddress = (currency: string) => {
  const DEFAULT_ADDRESSES = {
    BRL: {
      city: 'Rio de Janeiro',
      complement: '',
      country: {
        acronym: 'BRA',
        name: 'Brazil',
      },
      neighborhood: 'Botafogo',
      number: '300',
      postalCode: '22250040',
      state: 'RJ',
      street: 'Praia de Botafogo',
    },
    USD: {
      city: 'New York',
      complement: '',
      country: {
        acronym: 'USA',
        name: 'United States',
      },
      neighborhood: 'New York',
      number: '',
      postalCode: '10017',
      state: 'NY',
      street: '12 E 49th St',
    },
  }

  return DEFAULT_ADDRESSES[currency as keyof typeof DEFAULT_ADDRESSES]
}

export async function setupCarriers(ctx: Context, next: () => Promise<any>) {
  const {
    state: {
      body: { salesChannels },
    },
    clients: { logistics },
  } = ctx

  const createCarrierAndFreightValue = async (currency: string) => {
    const name = getLogisticsNaming(currency)
    const id = getLogisticsNaming(currency, true)

    await logistics
      .createCarrier({
        id,
        name,
        slaType: getLogisticsNaming(currency),
      })
      .then(_ =>
        logistics.createFreightValues(id, [
          {
            absoluteMoneyCost: '0',
            country: currency === 'BRL' ? 'BRA' : 'USA',
            maxVolume: 1000000000,
            polygon: '',
            pricePercent: 0,
            pricePercentByWeight: 0,
            timeCost: '0.00:00:00',
            weightEnd: 100000,
            weightStart: 0,
            zipCodeEnd: '99999999',
            zipCodeStart: '0',
          },
        ])
      )

    return { id, currency }
  }

  const carriers = await Promise.all(
    salesChannels?.map(({ currency }) =>
      createCarrierAndFreightValue(currency)
    ) ?? []
  )

  incrementState(ctx, { carriers }, 'carriers')
  next()
}

export async function setupDocks(ctx: Context, next: () => Promise<any>) {
  const {
    state: {
      body: { salesChannels },
    },
    clients: { logistics },
  } = ctx

  const docks = await Promise.all(
    salesChannels?.map(
      ({ currency, seller: salesChannelId }: SalesChannelState, index: any) =>
        logistics
          .createDock({
            address: getDefaultAddress(currency),
            freightTableIds: [getLogisticsNaming(currency)],
            id: getLogisticsNaming(currency, true),
            name: getLogisticsNaming(currency),
            priority: index,
            salesChannels: [salesChannelId.toString()],
          })
          .then(_ => ({ id: getLogisticsNaming(currency, true), currency }))
    ) ?? []
  )

  incrementState(ctx, { docks }, 'docks')
  next()
}

export async function setupWarehouses(ctx: Context, next: () => Promise<any>) {
  const {
    state: {
      body: { salesChannels },
    },
    clients: { logistics },
  } = ctx

  const warehouses = await Promise.all(
    salesChannels?.map(({ currency }) =>
      logistics
        .createWarehouse({
          id: getLogisticsNaming(currency, true),
          name: getLogisticsNaming(currency),
          warehouseDocks: [{ dockId: getLogisticsNaming(currency, true) }],
        })
        .then(_ => ({ id: getLogisticsNaming(currency, true), currency }))
    ) ?? []
  )

  incrementState(ctx, { warehouses }, 'warehouses')
  next()
}
