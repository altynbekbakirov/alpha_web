import {useIntl} from 'react-intl'
import {Column} from 'react-table'
import {IFinanceCustomer, IFinanceDebit, IFinanceExtract} from '../models/finance_model'

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
      value < 0 ? (value = -value) : (value = +value)
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    },
  },
  {
    Header: 'CLIENT_CREDIT',
    accessor: 'credit',
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
          {' '}
          {value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </div>
      )
    },
  },
  {
    Header: 'CLIENT_EMPTY',
    accessor: 'id',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      const intl = useIntl()
      return (
        <>
          <a
            href='/'
            className='btn btn-secondary btn-active-light-primary btn-sm'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
          >
            {intl.formatMessage({id: 'ACTIONS'})}
            <span className='svg-icon svg-icon-5 m-0'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='mh-50px'
              >
                <path
                  d='M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z'
                  fill='currentColor'
                ></path>
              </svg>
            </span>
          </a>
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-150px py-4'
            data-kt-menu='true'
          >
            <div className='menu-item px-3'>
              <a href={`/finance/extract/${value}`} className='menu-link px-3'>
                {intl.formatMessage({id: 'CLIENT_EXTRACT'})}
              </a>
            </div>
          </div>
        </>
      )
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
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    },
  },
  {
    Header: 'CLIENT_DEBIT_MINUS',
    accessor: 'credit',
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
    Header: 'CLIENT_BALANCE',
    accessor: 'balance',
    //@ts-expect-error
    disableGlobalFilter: true,
    sortType: compareNumericString,
    Cell: ({value}) => {
      return (
        <div className={`badge badge-secondary fw-bolder`}>
          {' '}
          {value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
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
          {' '}
          {value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
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
          {' '}
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
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
          {' '}
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
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
          {' '}
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
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
          {' '}
          {value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
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
          {' '}
          {value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
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
          {' '}
          {value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      )
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
