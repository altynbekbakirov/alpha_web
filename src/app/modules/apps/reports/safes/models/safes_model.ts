export interface ISafe {
  code: string
  name: string
  definition: string
  balance: number | string
  balanceUsd: number | string
}

export interface ISafeExtract {
  date: string
  ficheNo: string
  title: string
  definition: string;
  trCode: number | string  
  net: number | string
  netUsd: number | string
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
