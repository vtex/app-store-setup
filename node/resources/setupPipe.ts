import { pipeP } from '../utils/functionalUtils'
import {
  createBrand,
  createCategory,
  createSpecificationGroup,
  createSpecifications,
} from './catalog'
import { storeInVbase } from './configuration'
import { setupCarriers, setupDocks, setupWarehouses } from './logistics'

export const setupPipe = pipeP(
  createBrand,
  createCategory,
  createSpecificationGroup,
  createSpecifications,
  setupCarriers,
  setupDocks,
  setupWarehouses,
  storeInVbase
)
