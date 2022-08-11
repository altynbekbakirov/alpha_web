export interface IProductRemains {
  item_code: string
  item_name: string
  item_group: string
  item_purchase_price: number
  item_sale_price: number
  item_purAmount: number
  item_salAmount: number
  item_salCurr: number
  item_onHand: number
  item_purchase_sum: number
  item_sale_sum: number
}

export interface IProductFiche {
  ficheNo: string
  date: string
  trCode: number | string
  net: number | string
  netTotal: number | string
  reportRate: number | string
}

export interface IFiche {
  code: string
  name: string
  count: number
  price: number
  priceUsd: number
  total: number
  totalUsd: number
  definition: string
}

export interface IProductPrice {
  item_row: number
  item_code: string
  item_name: string
  item_groupCode: string
  item_onHand: number
  item_unit: string
  item_price: number
}

export interface IProductPrices {
  code: string
  name: string
  definition: string
  ptype: number | string
  price: number
  currency: string
  begdate: string
  enddate: string
  active: number
}

export interface IProductTransaction {
  date: string
  ficheNo: string
  trCode: number
  clientCode: string | null
  clientName: string | null
  count: number
  price: number
  priceUsd: number
  total: number
  totalUsd: number
}

export interface IFooter {
  previous: () => void
  next: () => void
  canPrevious: boolean
  canNext: boolean
  pageIndex: number
  pageOptions: () => void
  gotoPage: (e: number) => void
  pageCount: number
  pageSize: number
  setPageSize: (e: number) => void
  rowCount: number
}

export interface ISearch {
  value: string
  change: (e: any) => string
}
