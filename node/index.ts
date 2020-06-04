import {
  ClientsConfig,
  Service,
  ServiceContext,
  RecorderState,
  ParamsContext,
} from '@vtex/api'

import { Clients } from './clients'
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
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
  }
}

export default new Service<Clients, State, ParamsContext>({
  clients,
  routes: {
    setup,
  },
})
