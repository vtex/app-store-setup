interface SpecificationGroupInput {
  CategoryId: number
  Name: string
  Position?: number
}

interface SpecificationGroup extends SpecificationGroupInput {
  Id: number
}

interface BrandInput {
  Name: string
  Text: string
  Keywords: string
  SiteTitle: string
  MenuHome?: boolean
  Active: boolean
  AdWordsRemarketingCode?: string | null
  LomadeeCampaignCode?: string | null
  Score?: number | null
}

interface Brand extends BrandInput {
  Id: number
}

interface CategoryInput {
  Name: string
  Keywords: string
  Title?: string | null
  Description: string
  FatherCategoryId?: number | null
  GlobalCategoryId: number
  ShowInStoreFront: boolean
  IsActive: boolean
  ActiveStoreFrontLink: boolean
  ShowBrandFilter: boolean
  Score?: boolean | null
  AdWordsRemarketingCode?: string | null
  LomadeeCampaignCode?: string | null
  StockKeepingUnitSelectionMode: 'SPECIFICATION' | 'LIST' | 'COMBO' | 'RADIO'
}

interface Category extends CategoryInput {
  Id: number
}

interface SpecificationInput {
  FieldTypeId?: number
  CategoryId: number
  FieldGroupId: number
  Name: string
  Description: string
  Position?: number
  IsFilter?: boolean
  IsRequired?: boolean
  IsOnProductDetails?: boolean
  IsStockKeepingUnit?: boolean
  IsWizard?: boolean
  IsActive?: boolean
  IsTopMenuLinkActive?: boolean
  IsSideMenuLinkActive?: boolean
  DefaultValue: string
}

interface Specification extends SpecificationInput {
  Id: number
}

interface AttachmentInput {
  Name: string
  IsRequired: boolean
  IsActive: boolean
  Domains: AttachmentDomain[]
}

interface AttachmentDomain {
  FieldName: string
  MaxCaracters: string
  DomainValues: string
}

interface Attachment extends AttachmentInput {
  Id: number
}
