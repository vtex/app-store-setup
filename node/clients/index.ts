import { IOClients } from '@vtex/api'

import Catalog from './catalog'
import Logistics from './logistics'
import LicenseManager from './licensemanager'

export class Clients extends IOClients {
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get logistics() {
    return this.getOrSet('logistics', Logistics)
  }

  public get lm() {
    return this.getOrSet('licenseManager', LicenseManager)
  }
}
