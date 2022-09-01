import React, {useState, useMemo, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {PURCHASES_FICHE_COLUMNS} from '../../modules/apps/reports/purchases/types/Columns'
import {IPurchaseFiche} from '../../modules/apps/reports/purchases/models/purchases_model'
import Footer from '../../modules/apps/reports/purchases/components/Footer'
import axios from 'axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import '../../../_metronic/assets/fonts/Roboto-Regular-normal'
import {HeaderFiche} from '../../modules/apps/reports/purchases/components/HeaderFiche'

interface ICompany {
  company: number
  period: number
  warehouse: number
  begdate: string
  enddate: string
}

const PurchaseFiche: React.FC = () => {
  const intl = useIntl()
  const [items, setItems] = useState<IPurchaseFiche[]>([])

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/purchases`
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
        firmno: defaultParams.company,
        periodno: defaultParams.period,
        begdate: defaultParams.begdate,
        enddate: defaultParams.enddate,
        sourceindex: defaultParams.warehouse,
      })
      setItems(response.data)
    }
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.PURCHASE_FICHE'})}</PageTitle>
      <ItemsContainer items={items} />
    </>
  )
}

const ItemsContainer = ({items}: {items: any}) => {
  const intl = useIntl()
  const columns = useMemo(() => PURCHASES_FICHE_COLUMNS, [])
  const data = useMemo(() => items, [items])
  const [show, setShow] = React.useState(false)
  const [item, setItem] = useState('')

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
        intl.formatMessage({id: 'TR_CODE'}),
        intl.formatMessage({id: 'FICHE_NO'}),
        intl.formatMessage({id: 'DATE'}),
        intl.formatMessage({id: 'CLIENT_CODE'}),
        intl.formatMessage({id: 'CLIENT_NAME'}),
        intl.formatMessage({id: 'PRODUCT_GROSS'}),
        intl.formatMessage({id: 'PRODUCT_DISCOUNTS'}),
        intl.formatMessage({id: 'PRODUCT_EXPENSES'}),
        intl.formatMessage({id: 'PRODUCT_NET'}),
        intl.formatMessage({id: 'PRODUCT_NET_USD'}),
      ],
    ]

    const data = items.map((item: IPurchaseFiche) => {
      switch (item.trCode) {
        case 1:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_PURCHASE',
          })}`
          break
        case 2:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_RETAIL_RETURN',
          })}`
          break
        case 3:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_WHOLESALE_RETURN',
          })}`
          break
        case 4:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_CONSIGNMENT_RETURN_RECEIPT',
          })}`
          break
        case 5:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_CONSIGNMENT_RECEIPT',
          })}`
          break
        case 6:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_PURCHASE_RETURN',
          })}`
          break
        case 7:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_RETAIL_SALE',
          })}`
          break
        case 8:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_WHOLESALE',
          })}`
          break
        case 9:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_CONSIGNMENT',
          })}`
          break
        case 10:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_CONSIGNEMT_RETURN',
          })}`
          break
        case 11:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_SCRAPT',
          })}`
          break
        case 12:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_USAGE',
          })}`
          break
        case 13:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_INPUT_PRODUCTION',
          })}`
          break
        case 14:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_OPENNING',
          })}`
          break
        case 25:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_WAREHOUSE',
          })}`
          break
        case 26:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_PRODUCER',
          })}`
          break
        case 50:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_COUNT_EXCESS',
          })}`
          break
        case 51:
          item.trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_COUNT_DEFICIT',
          })}`
          break
      }
      return Object.values(item)
    })

    autoTable(doc, {
      head: head,
      body: data,
      styles: {font: 'Roboto-Regular'},
    })
    doc.save('Fiches.pdf')
  }

  function exportCSV() {
    // const data_type = 'data:application/vnd.ms-excel'
    // const table_div = document.getElementById('productRemains')
    // const table_html = table_div?.outerHTML.replace(/ /g, '%20')
    // const a = document.createElement('a')
    // a.href = data_type + ', ' + table_html
    // a.download = 'Example_Table_To_Excel.xls'
    // a.click()

    let str = `${intl.formatMessage({id: 'TR_CODE'})};${intl.formatMessage({
      id: 'FICHE_NO',
    })};${intl.formatMessage({id: 'DATE'})};${intl.formatMessage({
      id: 'CLIENT_CODE',
    })};${intl.formatMessage({id: 'CLIENT_NAME'})};${intl.formatMessage({
      id: 'PRODUCT_GROSS',
    })};${intl.formatMessage({id: 'PRODUCT_DISCOUNTS'})};${intl.formatMessage({
      id: 'PRODUCT_EXPENSES',
    })};${intl.formatMessage({id: 'PRODUCT_NET'})};${intl.formatMessage({
      id: 'PRODUCT_NET_USD',
    })}\n`

    //  Add \ tto prevent tables from displaying scientific notation or other formats
    for (let i = 0; i < items.length; i++) {
      for (let item in items[i]) {
        switch (items[i]['trCode']) {
          case 1:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_PURCHASE',
            })}`
            break
          case 2:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_RETAIL_RETURN',
            })}`
            break
          case 3:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_WHOLESALE_RETURN',
            })}`
            break
          case 4:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_CONSIGNMENT_RETURN_RECEIPT',
            })}`
            break
          case 5:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_CONSIGNMENT_RECEIPT',
            })}`
            break
          case 6:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_PURCHASE_RETURN',
            })}`
            break
          case 7:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_RETAIL_SALE',
            })}`
            break
          case 8:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_WHOLESALE',
            })}`
            break
          case 9:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_CONSIGNMENT',
            })}`
            break
          case 10:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_CONSIGNEMT_RETURN',
            })}`
            break
          case 11:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_SCRAPT',
            })}`
            break
          case 12:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_USAGE',
            })}`
            break
          case 13:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_INPUT_PRODUCTION',
            })}`
            break
          case 14:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_OPENNING',
            })}`
            break
          case 25:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_WAREHOUSE',
            })}`
            break
          case 26:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_PRODUCER',
            })}`
            break
          case 50:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_COUNT_EXCESS',
            })}`
            break
          case 51:
            items[i]['trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_COUNT_DEFICIT',
            })}`
            break
        }

        items[i]['ficheNo'] = items[i]['ficheNo'] + '\t'
        items[i]['gross'] = Math.round(items[i]['gross'])
        items[i]['discounts'] = Math.round(items[i]['discounts'])
        items[i]['expenses'] = Math.round(items[i]['expenses'])
        items[i]['net'] = Math.round(items[i]['net'])
        items[i]['netUsd'] = Math.round(items[i]['netUsd'])

        str += `${items[i][item]};`
      }
      str += '\n'
    }

    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
    let link = document.createElement('a')
    link.href = uri
    link.download = 'Fiches.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  //@ts-expect-error
  const {globalFilter, pageIndex, pageSize} = state

  return (
    <KTCard>
      <HeaderFiche
        value={globalFilter}
        change={setGlobalFilter}
        exportPDF={exportPDF}
        exportCSV={exportCSV}
        show={show}
        setShow={() => setShow(!show)}
        item={item}
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
                  <th role='columnheader' className='text-end min-w-100px'>
                    {''}
                  </th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps} className='text-gray-600 fw-bold'>
              {page.map((row: any) => {
                let currentCode: string
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => {
                      if (cell.render('Cell').props.column.Header === 'PRODUCT_ROW') {
                        currentCode = cell.render('Cell').props.cell.value
                      }
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                    <td role='cell' className='text-end min-w-100px'>
                      <a
                        href='/'
                        className='btn btn-icon btn-secondary btn-sm border-0'
                        onClick={(e) => {
                          e.preventDefault()
                          setItem(currentCode)
                          setShow(!show)
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

export default PurchaseFiche
