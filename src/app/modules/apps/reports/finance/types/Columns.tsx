import {useIntl} from 'react-intl'
import {Column} from 'react-table'
import {
  IFiche,
  IFinanceAging,
  IFinanceCustomer,
  IFinanceDebit,
  IFinanceExtract,
  IFinanceFiche,
} from '../models/finance_model'

export const FINANCE_CUSTOMER_COLUMNS: ReadonlyArray<Column<IFinanceCustomer>> = [
  {
    Header: 'CLIENT_CODE',
    accessor: 'code',
  },
  {
    Header: 'CLIENT_NAME',
    accessor: 'name',
  },
  {
    Header: 'CLIENT_ADDRESS',
    accessor: 'address',
  },
  {
    Header: 'CLIENT_PHONE',
    accessor: 'phone',
  },
  {
    Header: 'CLIENT_DEBIT',
    accessor: 'debit',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-light fw-bolder`}>
          {value
            ? value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_CREDIT',
    accessor: 'credit',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-light fw-bolder`}>
          {value
            ? value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_BALANCE',
    accessor: 'balance',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div
          className={`badge ${
            value > 0 ? 'badge-danger' : value < 0 ? 'badge-info' : 'badge-secondary'
          } fw-bolder`}
        >
          {value
            ? value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_DEBIT_USD',
    accessor: 'debitUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-light fw-bolder`}>
          {value
            ? value.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_CREDIT_USD',
    accessor: 'creditUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-light fw-bolder`}>
          {value
            ? value.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_BALANCE_USD',
    accessor: 'balanceUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div
          className={`badge ${
            value > 0 ? 'badge-danger' : value < 0 ? 'badge-info' : 'badge-secondary'
          } fw-bolder`}
        >
          {' '}
          {value
            ? value.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      )
    },
  },
]

export const FINANCE_AGING_COLUMNS: ReadonlyArray<Column<IFinanceAging>> = [
  {
    Header: 'CLIENT_CODE',
    accessor: 'code',
  },
  {
    Header: 'CLIENT_NAME',
    accessor: 'name',
  },
  {
    Header: 'CLIENT_PHONE',
    accessor: 'phone',
  },
  {
    Header: 'CLIENT_BALANCE',
    accessor: 'balance',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div
          className={`badge ${
            value > 0 ? 'badge-danger' : value < 0 ? 'badge-info' : 'badge-secondary'
          } fw-bolder`}
        >
          {value
            ? value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_COLL1',
    accessor: 'payment1',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-secondary fw-bolder`}>
          {value
            ? value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_COLL2',
    accessor: 'payment2',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-secondary fw-bolder`}>
          {value
            ? value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_COLL4',
    accessor: 'payment4',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-secondary fw-bolder`}>
          {value
            ? value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_COLL5',
    accessor: 'payment5',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-secondary fw-bolder`}>
          {value
            ? value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_COLLECCTION_ALL',
    accessor: 'payment',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-success fw-bolder`}>
          {value
            ? value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_LAST_FINANCE_TRANSACTION',
    accessor: 'lastFinTrans',
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      return <div className={`badge badge-light fw-bolder`}>{value ? value : ''}</div>
    },
  },
  {
    Header: 'CLIENT_LAST_MATERIAL_TRANSACTION',
    accessor: 'lastMatTrans',
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      return <div className={`badge badge-light fw-bolder`}>{value ? value : ''}</div>
    },
  },
]

export const FINANCE_EXTRACT_COLUMNS: ReadonlyArray<Column<IFinanceExtract>> = [
  {
    Header: 'CLIENT_CODE',
    accessor: 'code',
  },
  {
    Header: 'CLIENT_NAME',
    accessor: 'name',
  },
  {
    Header: 'DATE',
    accessor: 'date',
    Cell: ({value}) => {
      return <div className='badge badge-secondary fw-bolder'>{value}</div>
    },
  },
  {
    Header: 'CLIENT_OPERATION_TYPE',
    accessor: 'trcode',
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      const intl = useIntl()
      switch (value) {
        case 1:
          return (
            <div className='badge badge-primary fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_CASH_COLLECTION',
            })}`}</div>
          )
        case 2:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_CASH_PAYMENT',
            })}`}</div>
          )
        case 3:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_DEBIT_NOTE',
            })}`}</div>
          )
        case 4:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_CREDIT_NOTE',
            })}`}</div>
          )
        case 5:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_PERMITTANCE_SLIP',
            })}`}</div>
          )
        case 6:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_EXCH_RATE_DIFF_TRANS',
            })}`}</div>
          )
        case 12:
          return (
            <div className='badge badge-light fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_SPECIAL_SLIP',
            })}`}</div>
          )
        case 14:
          return (
            <div className='badge badge-light fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_OPENNING_SLIP',
            })}`}</div>
          )
        case 31:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_PURCHASE_INVOICE',
            })}`}</div>
          )
        case 32:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_RETAIL_RETURN_INVOICE',
            })}`}</div>
          )
        case 33:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_TRADESMAN_INVOICE_RECEIVED',
            })}`}</div>
          )
        case 36:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_CUSTOMER_RETURN',
            })}`}</div>
          )
        case 37:
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_RETAIL_SALE',
            })}`}</div>
          )
        case 38:
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_WHOLESALE',
            })}`}</div>
          )
        case 39:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_TRADESMAN_INVOICE_ISSUED',
            })}`}</div>
          )
        default:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_OPERATION_OTHER',
            })}`}</div>
          )
      }
    },
  },
  {
    Header: 'CLIENT_FICHE_NO',
    accessor: 'ficheno',
    Cell: ({value}) => {
      return <div className='badge badge-secondary fw-bolder'>{value}</div>
    },
  },
  {
    Header: 'CLIENT_DESCRIPTION',
    accessor: 'description',
    Cell: ({value}) => {
      return <div className='badge badge-secondary fw-bolder'>{value}</div>
    },
  },
  {
    Header: 'CLIENT_DEBIT_PLUS',
    accessor: 'debit',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
        : 0
    },
  },
  {
    Header: 'CLIENT_DEBIT_MINUS',
    accessor: 'credit',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return value
        ? value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
        : 0
    },
  },
  {
    Header: 'CLIENT_BALANCE',
    accessor: 'balance',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-secondary fw-bolder`}>
          {value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_OPENNING_SLIP',
    accessor: 'balanceBefore',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-light fw-bolder`}>
          {value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </div>
      )
    },
  },
]

export const FINANCE_DEBIT_COLUMNS: ReadonlyArray<Column<IFinanceDebit>> = [
  {
    Header: 'CLIENT_CODE',
    accessor: 'code',
  },
  {
    Header: 'CLIENT_NAME',
    accessor: 'name',
  },
  {
    Header: 'CLIENT_ADDRESS',
    accessor: 'address',
  },
  {
    Header: 'CLIENT_PHONE',
    accessor: 'phone',
  },
  {
    Header: 'CLIENT_DEBIT',
    accessor: 'debit',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-light fw-bolder`}>
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_CREDIT',
    accessor: 'credit',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-light fw-bolder`}>
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_BALANCE',
    accessor: 'balance',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div
          className={`badge ${
            value > 0 ? 'badge-danger' : value < 0 ? 'badge-info' : 'badge-secondary'
          } fw-bolder`}
        >
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_DEBIT_USD',
    accessor: 'debitUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-light fw-bolder`}>
          {value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_CREDIT_USD',
    accessor: 'creditUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-light fw-bolder`}>
          {value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_BALANCE_USD',
    accessor: 'balanceUsd',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div
          className={`badge ${
            value > 0 ? 'badge-danger' : value < 0 ? 'badge-info' : 'badge-secondary'
          } fw-bolder`}
        >
          {value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </div>
      )
    },
  },
]

export const FINANCE_FICHE_COLUMNS: ReadonlyArray<Column<IFinanceFiche>> = [
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
    //@ts-expect-error
    disableGlobalFilter: true,
    Cell: ({value}) => {
      const intl = useIntl()
      switch (value) {
        case 1:
          return (
            <div className='badge badge-primary fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_CASH_COLLECTION',
            })}`}</div>
          )
        case 2:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_CASH_PAYMENT',
            })}`}</div>
          )
        case 3:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_DEBIT_NOTE',
            })}`}</div>
          )
        case 4:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_CREDIT_NOTE',
            })}`}</div>
          )
        case 5:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_PERMITTANCE_SLIP',
            })}`}</div>
          )
        case 6:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_EXCH_RATE_DIFF_TRANS',
            })}`}</div>
          )
        case 12:
          return (
            <div className='badge badge-light fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_SPECIAL_SLIP',
            })}`}</div>
          )
        case 14:
          return (
            <div className='badge badge-light fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_OPENNING_SLIP',
            })}`}</div>
          )
        case 41:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_EXCH_RATE_DIFF_TRANS',
            })}`}</div>
          )
        case 42:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_EXCH_RATE_DIFF_TRANS',
            })}`}</div>
          )
        case 45:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_TRADESMAN_INVOICE_RECEIVED',
            })}`}</div>
          )
        case 46:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_TRADESMAN_INVOICE_RECEIVED',
            })}`}</div>
          )
        case 70:
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_CREDIT_CARD',
            })}`}</div>
          )
        case 71:
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_CREDIT_CARD',
            })}`}</div>
          )
        default:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_OPERATION_OTHER',
            })}`}</div>
          )
      }
    },
  },
  {
    Header: 'CLIENT_DEBIT',
    accessor: 'debit',
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
    Header: 'CLIENT_CREDIT',
    accessor: 'credit',
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
    Header: 'CLIENT_DEBIT_USD',
    accessor: 'repDebit',
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
    Header: 'CLIENT_CREDIT_USD',
    accessor: 'repCredit',
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

export const FINANCE_FICHE: ReadonlyArray<Column<IFiche>> = [
  {
    Header: 'CLIENT_CODE',
    accessor: 'code',
  },
  {
    Header: 'CLIENT_NAME',
    accessor: 'name',
  },
  {
    Header: 'CLIENT_DEBIT',
    accessor: 'debit',
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
    Header: 'CLIENT_CREDIT',
    accessor: 'credit',
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
    Header: 'CLIENT_DEBIT_USD',
    accessor: 'debitUsd',
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
    Header: 'CLIENT_CREDIT_USD',
    accessor: 'creditUsd',
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
