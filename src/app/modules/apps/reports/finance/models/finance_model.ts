export interface IFinanceCustomer {
  id: number
  code: string
  name: string
  address: string
  phone: string | null
  debit: number
  credit: number
  balance: number
  debitUsd: number
  creditUsd: number
  balanceUsd: number
}

export interface IFinanceExtract {
  code: string
  name: string
  date: string
  trcode: number
  ficheno: string
  description: string
  debit: number
  credit: number
  balance: number
  balanceBefore: number
}

export interface IFinanceDebit {
  id: number
  code: string
  name: string
  address: string
  phone: string | null
  debit: number
  credit: number
  balance: number
  debitUsd: number
  creditUsd: number
  balanceUsd: number
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
