import {useIntl} from 'react-intl'
import {Column} from 'react-table'
import {
  IFinanceCustomer,
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
      return value.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
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
