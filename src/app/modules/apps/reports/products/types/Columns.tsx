import {useIntl} from 'react-intl'
import {Column} from 'react-table'
import {
  IFiche,
  IProductFiche,
  IProductPrice,
  IProductPrices,
  IProductRemains,
  IProductTransaction,
} from '../models/products_model'

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
      return value
        ? value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'PRODUCT_SALE_PRICE',
    accessor: 'item_sale_price',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'PRODUCT_PURCHASE_COUNT',
    accessor: 'item_purAmount',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'PRODUCT_SALE_COUNT',
    accessor: 'item_salAmount',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'PRODUCT_SALE_TOTAL',
    accessor: 'item_salCurr',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'PRODUCT_ON_HAND',
    accessor: 'item_onHand',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value ? (
        value > 0 ? (
          <div className='badge badge-success fw-bolder'>
            {value.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </div>
        ) : value === 0 ? (
          <div className='badge badge-warning fw-bolder'>
            {value.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </div>
        ) : (
          <div className='badge badge-danger fw-bolder'>
            {value.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </div>
        )
      ) : (
        <div className='badge badge-danger fw-bolder'>0</div>
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
      return value
        ? value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'PRODUCT_SALE_SUM',
    accessor: 'item_sale_sum',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
]

export const PRODUCTS_FICHE_COLUMNS: ReadonlyArray<Column<IProductFiche>> = [
  {
    Header: 'PRODUCT_ROW',
    accessor: 'id',
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
        default:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_OTHERS',
            })}`}</div>
          )
      }
    },
  },
  {
    Header: 'TOTAL',
    accessor: 'net',
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'TOTAL_SUM',
    accessor: 'netTotal',
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'CURRENCY_RATE',
    accessor: 'reportRate',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
]

export const PRODUCTS_FICHE: ReadonlyArray<Column<IFiche>> = [
  {
    Header: 'PRODUCT_CODE',
    accessor: 'code',
  },
  {
    Header: 'PRODUCT_NAME',
    accessor: 'name',
  },
  {
    Header: 'PRODUCT_COUNT',
    accessor: 'count',
  },
  {
    Header: 'PRODUCT_PRICE',
    accessor: 'price',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'PRODUCT_PRICE_USD',
    accessor: 'priceUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'PRODUCT_TOTAL',
    accessor: 'total',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'PRODUCT_TOTAL_USD',
    accessor: 'totalUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'PRODUCT_DEFINITION',
    accessor: 'definition',
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
    Header: 'PRODUCT_ON_HAND',
    accessor: 'item_onHand',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value ? (
        value > 0 ? (
          <div className='badge badge-success fw-bolder'>{value}</div>
        ) : value === 0 ? (
          <div className='badge badge-warning fw-bolder'>{value}</div>
        ) : (
          <div className='badge badge-danger fw-bolder'>{value}</div>
        )
      ) : (
        <div className='badge badge-danger fw-bolder'>0</div>
      )
    },
  },
  {
    Header: 'PRODUCT_UNIT',
    accessor: 'item_unit',
  },
  {
    Header: 'PRODUCT_SALE_PRICE',
    accessor: 'item_price',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
]

export const PRODUCTS_PRICES_COLUMNS: ReadonlyArray<Column<IProductPrices>> = [
  {
    Header: 'PRODUCT_CODE',
    accessor: 'code',
  },
  {
    Header: 'PRODUCT_NAME',
    accessor: 'name',
  },
  {
    Header: 'PRODUCT_DEFINITION',
    accessor: 'definition',
  },
  {
    Header: 'PRODUCT_PRICE_TYPE',
    accessor: 'ptype',
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      const intl = useIntl()
      return value ? (
        value === 1 ? (
          <div className='badge badge-info fw-bolder'>{`${intl.formatMessage({
            id: 'PRODUCT_PRICE_TYPE_PURCHASE',
          })}`}</div>
        ) : (
          <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
            id: 'PRODUCT_PRICE_TYPE_SALE',
          })}`}</div>
        )
      ) : (
        ''
      )
    },
  },
  {
    Header: 'PRODUCT_PRICE',
    accessor: 'price',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'CURRENCY',
    accessor: 'currency',
  },
  {
    Header: 'BEGDATE',
    accessor: 'begdate',
    //@ts-expect-error
    disableGlobalFilter: true,
  },
  {
    Header: 'ENDDATE',
    accessor: 'enddate',
    //@ts-expect-error
    disableGlobalFilter: true,
  },
  {
    Header: 'ACTIVE',
    accessor: 'active',
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      const intl = useIntl()
      return value === 0 ? (
        <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({id: 'YES'})}`}</div>
      ) : (
        <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({id: 'NO'})}`}</div>
      )
    },
  },
]

export const PRODUCTS_TRANSACTIONS_COLUMNS: ReadonlyArray<Column<IProductTransaction>> = [
  {
    Header: 'DATE',
    accessor: 'date',
  },
  {
    Header: 'FICHE_NO',
    accessor: 'ficheNo',
  },
  {
    Header: 'TR_CODE',
    accessor: 'trCode',
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
        default:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_OTHERS',
            })}`}</div>
          )
      }
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
    Header: 'PRODUCT_COUNT',
    accessor: 'count',
    //@ts-expect-error
    disableGlobalFilter: true,
  },
  {
    Header: 'PRODUCT_PRICE',
    accessor: 'price',
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'PRODUCT_PRICE_USD',
    accessor: 'priceUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'PRODUCT_TOTAL',
    accessor: 'total',
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
    },
  },
  {
    Header: 'PRODUCT_TOTAL_USD',
    accessor: 'totalUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
        : 0
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
