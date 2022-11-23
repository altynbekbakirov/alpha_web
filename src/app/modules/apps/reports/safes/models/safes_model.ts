export interface ISafe {
  code: string
  name: string
  definition: string
  balance: number | string
  balanceUsd: number | string
}

export interface ISafeExtract {
  date: string
  safe_: string
  ficheNo: string
  title: string
  definition: string;
  trCode: number | string  
  collection: number
  collectionUsd: number
  payment: number
  paymentUsd: number
}

export interface ISafeResume {
  month: number | string
  debit: number | string
  credit: number | string
  total: number | string
  debitUsd: number | string
  creditUsd: number | string
  totalUsd: number | string
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
