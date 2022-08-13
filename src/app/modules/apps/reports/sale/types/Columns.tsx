import {useIntl} from 'react-intl'
import {Column} from 'react-table'
import {
  ISaleClient,
  ISaleDaily,
  ISaleDetail,
  ISaleFiche,
  ISaleManager,
  ISaleMonth,
  ISaleTable,
  ISaleTotal,
} from '../models/sale_model'

export const SALE_FICHE_COLUMNS: ReadonlyArray<Column<ISaleFiche>> = [
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
      value < 0 ? (value = -value) : (value = +value)
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
  },
  {
    Header: 'PRODUCT_EXPENSES',
    accessor: 'expenses',
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
    Header: 'PRODUCT_NET',
    accessor: 'net',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
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
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
]

export const SALE_CLIENT_COLUMNS: ReadonlyArray<Column<ISaleClient>> = [
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
    Header: 'PRODUCT_SALE_COUNT',
    accessor: 'itemAmount',
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
    accessor: 'itemTotal',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_SALE_TOTAL_USD',
    accessor: 'itemTotalUsd',
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
  {
    Header: 'PRODUCT_RETURN_COUNT',
    accessor: 'itemAmountRet',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_RETURN_TOTAL',
    accessor: 'itemTotalRet',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_RETURN_TOTAL_USD',
    accessor: 'itemTotalUsdRet',
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

export const SALE_MONTH_COLUMNS: ReadonlyArray<Column<ISaleMonth>> = [
  {
    Header: 'PRODUCTS',
    columns: [
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
    ],
  },
  {
    Header: 'MONTH',
    columns: [
      {
        Header: 'JANUARY',
        accessor: 'jan',
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
        Header: 'FEBRUARY',
        accessor: 'feb',
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
        Header: 'MARCH',
        accessor: 'mar',
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
        Header: 'APRIL',
        accessor: 'apr',
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
        Header: 'MAY',
        accessor: 'may',
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
        Header: 'JUNE',
        accessor: 'jun',
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
        Header: 'JULY',
        accessor: 'jul',
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
        Header: 'AUGUST',
        accessor: 'aug',
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
        Header: 'SEPTEMBER',
        accessor: 'sep',
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
        Header: 'OCTOBER',
        accessor: 'oct',
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
        Header: 'NOVEMBER',
        accessor: 'nov',
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
        Header: 'DECEMBER',
        accessor: 'dec',
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
    ],
  },
  {
    Header: 'TOTAL_NUMBER',
    columns: [
      {
        Header: 'TOTAL_COUNT',
        accessor: 'totalCount',
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
        Header: 'TOTAL_SUM',
        accessor: 'totalSum',
        //@ts-expect-error
        disableGlobalFilter: true,
        sortType: compareNumericString,
        Cell: ({value}) => {
          value < 0 ? (value = -value) : (value = +value)
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
          value < 0 ? (value = -value) : (value = +value)
          return value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        },
      },
    ],
  },
]

export const SALE_TOTAL_COLUMNS: ReadonlyArray<Column<ISaleTotal>> = [
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
        maximumFractionDigits: 2,
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
        maximumFractionDigits: 2,
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
        maximumFractionDigits: 2,
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
        maximumFractionDigits: 2,
      })
    },
  },
]

export const SALE_MANAGER_COLUMNS: ReadonlyArray<Column<ISaleManager>> = [
  {
    Header: 'CLIENT_CODE',
    accessor: 'clientCode',
  },
  {
    Header: 'CLIENT_NAME',
    accessor: 'clientName',
  },
  {
    Header: 'PRODUCT_SALE_COUNT',
    accessor: 'itemAmount',
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
    Header: 'PRODUCT_SALE_TOTAL',
    accessor: 'itemTotal',
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
    Header: 'PRODUCT_SALE_TOTAL_USD',
    accessor: 'itemTotalUsd',
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
  {
    Header: 'PRODUCT_RETURN_COUNT',
    accessor: 'itemAmountRet',
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
    Header: 'PRODUCT_RETURN_TOTAL',
    accessor: 'itemTotalRet',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_RETURN_TOTAL_USD',
    accessor: 'itemTotalUsdRet',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
]

export const SALE_TABLE_COLUMNS: ReadonlyArray<Column<ISaleTable>> = [
  {
    Header: 'MONTH_FULL',
    accessor: 'date',
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      const intl = useIntl()
      switch (value) {
        case '1':
          return (
            <div className='badge badge-info fw-bolder'>{`${intl.formatMessage({
              id: 'JANUARY_FULL',
            })}`}</div>
          )
        case '2':
          return (
            <div className='badge badge-info fw-bolder'>{`${intl.formatMessage({
              id: 'FEBRUARY_FULL',
            })}`}</div>
          )
        case '3':
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'MARCH_FULL',
            })}`}</div>
          )
        case '4':
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'APRIL_FULL',
            })}`}</div>
          )
        case '5':
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'MAY_FULL',
            })}`}</div>
          )
        case '6':
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'JUNE_FULL',
            })}`}</div>
          )
        case '7':
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'JULY_FULL',
            })}`}</div>
          )
        case '8':
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'AUGUST_FULL',
            })}`}</div>
          )
        case '9':
          return (
            <div className='badge badge-primary fw-bolder'>{`${intl.formatMessage({
              id: 'SEPTEMBER_FULL',
            })}`}</div>
          )
        case '10':
          return (
            <div className='badge badge-primary fw-bolder'>{`${intl.formatMessage({
              id: 'OCTOBER_FULL',
            })}`}</div>
          )
        case '11':
          return (
            <div className='badge badge-primary fw-bolder'>{`${intl.formatMessage({
              id: 'NOVEMBER_FULL',
            })}`}</div>
          )
        case '12':
          return (
            <div className='badge badge-info fw-bolder'>{`${intl.formatMessage({
              id: 'DECEMBER_FULL',
            })}`}</div>
          )
      }
    },
  },
  {
    Header: 'PRODUCT_SALE_TOTAL',
    accessor: 'total',
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
    Header: 'PRODUCT_EXPENSES',
    accessor: 'expenses',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
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
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
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
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_NET_USD',
    accessor: 'net_usd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_RETURN_TOTAL',
    accessor: 'ret_total',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_RETURN_TOTAL_USD',
    accessor: 'ret_total_usd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
]

export const SALE_DAILY_COLUMNS: ReadonlyArray<Column<ISaleDaily>> = [
  {
    Header: 'DATE',
    accessor: 'date',
  },
  {
    Header: 'PRODUCT_SALE_TOTAL',
    accessor: 'net',
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
    Header: 'PRODUCT_SALE_TOTAL_USD',
    accessor: 'net_usd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_RETURN_TOTAL',
    accessor: 'ret_total',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_RETURN_TOTAL_USD',
    accessor: 'ret_total_usd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
]

export const SALE_DETAIL_COLUMNS: ReadonlyArray<Column<ISaleDetail>> = [
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
    accessor: 'itemGroup',
  },
  {
    Header: 'PRODUCT_RETURN_COUNT',
    accessor: 'retCount',
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
    Header: 'PRODUCT_RETURN_TOTAL',
    accessor: 'retTotal',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_RETURN_COST',
    accessor: 'retCost',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
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
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_SALE_COST',
    accessor: 'saleCost',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_PROFIT_TOTAL',
    accessor: 'profitTotal',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    Header: 'PRODUCT_PROFIT_PERCENT',
    accessor: 'profitPercent',
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
