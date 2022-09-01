import axios from 'axios'
import React, {useEffect, useState, useMemo} from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table'
import Footer from '../../../../app/modules/apps/reports/products/components/Footer'
import { SearchComponent } from '../../../../app/modules/apps/reports/products/components/Search'
import { FINANCE_EXTRACT_COLUMNS } from '../../../../app/modules/apps/reports/finance/types/Columns'
import { IFinanceExtract } from '../../../../app/modules/apps/reports/finance/models/finance_model'

interface IProps {
  show: boolean
  setShow: () => void
  item: string
}

const FicheContents: React.FC<IProps> = ({show, setShow, item}) => {
  const intl = useIntl()
  const [items, setItems] = useState<IFinanceExtract[]>([])
  const columns = useMemo(() => FINANCE_EXTRACT_COLUMNS, [])
  const data = useMemo(() => items, [items])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //@ts-expect-error
    page,
    //@ts-expect-error
    canNextPage,
    //@ts-expect-error
    canPreviousPage,
    //@ts-expect-error
    nextPage,
    //@ts-expect-error
    previousPage,
    //@ts-expect-error
    pageOptions,
    //@ts-expect-error
    gotoPage,
    //@ts-expect-error
    pageCount,
    //@ts-expect-error
    setPageSize,
    prepareRow,
    state,
    //@ts-expect-error
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      //@ts-expect-error
      initialState: {pageSize: 50},
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/accounts/extract/${item}`

    async function fetchProducts() {
      const response = await axios.post(REQUEST_URL, {
        firmno: 1,
        periodno: 3,
        begdate: '01.01.2022',
        enddate: '31.12.2022',
        sourceindex: 0,
      })
      setItems(response.data)
    }
    fetchProducts()
  }, [item])

  //@ts-expect-error
  const {globalFilter, pageIndex, pageSize} = state

  return (
    <div
      className={`modal fade ${show ? 'show' : 'hidden'}`}
      tabIndex={-1}
      style={{display: show ? 'block' : 'none'}}
    >
      <div className='modal-dialog modal-fullscreen'>
        <div className='modal-content shadow-none'>
          <div className='modal-header'>
            <h5 className='modal-title'>
              {intl.formatMessage({id: 'CLIENT_FICHE'})}
            </h5>
            <div
              className='btn btn-icon btn-sm btn-active-light-primary ms-2'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={setShow}
            >
              <KTSVG
                path='/media/icons/duotune/arrows/arr061.svg'
                className='svg-icon svg-icon-2x'
              />
            </div>
          </div>
          <div className='modal-body'>
            <SearchComponent value={globalFilter} change={setGlobalFilter} />
            <table
              id='productRemains'
              className='table table-hover table-striped table-rounded align-middle table-row-dashed fs-6 gy-5 gx-5 dataTable'
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr
                    key={index}
                    {...headerGroup.getHeaderGroupProps}
                    className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-300'
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          //@ts-expect-error
                          column.getSortByToggleProps()
                        )}
                        role='columnheader'
                        className={
                          //@ts-expect-error
                          column.isSorted
                            ? //@ts-expect-error
                              column.isSortedDesc
                              ? 'table-sort-desc'
                              : 'table-sort-asc'
                            : ''
                        }
                      >
                        {intl.formatMessage({id: `${column.render('Header')}`})}
                      </th>
                    ))}
                    <th role='columnheader' className='text-end'>
                      {''}
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps} className='text-gray-600 fw-bold'>
                {page.map((row: any) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell: any) => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <Footer
              previous={previousPage}
              next={nextPage}
              canPrevious={canPreviousPage}
              canNext={canNextPage}
              pageIndex={pageIndex}
              pageOptions={pageOptions}
              gotoPage={gotoPage}
              pageCount={pageCount}
              pageSize={pageSize}
              setPageSize={setPageSize}
              rowCount={items.length + 1}
            />
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-primary' onClick={setShow}>
              {intl.formatMessage({id: 'MODAL_CLOSE'})}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FicheContents
