import { useIntl } from 'react-intl'
import {Column} from 'react-table'
import {ISafe, ISafeExtract} from '../models/safes_model'

export const SAFES_COLUMNS: ReadonlyArray<Column<ISafe>> = [
  {
    Header: 'SAFE_CODE',
    accessor: 'code',
  },
  {
    Header: 'SAFE_NAME',
    accessor: 'name',
    Cell: ({value}) => {
      return <div className='badge badge-light fw-bolder'>{value}</div>
    },
  },
  {
    Header: 'SAFE_DEFINITION',
    accessor: 'definition',
  },
  {
    Header: 'SAFE_BALANCE',
    accessor: 'balance',
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
    Header: 'SAFE_BALANCE_USD',
    accessor: 'balanceUsd',
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

export const SAFES_EXTRACT_COLUMNS: ReadonlyArray<Column<ISafeExtract>> = [
  {
    Header: 'DATE',
    accessor: 'date',
  },
  {
    Header: 'FICHE_NO',
    accessor: 'ficheNo',
    Cell: ({value}) => {
      return <div className='badge badge-light fw-bolder'>{value}</div>
    },
  },
  {
    Header: 'CLIENT_NAME',
    accessor: 'title',
  },
  {
    Header: 'SAFE_DEFINITION',
    accessor: 'definition',
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
        case 11:
          return (
            <div className='badge badge-primary fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_CASH_COLLECTION_AP',
            })}`}</div>
          )
        case 12:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_CASH_PAYMENT_AP',
            })}`}</div>
          )
        case 21:
          return (
            <div className='badge badge-primary fw-bolder'>{`${intl.formatMessage({
              id: 'SAFE_BANK_DEPOSIT',
            })}`}</div>
          )
        case 22:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'SAFE_BANK_WITHDRAWAL',
            })}`}</div>
          )
        case 31:
          return (
            <div className='badge badge-info fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_PURCHASE',
            })}`}</div>
          )
        case 32:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_RETAIL_RETURN',
            })}`}</div>
          )
        case 33:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_WHOLESALE_RETURN',
            })}`}</div>
          )
        case 34:
          return (
            <div className='badge badge-info fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_SERVICE_RECEIVED',
            })}`}</div>
          )
        case 35:
          return (
            <div className='badge badge-danger fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_PURCHASE_RETURN',
            })}`}</div>
          )
        case 36:
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_RETAIL_SALE',
            })}`}</div>
          )
        case 37:
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_WHOLESALE',
            })}`}</div>
          )
        case 38:
          return (
            <div className='badge badge-light fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_SERVICE_ISSUE',
            })}`}</div>
          )
        case 39:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_INPUT_PRODUCTION',
            })}`}</div>
          )
        case 41:
          return (
            <div className='badge badge-primary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_ACCOUNT_COLLECTION',
            })}`}</div>
          )
          case 42:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_ACCOUNT_PAYMENT',
            })}`}</div>
          )
          case 51:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_PERSONAL_DEBT',
            })}`}</div>
          )
          case 52:
          return (
            <div className='badge badge-primary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_PERSONAL_BACK_PAYMENT',
            })}`}</div>
          )
          case 61:
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_CHECK_COLLECTION',
            })}`}</div>
          )
          case 62:
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_P.NOTE_COLLECTION',
            })}`}</div>
          )
          case 63:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_CHECK_PAYMENT',
            })}`}</div>
          )
          case 64:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_P.NOTE_PAYMENT',
            })}`}</div>
          )
          case 71:
          return (
            <div className='badge badge-light fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_OPENNING_DEBT',
            })}`}</div>
          )
          case 72:
          return (
            <div className='badge badge-light fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_OPENNING_CREDIT',
            })}`}</div>
          )
          case 73:
          return (
            <div className='badge badge-primary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_REMITTANCE_DEBT',
            })}`}</div>
          )
          case 74:
          return (
            <div className='badge badge-warning fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_REMITTANCE_CREDIT',
            })}`}</div>
          )
          case 75:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_EXPENSE_SHEET',
            })}`}</div>
          )
          case 76:
          return (
            <div className='badge badge-secondary fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_TRADESMAN_ISSUE',
            })}`}</div>
          )
          case 77:
          return (
            <div className='badge badge-success fw-bolder'>{`${intl.formatMessage({
              id: 'OPERATION_TYPE_TRADESMAN_RECEIVED',
            })}`}</div>
          )
          case 79:
          return (
            <div className='badge badge-light fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_EXCH_RATE_DIFF_TRANS',
            })}`}</div>
          )
          case 80:
          return (
            <div className='badge badge-light fw-bolder'>{`${intl.formatMessage({
              id: 'CLIENT_EXCH_RATE_DIFF_TRANS',
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
    Header: 'SAFE_BALANCE',
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
    Header: 'SAFE_BALANCE_USD',
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
