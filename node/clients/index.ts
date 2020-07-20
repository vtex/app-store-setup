import { IOClients } from '@vtex/api'

import AppStoreSeller from './appstoreseller'
import Catalog from './catalog'
import LicenseManager from './licensemanager'
import Logistics from './logistics'

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

  public get appStoreSellers() {
    return this.getOrSet('appStoreSellers', AppStoreSeller)
  }
}
