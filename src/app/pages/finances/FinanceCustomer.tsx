import React, {useState, useMemo, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import axios from 'axios'
import {IFinanceCustomer} from '../../modules/apps/reports/finance/models/finance_model'
import {PageTitle} from '../../../_metronic/layout/core'
import {FINANCE_CUSTOMER_COLUMNS} from '../../modules/apps/reports/finance/types/Columns'
import {Header} from '../../modules/apps/reports/finance/components/Header'
import Footer from '../../modules/apps/reports/finance/components/Footer'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import '../../../_metronic/assets/fonts/Roboto-Regular-normal'

const FinanceCustomer: React.FC = () => {
  const intl = useIntl()
  const [items, setItems] = useState<IFinanceCustomer[]>([])

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/accounts/debit`
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
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.FINANCE_CUSTOMER'})}</PageTitle>
      <ItemsContainer items={items} />
    </>
  )
}

const ItemsContainer = ({items}: {items: any}) => {
  const intl = useIntl()
  const columns = useMemo(() => FINANCE_CUSTOMER_COLUMNS, [])
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

  function exportPDF() {
    const doc = new jsPDF('l', 'mm', 'a4')
    doc.addFont('Roboto-Regular-normal.ttf', 'Roboto-Regular', 'normal')
    doc.setFont('Roboto-Regular')

    const head = [
      [
        intl.formatMessage({id: 'CLIENT_CODE'}),
        intl.formatMessage({id: 'CLIENT_NAME'}),
        intl.formatMessage({id: 'CLIENT_ADDRESS'}),
        intl.formatMessage({id: 'CLIENT_PHONE'}),
        intl.formatMessage({id: 'CLIENT_DEBIT'}),
        intl.formatMessage({id: 'CLIENT_CREDIT'}),
        intl.formatMessage({id: 'CLIENT_BALANCE'}),
        intl.formatMessage({id: 'CLIENT_DEBIT_USD'}),
        intl.formatMessage({id: 'CLIENT_CREDIT_USD'}),
        intl.formatMessage({id: 'CLIENT_BALANCE_USD'}),
      ],
    ]

    const data = items.map((item: IFinanceCustomer) => {
      item.phone = item.phone + '\t'
      item.debit = Math.round(item.debit)
      item.debitUsd = Math.round(item.debitUsd)
      item.credit = Math.round(item.credit)
      item.creditUsd = Math.round(item.creditUsd)
      item.balance = Math.round(item.balance)
      item.balanceUsd = Math.round(item.balanceUsd)
      return Object.values(item)
    })

    autoTable(doc, {
      head: head,
      body: data,
      styles: {font: 'Roboto-Regular'},
    })
    doc.save('Customers.pdf')
  }

  function exportCSV() {
    // const data_type = 'data:application/vnd.ms-excel'
    // const table_div = document.getElementById('productRemains')
    // const table_html = table_div?.outerHTML.replace(/ /g, '%20')
    // const a = document.createElement('a')
    // a.href = data_type + ', ' + table_html
    // a.download = 'Example_Table_To_Excel.xls'
    // a.click()

    let str = `${intl.formatMessage({
      id: 'CLIENT_CODE',
    })};${intl.formatMessage({id: 'CLIENT_NAME'})};${intl.formatMessage({
      id: 'CLIENT_ADDRESS',
    })};${intl.formatMessage({id: 'CLIENT_PHONE'})};${intl.formatMessage({
      id: 'CLIENT_DEBIT',
    })};${intl.formatMessage({id: 'CLIENT_CREDIT'})};${intl.formatMessage({
      id: 'CLIENT_BALANCE',
    })};${intl.formatMessage({id: 'CLIENT_DEBIT_USD'})};${intl.formatMessage({
      id: 'CLIENT_CREDIT_USD',
    })};${intl.formatMessage({id: 'CLIENT_BALANCE_USD'})}\n`

    //  Add \ tto prevent tables from displaying scientific notation or other formats
    for (let i = 0; i < items.length; i++) {
      for (let item in items[i]) {
        items[i]['phone'] = items[i]['phone'] + '\t'
        items[i]['debit'] = Math.round(items[i]['debit'])
        items[i]['credit'] = Math.round(items[i]['credit'])
        items[i]['balance'] = Math.round(items[i]['balance'])
        items[i]['debitUsd'] = Math.round(items[i]['debitUsd'])
        items[i]['creditUsd'] = Math.round(items[i]['creditUsd'])
        items[i]['balanceUsd'] = Math.round(items[i]['balanceUsd'])

        str += `${items[i][item]};`
      }
      str += '\n'
    }

    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
    let link = document.createElement('a')
    link.href = uri
    link.download = 'Customers.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  //@ts-expect-error
  const {globalFilter, pageIndex, pageSize} = state

  return (
    <KTCard>
      <Header
        value={globalFilter}
        change={setGlobalFilter}
        exportPDF={exportPDF}
        exportCSV={exportCSV}
      />
      <KTCardBody>
        <div className='table-responsive'>
          <table
            className='table table-hover table-striped table-rounded align-middle table-row-dashed fs-6 gy-5 gx-5 dataTable'
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr
                  key={index}
                  {...headerGroup.getHeaderGroupProps}
                  className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'
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
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps} className='text-gray-600 fw-bold'>
              {page.map((row: any) => {
                let currentCode
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => {
                      if (cell.render('Cell').props.column.Header === 'CLIENT_CODE') {
                        currentCode = cell.render('Cell').props.cell.value
                      }
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                    <td>
                    <a
                        href={`/finance/extract/${currentCode}`}
                        className='btn btn-icon btn-secondary btn-sm border-0'
                        title={`${intl.formatMessage({id: 'CLIENT_EXTRACT'})}`}
                      >
                        <span className='svg-icon svg-icon-2 svg-icon-primary'>
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='mh-50px'
                          >
                            <rect
                              opacity='0.5'
                              x='18'
                              y='13'
                              width='13'
                              height='2'
                              rx='1'
                              transform='rotate(-180 18 13)'
                              fill='currentColor'
                            ></rect>
                            <path
                              d='M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z'
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
                          <a href={`/finance/extract/${currentCode}`} className='menu-link px-3'>
                            {intl.formatMessage({id: 'CLIENT_EXTRACT'})}
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
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
          rowCount={items.length}
        />
      </KTCardBody>
    </KTCard>
  )
}

export default FinanceCustomer
