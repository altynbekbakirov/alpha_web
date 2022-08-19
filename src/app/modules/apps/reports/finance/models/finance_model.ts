export interface IFinanceCustomer {
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
  trcode: number | string
  ficheno: string
  description: string
  debit: number
  credit: number
  balance: number
  balanceBefore: number
}

export interface IFinanceDebit {
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

export interface IFinanceFiche {
  date: string
  ficheNo:string
  trCode: number | string
  debit: number | string
  credit: number | string
  repDebit: number | string
  repCredit: number | string
  definition: string
}

export interface IFiche {
  code: string
  name: string
  debit: number | string
  debitUsd: number | string
  credit: number | string
  creditUsd: number | string
  definition: string
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
