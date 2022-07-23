export interface IPurchaseFiche {
  trCode: number;
  ficheNo: string;
  date: string;
  clientCode: string | null;
  clientName: string | null;
  gross: number;
  discounts: number;
  expenses: number; 
  net: number;
  netUsd: number;
}

export interface IPurchaseClient {
  clientCode: string;
  clientName: string;
  itemCode: string;
  itemName: string;
  itemGroup: string;
  itemAmount: number;
  itemTotal: number; 
  itemTotalUsd: number; 
  itemAmountRet: number; 
  itemTotalRet: number; 
  itemTotalUsdRet: number; 
}

export interface IPurchaseMonth {
  code: string;
  name: string;
  groupCode: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number; 
  may: number; 
  jun: number; 
  jul: number; 
  aug: number; 
  sep: number; 
  oct: number; 
  nov: number; 
  dec: number; 
  totalCount: number; 
  totalSum: number; 
  totalUsd: number; 
}

export interface IPurchaseTotal {
  code: string;
  name: string;
  group: string;
  purchaseCount: number;
  purchaseTotal: number;
  purchaseTotalUsd: number;
  saleCount: number;
  saleTotal: number;
  saleTotalUsd: number;
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