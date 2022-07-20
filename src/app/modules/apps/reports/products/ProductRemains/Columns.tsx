import {Column} from 'react-table'
import {IProductRemains} from '../models/remains_model'

export const PRODUCTS_REMAINS_COLUMNS: ReadonlyArray<Column<IProductRemains>> = [
  {
    Header: 'PRODUCT_CODE',
    accessor: 'item_code',
  },
  {
    Header: 'PRODUCT_NAME',
    accessor: 'item_name',
  },
  {
    Header: 'PRODUCT_GROUP',
    accessor: 'item_group',
    Cell: ({value}) => {
      return <div className='badge badge-light fw-bolder'>{value}</div>
    },
  },
  {
    Header: 'PRODUCT_PURCHASE_PRICE',
    accessor: 'item_purchase_price',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    },
  },
  {
    Header: 'PRODUCT_SALE_PRICE',
    accessor: 'item_sale_price',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    },
  },
  {
    Header: 'PRODUCT_PURCHASE_COUNT',
    accessor: 'item_purAmount',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
  },  
  {
    Header: 'PRODUCT_SALE_COUNT',
    accessor: 'item_salAmount',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
  },
  {
    Header: 'PRODUCT_SALE_TOTAL',
    accessor: 'item_salCurr',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    },
  },
  {
    Header: 'PRODUCT_ON_HAND',
    accessor: 'item_onHand',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value > 0 ? (
        <div className='badge badge-success fw-bolder'>{value}</div>
      ) : value === 0 ? (
        <div className='badge badge-warning fw-bolder'>{value}</div>
      ) : (
        <div className='badge badge-danger fw-bolder'>{value}</div>
      )
    },
  },
  {
    Header: 'PRODUCT_PURCHASE_SUM',
    accessor: 'item_purchase_sum',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    },
  },
  {
    Header: 'PRODUCT_SALE_SUM',
    accessor: 'item_sale_sum',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    },
  },
]

export const PRODUCTS_REMAINS_GROUPED_COLUMNS: Column[] = [
  {
    Header: 'userId',
    columns: [
      {
        Header: 'userId',
        accessor: 'userId',
      },
      {
        Header: 'Id',
        accessor: 'id',
      },
    ],
  },
  {
    Header: 'Name',
    columns: [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Description',
        accessor: 'body',
      },
    ],
  },
]

function compareNumericString(rowA: any, rowB: any, id: number, desc: string) {
  let a = Number.parseFloat(rowA.values[id])
  let b = Number.parseFloat(rowB.values[id])
  if (Number.isNaN(a)) {
    // Blanks and non-numeric strings to bottom
    a = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY
  }
  if (Number.isNaN(b)) {
    b = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY
  }
  if (a > b) return 1
  if (a < b) return -1
  return 0
}
