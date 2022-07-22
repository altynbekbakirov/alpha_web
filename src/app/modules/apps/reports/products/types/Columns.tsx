import {useIntl} from 'react-intl'
import {Column} from 'react-table'
import {IProductFiche, IProductPrice, IProductRemains} from '../models/products_model'

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
      switch (value) {
        case 'ЗИМА':
          return <div className='badge badge-info fw-bolder'>{value}</div>
        case 'ЛЕТО':
          return <div className='badge badge-warning fw-bolder'>{value}</div>
        case 'ДЕТСКОЕ':
          return <div className='badge badge-success fw-bolder'>{value}</div>
        case 'ДЖИНСА':
          return <div className='badge badge-danger fw-bolder'>{value}</div>
        default:
          return <div className='badge badge-light fw-bolder'>{value}</div>
      }
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

export const PRODUCTS_FICHE_COLUMNS: ReadonlyArray<Column<IProductFiche>> = [
  {
    Header: 'TR_CODE',
    accessor: 'item_trCode',
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      const intl = useIntl()
      switch (value) {
        case 1:
          return (
            <div className='badge badge-primary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_PURCHASE',
            })}`}</div>
          )
        case 2:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_RETAIL_RETURN',
            })}`}</div>
          )
        case 3:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_WHOLESALE_RETURN',
            })}`}</div>
          )
        case 4:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_CONSIGNMENT_RETURN_RECEIPT',
            })}`}</div>
          )
        case 5:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_CONSIGNMENT_RECEIPT',
            })}`}</div>
          )
        case 6:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_PURCHASE_RETURN',
            })}`}</div>
          )
        case 7:
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_RETAIL_SALE',
            })}`}</div>
          )
        case 8:
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_WHOLESALE',
            })}`}</div>
          )
        case 9:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_CONSIGNMENT',
            })}`}</div>
          )
        case 10:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_CONSIGNEMT_RETURN',
            })}`}</div>
          )
        case 11:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_SCRAPT',
            })}`}</div>
          )
        case 12:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_USAGE',
            })}`}</div>
          )
        case 13:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_INPUT_PRODUCTION',
            })}`}</div>
          )
        case 14:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_OPENNING',
            })}`}</div>
          )
        case 25:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_WAREHOUSE',
            })}`}</div>
          )
        case 26:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_PRODUCER',
            })}`}</div>
          )
        case 50:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_COUNT_EXCESS',
            })}`}</div>
          )
        case 51:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_COUNT_DEFICIT',
            })}`}</div>
          )
      }
    },
  },
  {
    Header: 'FICHE_NO',
    accessor: 'item_ficheNo',
  },
  {
    Header: 'DATE',
    accessor: 'item_date',
    Cell: ({value}) => {
      return <div className='badge badge-light fw-bolder'>{value}</div>
    },
  },
  {
    Header: 'CLIENT_CODE',
    accessor: 'item_clientCode',
  },
  {
    Header: 'CLIENT_NAME',
    accessor: 'item_clientName',
  },
  {
    Header: 'PRODUCT_GROSS',
    accessor: 'item_gross',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    },
  },
  {
    Header: 'PRODUCT_DISCOUNTS',
    accessor: 'item_discounts',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
  },
  {
    Header: 'PRODUCT_EXPENSES',
    accessor: 'item_expenses',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    },
  },
  {
    Header: 'PRODUCT_NET',
    accessor: 'item_net',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    },
  },
]

export const PRODUCTS_PRICE_COLUMNS: ReadonlyArray<Column<IProductPrice>> = [
  {
    Header: 'PRODUCT_ROW',
    accessor: 'item_row',
  },
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
    accessor: 'item_groupCode',
    Cell: ({value}) => {
      return <div className='badge badge-light fw-bolder'>{value}</div>
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
    Header: 'PRODUCT_GROUP',
    accessor: 'item_unit',
  },
  {
    Header: 'PRODUCT_SALE_PRICE',
    accessor: 'item_price',
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
