import React, {useState, useMemo, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import axios from 'axios'
import {IFinanceCustomer, IFinanceCustomer1} from '../../modules/apps/reports/finance/models/finance_model'
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
  const [items1, setItems1] = useState<IFinanceCustomer1[]>([])

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
      setItems1(response.data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.FINANCE_CUSTOMER'})}</PageTitle>
      <ItemsContainer items={items} items1={items1}/>
    </>
  )
}

const ItemsContainer = ({items, items1}: {items: any, items1 : any}) => {
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

    const data = items1.map((item: IFinanceCustomer1) => {
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

    let str = `${intl.formatMessage({id: 'CLIENT_EMPTY'})};${intl.formatMessage({
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
    for (let i = 0; i < items1.length; i++) {
      for (let item in items[i]) {
        items[i]['itemCode'] = items[i]['itemCode'] + '\t'
        items[i]['itemTotal'] = Math.round(items[i]['itemTotal'])
        items[i]['itemTotalUsd'] = Math.round(items[i]['itemTotalUsd'])
        items[i]['itemAmountRet'] = Math.round(items[i]['itemAmountRet'])
        items[i]['itemTotalRet'] = Math.round(items[i]['itemTotalRet'])
        items[i]['itemTotalUsdRet'] = Math.round(items[i]['itemTotalUsdRet'])

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
