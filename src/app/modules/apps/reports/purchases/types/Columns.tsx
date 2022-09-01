import {useIntl} from 'react-intl'
import {Column} from 'react-table'
import {
  IFiche,
  IPurchaseClient,
  IPurchaseFiche,
  IPurchaseMonth,
  IPurchaseTotal,
} from '../models/purchases_model'

export const PURCHASES_FICHE_COLUMNS: ReadonlyArray<Column<IPurchaseFiche>> = [
  {
    Header: 'PRODUCT_ROW',
    accessor: 'id',
  },
  {
    Header: 'TR_CODE',
    accessor: 'trCode',
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
    accessor: 'ficheNo',
  },
  {
    Header: 'DATE',
    accessor: 'date',
    Cell: ({value}) => {
      return <div className='badge badge-light fw-bolder'>{value}</div>
    },
  },
  {
    Header: 'CLIENT_CODE',
    accessor: 'clientCode',
  },
  {
    Header: 'CLIENT_NAME',
    accessor: 'clientName',
  },
  {
    Header: 'PRODUCT_GROSS',
    accessor: 'gross',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_DISCOUNTS',
    accessor: 'discounts',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value === 0
        ? (value = '')
        : value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
    },
  },
  {
    Header: 'PRODUCT_EXPENSES',
    accessor: 'expenses',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value === 0
        ? (value = '')
        : value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
    },
  },
  {
    Header: 'PRODUCT_NET',
    accessor: 'net',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value === 0
        ? (value = '')
        : value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
    },
  },
  {
    Header: 'PRODUCT_NET_USD',
    accessor: 'netUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value === 0
        ? (value = '')
        : value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
    },
  },
]

export const PURCHASES_FICHE: ReadonlyArray<Column<IFiche>> = [
  {
    Header: 'PRODUCT_CODE',
    accessor: 'code',
  },
  {
    Header: 'PRODUCT_NAME',
    accessor: 'name',
  },
  {
    Header: 'DATE',
    accessor: 'date',
  },
  {
    Header: 'PRODUCT_COUNT',
    accessor: 'count',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
  },
  {
    Header: 'PRODUCT_UNIT',
    accessor: 'unit',
  },
  {
    Header: 'PRODUCT_PRICE',
    accessor: 'price',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
  },
  {
    Header: 'PRODUCT_TOTAL',
    accessor: 'total',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
  },
  {
    Header: 'PRODUCT_PRICE_USD',
    accessor: 'priceUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
  },
  {
    Header: 'PRODUCT_TOTAL_USD',
    accessor: 'totalUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
  },
]

export const PURCHASES_CLIENT_COLUMNS: ReadonlyArray<Column<IPurchaseClient>> = [
  {
    Header: 'CLIENT_CODE',
    accessor: 'clientCode',
  },
  {
    Header: 'CLIENT_NAME',
    accessor: 'clientName',
  },
  {
    Header: 'PRODUCT_CODE',
    accessor: 'itemCode',
  },
  {
    Header: 'PRODUCT_NAME',
    accessor: 'itemName',
  },
  {
    Header: 'PRODUCT_GROUP',
    accessor: 'itemGroup',
    // Cell: ({value}) => {
    //   switch (value.toUpperCase()) {
    //     case 'ЗИМА':
    //       return <div className='badge badge-info fw-bolder'>{value}</div>
    //     case 'ЛЕТО':
    //       return <div className='badge badge-warning fw-bolder'>{value}</div>
    //     case 'ДЕТСКОЕ':
    //       return <div className='badge badge-success fw-bolder'>{value}</div>
    //     case 'ДЖИНСА':
    //       return <div className='badge badge-danger fw-bolder'>{value}</div>
    //     default:
    //       return <div className='badge badge-light fw-bolder'>{value}</div>
    //   }
    // },
  },
  {
    Header: 'PRODUCT_PURCHASE_COUNT',
    accessor: 'itemAmount',
    //@ts-expect-error
    aggregate: 'sum',
    Aggregated: ({value}: any) =>
      `${value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}`,
    disableGlobalFilter: true,
    sortType: compareNumericString,
  },
  {
    Header: 'PRODUCT_PURCHASE_TOTAL',
    accessor: 'itemTotal',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    aggregate: 'sum',
    Aggregated: ({value}: any) =>
      `${value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}`,
  },
  {
    Header: 'PRODUCT_PURCHASE_TOTAL_USD',
    accessor: 'itemTotalUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    aggregate: 'sum',
    Aggregated: ({value}: any) =>
      `${value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}`,
  },
  {
    Header: 'PRODUCT_RETURN_COUNT',
    accessor: 'itemAmountRet',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    aggregate: 'sum',
    Aggregated: ({value}: any) =>
      `${value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}`,
  },
  {
    Header: 'PRODUCT_RETURN_TOTAL',
    accessor: 'itemTotalRet',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    aggregate: 'sum',
    Aggregated: ({value}: any) =>
      `${value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}`,
  },
  {
    Header: 'PRODUCT_RETURN_TOTAL_USD',
    accessor: 'itemTotalUsdRet',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    aggregate: 'sum',
    Aggregated: ({value}: any) =>
      `${value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}`,
  },
]

export const PURCHASES_MONTH_COLUMNS: ReadonlyArray<Column<IPurchaseMonth>> = [
  {
    Header: 'PRODUCT_CODE',
    accessor: 'code',
  },
  {
    Header: 'PRODUCT_NAME',
    accessor: 'name',
  },
  {
    Header: 'PRODUCT_GROUP',
    accessor: 'groupCode',
    Cell: ({value}) => {
      switch (value.toUpperCase()) {
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
    Header: 'JANUARY',
    accessor: 'jan',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'FEBRUARY',
    accessor: 'feb',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'MARCH',
    accessor: 'mar',
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
    Header: 'APRIL',
    accessor: 'apr',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'MAY',
    accessor: 'may',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'JUNE',
    accessor: 'jun',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'JULY',
    accessor: 'jul',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'AUGUST',
    accessor: 'aug',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'SEPTEMBER',
    accessor: 'sep',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'OCTOBER',
    accessor: 'oct',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'NOVEMBER',
    accessor: 'nov',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'DECEMBER',
    accessor: 'dec',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'TOTAL_COUNT',
    accessor: 'totalCount',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'TOTAL_SUM',
    accessor: 'totalSum',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'TOTAL_SUM_USD',
    accessor: 'totalUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
]

export const PURCHASES_TOTAL_COLUMNS: ReadonlyArray<Column<IPurchaseTotal>> = [
  {
    Header: 'PRODUCT_CODE',
    accessor: 'code',
  },
  {
    Header: 'PRODUCT_NAME',
    accessor: 'name',
  },
  {
    Header: 'PRODUCT_GROUP',
    accessor: 'group',
  },
  {
    Header: 'PRODUCT_PURCHASE_COUNT',
    accessor: 'purchaseCount',
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
    Header: 'PRODUCT_PURCHASE_TOTAL',
    accessor: 'purchaseTotal',
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
    Header: 'PRODUCT_PURCHASE_TOTAL_USD',
    accessor: 'purchaseTotalUsd',
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
    Header: 'PRODUCT_SALE_COUNT',
    accessor: 'saleCount',
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
    Header: 'PRODUCT_SALE_TOTAL',
    accessor: 'saleTotal',
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
    Header: 'PRODUCT_SALE_TOTAL_USD',
    accessor: 'saleTotalUsd',
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
