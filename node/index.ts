import {
  ClientsConfig,
  ParamsContext,
  RecorderState,
  Service,
  ServiceContext,
  method,
} from '@vtex/api'

import { Clients } from './clients'
import { configuration } from './handlers/configuration'
import {
  createBrand,
  createCategory,
  createSpecificationGroup,
  createSpecifications,
} from './middlewares/catalog'
import { storeInVbase } from './middlewares/configuration'
import {
  setupCarriers,
  setupDocks,
  setupWarehouses,
} from './middlewares/logistics'
import { prepare } from './middlewares/prepare'

const TIMEOUT_MS = 10000

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  interface State extends RecorderState {
    body: {
      salesChannels?: SalesChannelState[]
      categoryId?: number
      specificationGroupId?: number
    }
  }
  type Context = ServiceContext<Clients, State>
}

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  routes: {
    configuration: method({
      GET: configuration,
    }),
    setup: [
      prepare,
      createBrand,
      createCategory,
      createSpecificationGroup,
      createSpecifications,
      setupCarriers,
      setupDocks,
      setupWarehouses,
      storeInVbase,
    ],
  },
})
