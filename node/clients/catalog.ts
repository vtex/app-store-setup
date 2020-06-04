import { InstanceOptions, IOContext, RequestTracingConfig } from '@vtex/api'

import { createTracing } from '../utils/tracing'
import VtexCommerce from './vtexcommerce'

const routes = {
  brand: () => `pvt/brand`,
  category: () => `pvt/category`,
  specificationGroup: () => `pvt/specificationgroup`,
  specification: () => `pvt/specification`,
}

export default class Catalog extends VtexCommerce {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, 'catalog', options)
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
        Name,
        Text,
        Keywords,
        SiteTitle,
        Active,
        MenuHome,
        AdWordsRemarketingCode,
        LomadeeCampaignCode,
        Score,
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
        Name,
        FatherCategoryId,
        Title,
        Description,
        Keywords,
        IsActive,
        LomadeeCampaignCode,
        AdWordsRemarketingCode,
        ShowBrandFilter,
        ShowInStoreFront,
        ActiveStoreFrontLink,
        GlobalCategoryId,
        StockKeepingUnitSelectionMode,
        Score,
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
        FieldTypeId,
        CategoryId,
        FieldGroupId,
        Name,
        Description,
        Position,
        IsFilter,
        IsRequired,
        IsOnProductDetails,
        IsStockKeepingUnit,
        IsWizard,
        IsActive,
        IsTopMenuLinkActive,
        IsSideMenuLinkActive,
        DefaultValue,
      },
      {
        metric,
        tracing: createTracing(metric, tracingConfig),
      }
    )
  }
}
