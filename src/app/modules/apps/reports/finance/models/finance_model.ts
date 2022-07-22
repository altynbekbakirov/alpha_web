export interface IFinanceCustomer {
  code: number;
  name: string;
  address: string;
  phone: string | null;
  debit: number; 
  credit: number;
  balance: number;
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
    value: string;
    change: (e: any) => string
  }