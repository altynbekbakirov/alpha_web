import React, {useState, useMemo, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {Header} from '../../modules/apps/reports/products/components/Header'
import {PRODUCTS_REMAINS_COLUMNS} from '../../modules/apps/reports/products/types/Columns'
import {IProductRemains} from '../../modules/apps/reports/products/models/products_model'
import axios from 'axios'
import Footer from '../../modules/apps/reports/products/components/Footer'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import '../../../_metronic/assets/fonts/Roboto-Regular-normal'

const ProductsRemains: React.FC = () => {
  const intl = useIntl()
  const [items, setItems] = useState<IProductRemains[]>([])

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/products`

    async function fetchProducts() {
      const response = await axios.post(REQUEST_URL, null, {
        params: {
          firmno: 1,
          periodno: 3,
          begdate: '01.01.2022',
          enddate: '31.12.2022',
          sourceindex: 0,
        },
      })
      setItems(response.data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.PRODUCTS_REMAINS'})}</PageTitle>
      <ProductsContainer items={items} />
    </>
  )
}

const ProductsContainer = ({items}: {items: any}) => {
  const intl = useIntl()
  const columns = useMemo(() => PRODUCTS_REMAINS_COLUMNS, [])
  const data = useMemo(() => items, [items])

  function exportPDF() {
    const doc = new jsPDF('l', 'mm', 'a4')
    doc.addFont('Roboto-Regular-normal.ttf', 'Roboto-Regular', 'normal')
    doc.setFont('Roboto-Regular')

    const head = [
      [
        intl.formatMessage({id: 'PRODUCT_CODE'}),
        intl.formatMessage({id: 'PRODUCT_NAME'}),
        intl.formatMessage({id: 'PRODUCT_GROUP'}),
        intl.formatMessage({id: 'PRODUCT_PURCHASE_PRICE'}),
        intl.formatMessage({id: 'PRODUCT_SALE_PRICE'}),
        intl.formatMessage({id: 'PRODUCT_PURCHASE_COUNT'}),
        intl.formatMessage({id: 'PRODUCT_SALE_COUNT'}),
        intl.formatMessage({id: 'PRODUCT_SALE_TOTAL_USD'}),
        intl.formatMessage({id: 'PRODUCT_ON_HAND'}),
        intl.formatMessage({id: 'PRODUCT_PURCHASE_SUM'}),
        intl.formatMessage({id: 'PRODUCT_SALE_SUM'}),
      ],
    ]

    const data = items.map((item: IProductRemains) => {
      item.item_salCurr = Math.round(item.item_salCurr)
      return Object.values(item)
    })

    autoTable(doc, {
      head: head,
      body: data,
      styles: {font: 'Roboto-Regular'},
    })
    doc.save('Products.pdf')
  }

  function exportCSV() {
    // const data_type = 'data:application/vnd.ms-excel'
    // const table_div = document.getElementById('productRemains')
    // const table_html = table_div?.outerHTML.replace(/ /g, '%20')
    // const a = document.createElement('a')
    // a.href = data_type + ', ' + table_html
    // a.download = 'Example_Table_To_Excel.xls'
    // a.click()

    let str = `${intl.formatMessage({id: 'PRODUCT_CODE'})};${intl.formatMessage({
      id: 'PRODUCT_NAME',
    })};${intl.formatMessage({id: 'PRODUCT_GROUP'})};${intl.formatMessage({
      id: 'PRODUCT_PURCHASE_PRICE',
    })};${intl.formatMessage({id: 'PRODUCT_SALE_PRICE'})};${intl.formatMessage({
      id: 'PRODUCT_PURCHASE_COUNT',
    })};${intl.formatMessage({id: 'PRODUCT_SALE_COUNT'})};${intl.formatMessage({
      id: 'PRODUCT_SALE_TOTAL_USD',
    })};${intl.formatMessage({id: 'PRODUCT_ON_HAND'})};${intl.formatMessage({
      id: 'PRODUCT_PURCHASE_SUM',
    })};${intl.formatMessage({id: 'PRODUCT_SALE_SUM'})}\n`

    //  Add \ tto prevent tables from displaying scientific notation or other formats
    for (let i = 0; i < items.length; i++) {
      for (let item in items[i]) {
        items[i]['item_purchase_price'] = items[i]['item_purchase_price'].toLocaleString(
          undefined,
          {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }
        )
        items[i]['item_sale_price'] = items[i]['item_sale_price'].toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
        items[i]['item_salCurr'] = Math.round(items[i]['item_salCurr'])
        items[i]['item_purchase_sum'] = Math.round(items[i]['item_purchase_sum'])
        items[i]['item_sale_sum'] = Math.round(items[i]['item_sale_sum'])

        str += `${items[i][item]};`
      }
      str += '\n'
    }

    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
    let link = document.createElement('a')
    link.href = uri
    link.download = 'Products.csv'
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
                      <td role='cell' className='text-center'>
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
                            <a
                              href='/'
                              data-bs-toggle='modal'
                              data-bs-target='#kt_modal_2'
                              className='menu-link px-3'
                              onClick={(e) => e.preventDefault()}
                            >
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

export default ProductsRemains
