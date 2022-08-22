import axios from 'axios'
import React, {FC, useEffect, useState, useMemo} from 'react'
import {useIntl} from 'react-intl'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {useTable, useGlobalFilter, useSortBy, usePagination} from 'react-table'
import {PageTitle} from '../../../_metronic/layout/core'
import {ISafeExtract} from '../../modules/apps/reports/safes/models/safes_model'
import {SAFES_EXTRACT_COLUMNS} from '../../modules/apps/reports/safes/types/Columns'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {Header} from '../../modules/apps/reports/safes/components/Header'
import Footer from '../../modules/apps/reports/safes/components/Footer'
import {useParams} from 'react-router-dom'

const SafesExtract: FC = () => {
  const intl = useIntl()
  const [items, setItems] = useState<ISafeExtract[]>([])
  const {code} = useParams()

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/safes/extract${code ? '/' + code : ''}`
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
  }, [code])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.SAFE_EXTRACT'})}</PageTitle>
      <ItemsContainer items={items} />
    </>
  )
}

const ItemsContainer = ({items}: {items: any}) => {
  const intl = useIntl()
  const columns = useMemo(() => SAFES_EXTRACT_COLUMNS, [])
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
        intl.formatMessage({id: 'DATE'}),
        intl.formatMessage({id: 'FICHE_NO'}),
        intl.formatMessage({id: 'CLIENT_NAME'}),
        intl.formatMessage({id: 'SAFE_DEFINITION'}),
        intl.formatMessage({id: 'TR_CODE'}),
        intl.formatMessage({id: 'SAFE_BALANCE'}),
        intl.formatMessage({id: 'SAFE_BALANCE_USD'}),
      ],
    ]

    const data = items.map((item: ISafeExtract) => {
      switch (item.trCode) {
        case 1:
          item.trCode = intl.formatMessage({
            id: 'CLIENT_CASH_COLLECTION',
          })
          break
        case 2:
          item.trCode = intl.formatMessage({
            id: 'CLIENT_CASH_PAYMENT',
          })
          break
        case 11:
          item.trCode = intl.formatMessage({
            id: 'CLIENT_CASH_COLLECTION_AP',
          })
          break
        case 12:
          item.trCode = intl.formatMessage({
            id: 'CLIENT_CASH_PAYMENT_AP',
          })
          break
        case 21:
          item.trCode = intl.formatMessage({
            id: 'SAFE_BANK_DEPOSIT',
          })
          break
        case 22:
          item.trCode = intl.formatMessage({
            id: 'SAFE_BANK_WITHDRAWAL',
          })
          break
        case 31:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_PURCHASE',
          })
          break
        case 32:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_RETAIL_RETURN',
          })
          break
        case 33:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_WHOLESALE_RETURN',
          })
          break
        case 34:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_SERVICE_RECEIVED',
          })
          break
        case 35:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_PURCHASE_RETURN',
          })
          break
        case 36:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_RETAIL_SALE',
          })
          break
        case 37:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_WHOLESALE',
          })
          break
        case 38:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_SERVICE_ISSUE',
          })
          break
        case 39:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_INPUT_PRODUCTION',
          })
          break
        case 41:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_ACCOUNT_COLLECTION',
          })
          break
        case 42:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_ACCOUNT_PAYMENT',
          })
          break
        case 51:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_PERSONAL_DEBT',
          })
          break
        case 52:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_PERSONAL_BACK_PAYMENT',
          })
          break
        case 61:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_CHECK_COLLECTION',
          })
          break
        case 62:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_P.NOTE_COLLECTION',
          })
          break
        case 63:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_CHECK_PAYMENT',
          })
          break
        case 64:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_P.NOTE_PAYMENT',
          })
          break
        case 71:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_OPENNING_DEBT',
          })
          break
        case 72:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_OPENNING_CREDIT',
          })
          break
        case 73:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_REMITTANCE_DEBT',
          })
          break
        case 74:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_REMITTANCE_CREDIT',
          })
          break
        case 75:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_EXPENSE_SHEET',
          })
          break
        case 76:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_TRADESMAN_ISSUE',
          })
          break
        case 77:
          item.trCode = intl.formatMessage({
            id: 'OPERATION_TYPE_TRADESMAN_RECEIVED',
          })
          break
        case 79:
          item.trCode = intl.formatMessage({
            id: 'CLIENT_EXCH_RATE_DIFF_TRANS',
          })
          break
        case 80:
          item.trCode = intl.formatMessage({
            id: 'CLIENT_EXCH_RATE_DIFF_TRANS',
          })
          break
      }

      item.net = item.net.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
      item.netUsd = item.netUsd.toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
      return Object.values(item)
    })

    autoTable(doc, {
      head: head,
      body: data,
      styles: {font: 'Roboto-Regular'},
    })
    doc.save('SafeExtract.pdf')
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
      id: 'DATE',
    })};${intl.formatMessage({id: 'FICHE_NO'})};${intl.formatMessage({
      id: 'CLIENT_NAME',
    })};${intl.formatMessage({id: 'SAFE_DEFINITION'})};${intl.formatMessage({
      id: 'TR_CODE',
    })};${intl.formatMessage({id: 'SAFE_BALANCE'})};${intl.formatMessage({
      id: 'SAFE_BALANCE_USD',
    })}\n`
    //  Add \ tto prevent tables from displaying scientific notation or other formats
    for (let i = 0; i < items.length; i++) {
      for (let item in items[i]) {
        switch (items[i]['trCode']) {
          case 1:
            items[i]['trCode'] = intl.formatMessage({
              id: 'CLIENT_CASH_COLLECTION',
            })
            break
          case 2:
            items[i]['trCode'] = intl.formatMessage({
              id: 'CLIENT_CASH_PAYMENT',
            })
            break
          case 11:
            items[i]['trCode'] = intl.formatMessage({
              id: 'CLIENT_CASH_COLLECTION_AP',
            })
            break
          case 12:
            items[i]['trCode'] = intl.formatMessage({
              id: 'CLIENT_CASH_PAYMENT_AP',
            })
            break
          case 21:
            items[i]['trCode'] = intl.formatMessage({
              id: 'SAFE_BANK_DEPOSIT',
            })
            break
          case 22:
            items[i]['trCode'] = intl.formatMessage({
              id: 'SAFE_BANK_WITHDRAWAL',
            })
            break
          case 31:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_PURCHASE',
            })
            break
          case 32:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_RETAIL_RETURN',
            })
            break
          case 33:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_WHOLESALE_RETURN',
            })
            break
          case 34:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_SERVICE_RECEIVED',
            })
            break
          case 35:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_PURCHASE_RETURN',
            })
            break
          case 36:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_RETAIL_SALE',
            })
            break
          case 37:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_WHOLESALE',
            })
            break
          case 38:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_SERVICE_ISSUE',
            })
            break
          case 39:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_INPUT_PRODUCTION',
            })
            break
          case 41:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_ACCOUNT_COLLECTION',
            })
            break
          case 42:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_ACCOUNT_PAYMENT',
            })
            break
          case 51:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_PERSONAL_DEBT',
            })
            break
          case 52:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_PERSONAL_BACK_PAYMENT',
            })
            break
          case 61:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_CHECK_COLLECTION',
            })
            break
          case 62:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_P.NOTE_COLLECTION',
            })
            break
          case 63:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_CHECK_PAYMENT',
            })
            break
          case 64:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_P.NOTE_PAYMENT',
            })
            break
          case 71:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_OPENNING_DEBT',
            })
            break
          case 72:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_OPENNING_CREDIT',
            })
            break
          case 73:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_REMITTANCE_DEBT',
            })
            break
          case 74:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_REMITTANCE_CREDIT',
            })
            break
          case 75:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_EXPENSE_SHEET',
            })
            break
          case 76:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_TRADESMAN_ISSUE',
            })
            break
          case 77:
            items[i]['trCode'] = intl.formatMessage({
              id: 'OPERATION_TYPE_TRADESMAN_RECEIVED',
            })
            break
          case 79:
            items[i]['trCode'] = intl.formatMessage({
              id: 'CLIENT_EXCH_RATE_DIFF_TRANS',
            })
            break
          case 80:
            items[i]['trCode'] = intl.formatMessage({
              id: 'CLIENT_EXCH_RATE_DIFF_TRANS',
            })
            break
        }

        items[i]['ficheNo'] = items[i]['ficheNo'] + "\t";

        str += `${items[i][item]};`
      }
      str += '\n'
    }

    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
    let link = document.createElement('a')
    link.href = uri
    link.download = 'SafeExtract.csv'
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
                    <td>
                      <a
                        href='/'
                        className='btn btn-icon btn-secondary btn-sm border-0'
                        onClick={(e) => {
                          e.preventDefault()
                        }}
                        title={`${intl.formatMessage({id: 'ACTIONS_VIEW_INVOICE'})}`}
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

export default SafesExtract
