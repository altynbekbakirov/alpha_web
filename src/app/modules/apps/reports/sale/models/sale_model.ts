export interface ISaleFiche {
  id: number | string
  trCode: number | string
  ficheNo: string
  date: string
  clientCode: string | null
  clientName: string | null
  managerCode: string | null
  managerName: string | null
  gross: number
  discounts: number
  expenses: number
  net: number
  netUsd: number
}

export interface ISaleFiches {
  id: number | string
  trCode: number | string
  ficheNo: string
  date: string
  clientCode: string | null
  clientName: string | null
  gross: number
  discounts: number
  expenses: number
  net: number
  netUsd: number
}

export interface ISaleClient {
  clientCode: string
  clientName: string
  itemAmount: number
  itemTotal: number
  itemTotalUsd: number
  itemAmountRet: number
  itemTotalRet: number
  itemTotalUsdRet: number
}

export interface ISaleClientTop {
  clientCode: string
  clientName: string
  itemAmount: number
  itemTotal: number
  itemTotalUsd: number
  itemAmountRet: number
  itemTotalRet: number
  itemTotalUsdRet: number
}

export interface ISaleMonth {
  code: string
  name: number
  groupCode: string
  jan: number
  feb: number
  mar: number
  apr: number
  may: number
  jun: number
  jul: number
  aug: number
  sep: number
  oct: number
  nov: number
  dec: number
  totalCount: number
  totalSum: number
  totalUsd: number
}

export interface ISaleTotal {
  code: string
  name: string
  group: string
  purchaseCount: number
  purchaseTotal: number
  purchaseTotalUsd: number
  saleCount: number
  saleTotal: number
  saleTotalUsd: number
}

export interface ISaleManager {
  clientCode: string
  clientName: string
  itemAmount: number
  itemTotal: number
  itemTotalUsd: number
  itemAmountRet: number
  itemTotalRet: number
  itemTotalUsdRet: number
}

export interface ISaleWare {
  wareCode: string
  wareName: string
  itemAmount: number
  itemTotal: number
  itemTotalUsd: number
  itemAmountRet: number
  itemTotalRet: number
  itemTotalUsdRet: number
}

export interface ISaleTable {
  date: number | string
  total: number
  expenses: number
  discounts: number
  net: number
  net_usd: number
  ret_total: number
  ret_total_usd: number
}

export interface ISaleDaily {
  date: string
  net: number
  net_usd: number
  ret_total: number
  ret_total_usd: number
  trCode: number
}

export interface ISaleDetail {
  code: string
  name: string
  itemGroup: string
  retCount: number
  retTotal: number
  retCost: number
  saleCount: number
  saleTotal: number
  saleCost: number
  profitTotal: number
  profitPercent: number
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
