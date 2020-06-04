import { DEFAULT_SPECIFICATIONS } from '../utils/constants'

const SPECIFICATION_GROUP_NAME = 'AppsSpecifications'

export const createBrand = async (state: SetupState) => {
  const {
    ctx: {
      clients: { lm, catalog },
      vtex: { account },
    },
  } = state

  const brandId = await catalog
    .createBrand({
      Active: true,
      Keywords: account,
      Name: account,
      SiteTitle: account,
      Text: (await lm.getAccountInfo().then(({ name }) => name)) as string,
    })
    .then(({ Id }) => Id)

  return {
    ...state,
    brandId,
  } as SetupState
}

export const createCategory = async (state: SetupState) => {
  const {
    ctx: {
      clients: { catalog },
    },
  } = state

  const categoryId = await catalog
    .createCategory({
      ActiveStoreFrontLink: true,
      Description: 'Apps published on VTEX App Store',
      GlobalCategoryId: 313,
      IsActive: true,
      Keywords: 'apps',
      Name: 'Apps',
      ShowBrandFilter: true,
      ShowInStoreFront: true,
      StockKeepingUnitSelectionMode: 'SPECIFICATION',
    })
    .then(({ Id }) => Id)

  return {
    ...state,
    categoryId,
  } as SetupState
}

export const createSpecificationGroup = async (state: SetupState) => {
  const {
    ctx: {
      clients: { catalog },
    },
    categoryId,
  } = state

  const { Id: specificationGroupId } = await catalog.createSpecificationGroup({
    CategoryId: categoryId as number,
    Name: SPECIFICATION_GROUP_NAME,
    Position: 1,
  })

  return {
    ...state,
    specificationGroupId,
  } as SetupState
}

export const createSpecifications = async (state: SetupState) => {
  const {
    ctx: {
      clients: { catalog },
    },
    categoryId,
    specificationGroupId,
  } = state

  const specifications = await Promise.all(
    DEFAULT_SPECIFICATIONS.map(specification =>
      catalog
        .createSpecification({
          ...specification,
          CategoryId: categoryId as number,
          FieldGroupId: specificationGroupId as number,
        })
        .then(({ Id, Name }) => ({ name: Name, id: Id }))
    )
  )

  return {
    ...state,
    specifications,
  } as SetupState
}
