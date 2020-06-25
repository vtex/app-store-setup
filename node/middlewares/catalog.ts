import { DEFAULT_SPECIFICATIONS } from '../utils/constants'
import incrementState from '../utils/incrementState'

const SPECIFICATION_GROUP_NAME = 'AppsSpecifications'

export async function createBrand(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { lm, catalog },
    vtex: { account },
  } = ctx

  const brandId = await catalog
    .createBrand({
      Active: true,
      Keywords: account,
      Name: account,
      SiteTitle: account,
      Text: (await lm.getAccountInfo().then(({ name }) => name)) as string,
    })
    .then(({ Id }) => Id)

  incrementState(ctx, { brandId })
  next()
}

export async function createCategory(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { catalog },
  } = ctx

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

  incrementState(ctx, { categoryId })
  next()
}

export async function createSpecificationGroup(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    clients: { catalog },
    state: {
      body: { categoryId },
    },
  } = ctx

  const { Id: specificationGroupId } = await catalog.createSpecificationGroup({
    CategoryId: categoryId as number,
    Name: SPECIFICATION_GROUP_NAME,
    Position: 1,
  })

  incrementState(ctx, { specificationGroupId })
  next()
}

export async function createSpecifications(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    clients: { catalog },
    state: {
      body: { categoryId, specificationGroupId },
    },
  } = ctx

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

  incrementState(ctx, { specifications })
  next()
}
