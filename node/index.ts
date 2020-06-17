import {
  ClientsConfig,
  ParamsContext,
  RecorderState,
  Service,
  ServiceContext,
} from '@vtex/api'

import { Clients } from './clients'
import { configuration } from './handlers/configuration'
import { setup } from './handlers/setup'

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
    configuration,
    setup,
  },
})
