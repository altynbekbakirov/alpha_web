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
  },
  {
    Header: 'SAFE_BALANCE_USD',
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
