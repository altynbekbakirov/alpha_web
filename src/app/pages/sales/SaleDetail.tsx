import React, {useState, useMemo, useContext} from 'react'
import {useIntl} from 'react-intl'
import {useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table'
import {KTCard, KTCardBody, KTSVG} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import Footer from '../../modules/apps/reports/sale/components/Footer'
import {ISaleDetail} from '../../modules/apps/reports/sale/models/sale_model'
import {SALE_DETAIL_COLUMNS} from '../../modules/apps/reports/sale/types/Columns'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import '../../../_metronic/assets/fonts/Roboto-Regular-normal'
import { FilterContext } from '../../../_metronic/layout/components/toolbar/FilterContext'
import { HeaderDetail } from '../../modules/apps/reports/sale/components/HeaderDetail'

const SaleDetail: React.FC = () => {
  const intl = useIntl()
  const {saleDetailItems} = useContext(FilterContext)

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.SALE_DETAIL'})}</PageTitle>
      <ItemsContainer items={saleDetailItems} />
    </>
  )
}

const ItemsContainer = ({items}: {items: any}) => {
  const intl = useIntl()
  const columns = useMemo(() => SALE_DETAIL_COLUMNS, [])
  const data = useMemo(() => items, [items])
  const [show, setShow] = useState(false)
  const [showPrice, setShowPrice] = useState(false)
  const [item, setItem] = useState('')

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
        intl.formatMessage({id: 'PRODUCT_CODE'}),
        intl.formatMessage({id: 'PRODUCT_NAME'}),
        intl.formatMessage({id: 'PRODUCT_GROUP'}),
        intl.formatMessage({id: 'PRODUCT_RETURN_COUNT'}),
        intl.formatMessage({id: 'PRODUCT_RETURN_TOTAL'}),
        intl.formatMessage({id: 'PRODUCT_RETURN_COST'}),
        intl.formatMessage({id: 'PRODUCT_SALE_COUNT'}),
        intl.formatMessage({id: 'PRODUCT_SALE_TOTAL'}),
        intl.formatMessage({id: 'PRODUCT_SALE_COST'}),
        intl.formatMessage({id: 'PRODUCT_PROFIT_TOTAL'}),
        intl.formatMessage({id: 'PRODUCT_PROFIT_PERCENT'}),
      ],
    ]

    const data = items.map((item: ISaleDetail) => {
      return Object.values(item)
    })

    autoTable(doc, {
      head: head,
      body: data,
      styles: {font: 'Roboto-Regular'},
    })
    doc.save('SaleDetail.pdf')
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
      id: 'PRODUCT_RETURN_COUNT',
    })};${intl.formatMessage({id: 'PRODUCT_RETURN_TOTAL'})};${intl.formatMessage({
      id: 'PRODUCT_RETURN_COST',
    })};${intl.formatMessage({id: 'PRODUCT_SALE_COUNT'})};${intl.formatMessage({
      id: 'PRODUCT_SALE_TOTAL',
    })};${intl.formatMessage({id: 'PRODUCT_SALE_COST'})};${intl.formatMessage({
      id: 'PRODUCT_PROFIT_TOTAL',
    })};${intl.formatMessage({id: 'PRODUCT_PROFIT_PERCENT'})}\n`

    //  Add \ tto prevent tables from displaying scientific notation or other formats
    for (let i = 0; i < items.length; i++) {
      for (let item in items[i]) {
        items[i]['code'] = items[i]['code'] + '\t'
        items[i]['retTotal'] = Math.round(items[i]['retTotal'])
        items[i]['retCost'] = Math.round(items[i]['retCost'])
        items[i]['saleTotal'] = Math.round(items[i]['saleTotal'])
        items[i]['saleCost'] = Math.round(items[i]['saleCost'])
        items[i]['profitTotal'] = Math.round(items[i]['profitTotal'])

        str += `${items[i][item]};`
      }
      str += '\n'
    }

    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
    let link = document.createElement('a')
    link.href = uri
    link.download = 'SaleDetail.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  //@ts-expect-error
  const {globalFilter, pageIndex, pageSize} = state

  return (
    <KTCard>
      <HeaderDetail
        value={globalFilter}
        change={setGlobalFilter}
        exportPDF={exportPDF}
        exportCSV={exportCSV}
        show={show}
        setShow={() => setShow(!show)}
        item={item}
        showPrice={showPrice}
        setShowPrice={() => setShowPrice(!showPrice)}
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
                      if (cell.render('Cell').props.column.Header === 'PRODUCT_CODE') {
                        currentCode = cell.render('Cell').props.cell.value
                      }
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                    <td role='cell' className='text-end min-w-100px'>
                      <div className='d-flex justify-content-end flex-shrink-0'>
                        <a
                          href='/'
                          className='btn btn-icon btn-bg-secondary btn-active-color-primary btn-sm me-1'
                          onClick={(e) => {
                            e.preventDefault()
                            setShow(!show)
                            setItem(currentCode)
                          }}
                          title={`${intl.formatMessage({id: 'ACTIONS_MATERIAL_TRANSACTIONS'})}`}
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen019.svg'
                            className='svg-icon-3'
                          />
                        </a>
                        <a
                          href='/'
                          className='btn btn-icon btn-bg-secondary btn-active-color-primary btn-sm'
                          onClick={(e) => {
                            e.preventDefault()
                            setShowPrice(!showPrice)
                            setItem(currentCode)
                          }}
                          title={`${intl.formatMessage({id: 'ACTIONS_VIEW_PRICES'})}`}
                        >
                          <KTSVG
                            path='/media/icons/duotune/finance/fin010.svg'
                            className='svg-icon-3'
                          />
                        </a>
                      </div>
                    </td>
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

export default SaleDetail
