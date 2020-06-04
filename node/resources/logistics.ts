import { toPairs } from 'ramda'

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

export const setupCarriers = async (state: SetupState) => {
  const {
    salesChannelMap,
    ctx: {
      clients: { logistics },
    },
  } = state

  const carriers = await Promise.all(
    Object.keys(salesChannelMap).map(currency =>
      logistics
        .createCarrier({
          freightValue: [
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
          ],
          id: getLogisticsNaming(currency, true),
          name: getLogisticsNaming(currency),
          slaType: getLogisticsNaming(currency),
        })
        .then(_ => ({ id: getLogisticsNaming(currency, true), currency }))
    )
  )

  return {
    ...state,
    carriers,
  } as SetupState
}

export const setupDocks = async (state: SetupState) => {
  const {
    salesChannelMap,
    ctx: {
      clients: { logistics },
    },
  } = state

  const docks = await Promise.all(
    toPairs(salesChannelMap).map(([currency, salesChannelId], index) =>
      logistics
        .createDock({
          address: getDefaultAddress(currency),
          freightTableIds: [getLogisticsNaming(currency)],
          id: getLogisticsNaming(currency, true),
          name: getLogisticsNaming(currency),
          priority: index,
          salesChannels: [salesChannelId],
        })
        .then(_ => ({ id: getLogisticsNaming(currency, true), currency }))
    )
  )

  return {
    ...state,
    docks,
  } as SetupState
}

export const setupWarehouses = async (state: SetupState) => {
  const {
    salesChannelMap,
    ctx: {
      clients: { logistics },
    },
  } = state

  const warehouses = await Promise.all(
    Object.keys(salesChannelMap).map(currency =>
      logistics
        .createWarehouse({
          id: getLogisticsNaming(currency, true),
          name: getLogisticsNaming(currency),
          warehouseDocks: [{ dockId: getLogisticsNaming(currency) }],
        })
        .then(_ => ({ id: getLogisticsNaming(currency, true), currency }))
    )
  )

  return {
    ...state,
    warehouses,
  } as SetupState
}
