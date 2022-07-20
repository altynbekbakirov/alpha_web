export interface IProductRemains {
    item_code: string;
    item_name: string;
    item_group: string;
    item_purchase_price: number;
    item_sale_price: number;
    item_purAmount: number;
    item_salAmount: number;
    item_salCurr: number; 
    item_onHand: number;
    item_purchase_sum: number;
    item_sale_sum: number;
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