import React, {useState, useMemo, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {Header} from '../../modules/apps/reports/products/components/Header'
import {PRODUCTS_FICHE_COLUMNS} from '../../modules/apps/reports/products/types/Columns'
import {IProductFiche} from '../../modules/apps/reports/products/models/products_model'
import Footer from '../../modules/apps/reports/products/components/Footer'
import axios from 'axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import '../../../_metronic/assets/fonts/Roboto-Regular-normal'

const ProductsFiche: React.FC = () => {
  const intl = useIntl()
  const [items, setItems] = useState<IProductFiche[]>([])

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/products/fiche`

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
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.PRODUCTS_FICHE'})}</PageTitle>
      <ProductsContainer items={items} />
    </>
  )
}

const ProductsContainer = ({items}: {items: any}) => {
  const intl = useIntl()
  const columns = useMemo(() => PRODUCTS_FICHE_COLUMNS, [])
  const data = useMemo(() => items, [items])

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
      ],
    ]

    const data = items.map((item: IProductFiche) => {
      switch (item.item_trCode) {
        case 1:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_PURCHASE',
          })}`
          break
        case 2:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_RETAIL_RETURN',
          })}`
          break
        case 3:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_WHOLESALE_RETURN',
          })}`
          break
        case 4:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_CONSIGNMENT_RETURN_RECEIPT',
          })}`
          break
        case 5:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_CONSIGNMENT_RECEIPT',
          })}`
          break
        case 6:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_PURCHASE_RETURN',
          })}`
          break
        case 7:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_RETAIL_SALE',
          })}`
          break
        case 8:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_WHOLESALE',
          })}`
          break
        case 9:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_CONSIGNMENT',
          })}`
          break
        case 10:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_CONSIGNEMT_RETURN',
          })}`
          break
        case 11:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_SCRAPT',
          })}`
          break
        case 12:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_USAGE',
          })}`
          break
        case 13:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_INPUT_PRODUCTION',
          })}`
          break
        case 14:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_OPENNING',
          })}`
          break
        case 25:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_WAREHOUSE',
          })}`
          break
        case 26:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_PRODUCER',
          })}`
          break
        case 50:
          item.item_trCode = `${intl.formatMessage({
            id: 'OPERATION_TYPE_COUNT_EXCESS',
          })}`
          break
        case 51:
          item.item_trCode = `${intl.formatMessage({
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
    doc.save('Fiche.pdf')
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
    })};${intl.formatMessage({id: 'PRODUCT_NET'})}\n`

    //  Add \ tto prevent tables from displaying scientific notation or other formats
    for (let i = 0; i < items.length; i++) {
      for (let item in items[i]) {
        switch (items[i]['item_trCode']) {
          case 1:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_PURCHASE',
            })}`
            break
          case 2:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_RETAIL_RETURN',
            })}`
            break
          case 3:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_WHOLESALE_RETURN',
            })}`
            break
          case 4:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_CONSIGNMENT_RETURN_RECEIPT',
            })}`
            break
          case 5:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_CONSIGNMENT_RECEIPT',
            })}`
            break
          case 6:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_PURCHASE_RETURN',
            })}`
            break
          case 7:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_RETAIL_SALE',
            })}`
            break
          case 8:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_WHOLESALE',
            })}`
            break
          case 9:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_CONSIGNMENT',
            })}`
            break
          case 10:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_CONSIGNEMT_RETURN',
            })}`
            break
          case 11:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_SCRAPT',
            })}`
            break
          case 12:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_USAGE',
            })}`
            break
          case 13:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_INPUT_PRODUCTION',
            })}`
            break
          case 14:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_OPENNING',
            })}`
            break
          case 25:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_WAREHOUSE',
            })}`
            break
          case 26:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_PRODUCER',
            })}`
            break
          case 50:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_COUNT_EXCESS',
            })}`
            break
          case 51:
            items[i]['item_trCode'] = `${intl.formatMessage({
              id: 'OPERATION_TYPE_COUNT_DEFICIT',
            })}`
            break
        }

        items[i]['item_ficheNo'] = items[i]['item_ficheNo'] + '\t'

        if (typeof items[i][item] === 'number') {
          str += `${Math.round(items[i][item])};`
        } else {
          str += `${items[i][item]};`
        }
      }
      str += '\n'
    }

    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
    let link = document.createElement('a')
    link.href = uri
    link.download = 'Fiche.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
                  <th role='columnheader' className='text-end min-w-100px'>
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
                      if (cell.accessor === 'item_trCode') {
                        console.log('item_trCode')
                      }
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                    <td role='cell' className='text-end min-w-100px'>
                      <a
                        href='/'
                        className='btn btn-light btn-active-light-primary btn-sm'
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
                          <a href='/' className='menu-link px-3'>
                            {intl.formatMessage({id: 'ACTIONS_MATERIAL_TRANSACTIONS'})}
                          </a>
                        </div>
                        <div className='menu-item px-3'>
                          <a
                            href='/'
                            className='menu-link px-3'
                            data-kt-users-table-filter='delete_row'
                          >
                            {intl.formatMessage({id: 'ACTIONS_VIEW_PRICES'})}
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

export default ProductsFiche
