import {
  InstanceOptions,
  IOContext,
  JanusClient,
  RequestTracingConfig,
} from '@vtex/api'

import { createTracing } from '../utils/tracing'

const routes = {
  base: () => 'api/catalog',
  brand: () => `${routes.base()}/pvt/brand`,
  category: () => `${routes.base()}/pvt/category`,
  specification: () => `${routes.base()}/pvt/specification`,
  specificationGroup: () => `${routes.base()}/pvt/specificationgroup`,
}

export default class Catalog extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        VtexIdclientAutCookie: ctx.authToken,
        ...options?.headers,
      },
    })
  }

  public createBrand(
    {
      Name,
      Text,
      Keywords,
      SiteTitle,
      Active = false,
      MenuHome = false,
      AdWordsRemarketingCode = null,
      LomadeeCampaignCode = null,
      Score = null,
    }: BrandInput,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-createBrand'
    return this.http.post<Brand>(
      routes.brand(),
      {
        Active,
        AdWordsRemarketingCode,
        Keywords,
        LomadeeCampaignCode,
        MenuHome,
        Name,
        Score,
        SiteTitle,
        Text,
      },
      {
        metric,
        tracing: createTracing(metric, tracingConfig),
      }
    )
  }

  public createCategory(
    {
      Name,
      FatherCategoryId = null,
      Title = null,
      Description,
      Keywords,
      IsActive,
      LomadeeCampaignCode = null,
      AdWordsRemarketingCode = null,
      ShowBrandFilter = true,
      ShowInStoreFront = true,
      ActiveStoreFrontLink = true,
      GlobalCategoryId,
      StockKeepingUnitSelectionMode,
      Score = null,
    }: CategoryInput,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-createCategory'
    return this.http.post<Category>(
      routes.category(),
      {
        ActiveStoreFrontLink,
        AdWordsRemarketingCode,
        Description,
        FatherCategoryId,
        GlobalCategoryId,
        IsActive,
        Keywords,
        LomadeeCampaignCode,
        Name,
        Score,
        ShowBrandFilter,
        ShowInStoreFront,
        StockKeepingUnitSelectionMode,
        Title,
      },
      {
        metric,
        tracing: createTracing(metric, tracingConfig),
      }
    )
  }

  public createSpecificationGroup(
    { CategoryId, Name, Position = 1 }: SpecificationGroupInput,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-createSpecificationGroup'
    return this.http.post<SpecificationGroup>(
      routes.specificationGroup(),
      {
        CategoryId,
        Name,
        Position,
      },
      {
        metric,
        tracing: createTracing(metric, tracingConfig),
      }
    )
  }

  public createSpecification(
    {
      FieldTypeId = 1,
      CategoryId,
      FieldGroupId,
      Name,
      Description,
      Position = 1,
      IsFilter = true,
      IsRequired = true,
      IsOnProductDetails = true,
      IsStockKeepingUnit = false,
      IsWizard = false,
      IsActive = true,
      IsTopMenuLinkActive = false,
      IsSideMenuLinkActive = true,
      DefaultValue,
    }: SpecificationInput,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-createSpecificationGroup'
    return this.http.post<Specification>(
      routes.specification(),
      {
        CategoryId,
        DefaultValue,
        Description,
        FieldGroupId,
        FieldTypeId,
        IsActive,
        IsFilter,
        IsOnProductDetails,
        IsRequired,
        IsSideMenuLinkActive,
        IsStockKeepingUnit,
        IsTopMenuLinkActive,
        IsWizard,
        Name,
        Position,
      },
      {
        metric,
        tracing: createTracing(metric, tracingConfig),
      }
    )
  }
}
