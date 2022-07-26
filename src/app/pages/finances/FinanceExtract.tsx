import React, {useState, useMemo, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import axios from 'axios'
import {IFinanceExtract} from '../../modules/apps/reports/finance/models/finance_model'
import {PageTitle} from '../../../_metronic/layout/core'
import {FINANCE_EXTRACT_COLUMNS} from '../../modules/apps/reports/finance/types/Columns'
import {Header} from '../../modules/apps/reports/finance/components/Header'
import Footer from '../../modules/apps/reports/finance/components/Footer'
import {useParams} from 'react-router-dom'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import '../../../_metronic/assets/fonts/Roboto-Regular-normal'

interface ICompany {
  company: number
  period: number
  warehouse: number
  begdate: string
  enddate: string
}

const FinanceExtract: React.FC = () => {
  const intl = useIntl()
  const {id} = useParams()
  const [items, setItems] = useState<IFinanceExtract[]>([])

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = id ? `${BASE_URL}/accounts/extract/${id}` : `${BASE_URL}/accounts/extract`
    let defaultParams: ICompany

    async function loadValues() {
      if (localStorage.getItem('defaultParams') === null) {
        return null
      }
      return JSON.parse(localStorage.getItem('defaultParams') || '')
    }

    loadValues()
      .then((response) => response)
      .then(function (data) {
        if (data !== null) {
          defaultParams = data
        }
        fetchProducts()
      })

    async function fetchProducts() {
      const response = await axios.post(REQUEST_URL, {
        firmNo: defaultParams.company,
        periodNo: defaultParams.period,
        begDate: defaultParams.begdate,
        endDate: defaultParams.enddate,
        sourceIndex: defaultParams.warehouse,
        filterName: '',
      })
      setItems(response.data)
    }
  }, [id])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.FINANCE_EXTRACT'})}</PageTitle>
      <ItemsContainer items={items} />
    </>
  )
}

const ItemsContainer = ({items}: {items: any}) => {
  const intl = useIntl()
  const columns = useMemo(() => FINANCE_EXTRACT_COLUMNS, [])
  const data = useMemo(() => items, [items])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
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
        intl.formatMessage({id: 'DATE'}),
        intl.formatMessage({id: 'CLIENT_OPERATION_TYPE'}),
        intl.formatMessage({id: 'CLIENT_FICHE_NO'}),
        intl.formatMessage({id: 'CLIENT_DESCRIPTION'}),
        intl.formatMessage({id: 'CLIENT_DEBIT_PLUS'}),
        intl.formatMessage({id: 'CLIENT_DEBIT_MINUS'}),
        intl.formatMessage({id: 'CLIENT_BALANCE'}),
        intl.formatMessage({id: 'CLIENT_OPENNING_SLIP'}),
      ],
    ]

    const data = items.map((item: IFinanceExtract) => {
      switch (item.trcode) {
        case 1:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_CASH_COLLECTION',
          })
          break
        case 2:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_CASH_PAYMENT',
          })
          break
        case 3:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_DEBIT_NOTE',
          })
          break
        case 4:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_CREDIT_NOTE',
          })
          break
        case 5:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_PERMITTANCE_SLIP',
          })
          break
        case 6:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_EXCH_RATE_DIFF_TRANS',
          })
          break
        case 12:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_SPECIAL_SLIP',
          })
          break
        case 14:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_OPENNING_SLIP',
          })
          break
        case 31:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_PURCHASE_INVOICE',
          })
          break
        case 32:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_RETAIL_RETURN_INVOICE',
          })
          break
        case 33:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_TRADESMAN_INVOICE_RECEIVED',
          })
          break
        case 36:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_CUSTOMER_RETURN',
          })
          break
        case 37:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_RETAIL_SALE',
          })
          break
        case 38:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_WHOLESALE',
          })
          break
        case 39:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_TRADESMAN_INVOICE_ISSUED',
          })
          break
        default:
          item.trcode = intl.formatMessage({
            id: 'CLIENT_OPERATION_OTHER',
          })
          break
      }

      item.description = item.description + '\t'
      item.debit = Math.round(item.debit)
      item.credit = Math.round(item.credit)
      item.balance = Math.round(item.balance)
      item.balanceBefore = Math.round(item.balanceBefore)
      return Object.values(item)
    })

    autoTable(doc, {
      head: head,
      body: data,
      styles: {font: 'Roboto-Regular'},
    })
    doc.save('AccountExtract.pdf')
  }

  function exportCSV() {
    // const data_type = 'data:application/vnd.ms-excel'
    // const table_div = document.getElementById('productRemains')
    // const table_html = table_div?.outerHTML.replace(/ /g, '%20')
    // const a = document.createElement('a')
    // a.href = data_type + ', ' + table_html
    // a.download = 'Example_Table_To_Excel.xls'
    // a.click()

    let str = `${intl.formatMessage({id: 'CLIENT_CODE'})};${intl.formatMessage({
      id: 'CLIENT_NAME',
    })};${intl.formatMessage({id: 'DATE'})};${intl.formatMessage({
      id: 'CLIENT_OPERATION_TYPE',
    })};${intl.formatMessage({id: 'CLIENT_FICHE_NO'})};${intl.formatMessage({
      id: 'CLIENT_DESCRIPTION',
    })};${intl.formatMessage({id: 'CLIENT_DEBIT_PLUS'})};${intl.formatMessage({
      id: 'CLIENT_DEBIT_MINUS',
    })};${intl.formatMessage({id: 'CLIENT_BALANCE'})};${intl.formatMessage({
      id: 'CLIENT_OPENNING_SLIP',
    })}\n`

    //  Add \ tto prevent tables from displaying scientific notation or other formats
    for (let i = 0; i < items.length; i++) {
      for (let item in items[i]) {
        switch (items[i]['trcode']) {
          case 1:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_CASH_COLLECTION',
            })
            break
          case 2:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_CASH_PAYMENT',
            })
            break
          case 3:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_DEBIT_NOTE',
            })
            break
          case 4:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_CREDIT_NOTE',
            })
            break
          case 5:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_PERMITTANCE_SLIP',
            })
            break
          case 6:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_EXCH_RATE_DIFF_TRANS',
            })
            break
          case 12:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_SPECIAL_SLIP',
            })
            break
          case 14:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_OPENNING_SLIP',
            })
            break
          case 31:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_PURCHASE_INVOICE',
            })
            break
          case 32:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_RETAIL_RETURN_INVOICE',
            })
            break
          case 33:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_TRADESMAN_INVOICE_RECEIVED',
            })
            break
          case 36:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_CUSTOMER_RETURN',
            })
            break
          case 37:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_RETAIL_SALE',
            })
            break
          case 38:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_WHOLESALE',
            })
            break
          case 39:
            items[i]['trcode'] = intl.formatMessage({
              id: 'CLIENT_TRADESMAN_INVOICE_ISSUED',
            })
            break
        }

        items[i]['description'] = items[i]['description'] + '\t'
        items[i]['debit'] = Math.round(items[i]['debit'])
        items[i]['credit'] = Math.round(items[i]['credit'])
        items[i]['balance'] = Math.round(items[i]['balance'])
        items[i]['balanceBefore'] = Math.round(items[i]['balanceBefore'])

        str += `${items[i][item]};`
      }
      str += '\n'
    }

    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
    let link = document.createElement('a')
    link.href = uri
    link.download = 'AccountExtract.csv'
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
        show={true}
        setShow={() => false}
        item={''}
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
                      if (cell.accessor === 'item_trCode') {
                        console.log('item_trCode')
                      }
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              {footerGroups.map((footerGroup) => (
                <tr {...footerGroup.getFooterGroupProps()}>
                  {footerGroup.headers.map((column) => (
                    <td {...column.getFooterProps}>{column.render('Footer')}</td>
                  ))}
                </tr>
              ))}
            </tfoot>
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

export default FinanceExtract
