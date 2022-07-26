import React, {useMemo, useContext} from 'react'
import {useIntl} from 'react-intl'
import {useTable, useSortBy, useGlobalFilter, usePagination} from 'react-table'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import Footer from '../../modules/apps/reports/sale/components/Footer'
import {ISaleTable} from '../../modules/apps/reports/sale/models/sale_model'
import {SALE_TABLE_COLUMNS} from '../../modules/apps/reports/sale/types/Columns'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import '../../../_metronic/assets/fonts/Roboto-Regular-normal'
import {HeaderTable} from '../../modules/apps/reports/sale/components/HeaderTable'
import {FilterContext} from '../../../_metronic/layout/components/toolbar/FilterContext'

const SaleTable: React.FC = () => {
  const intl = useIntl()
  const {saleTableItems} = useContext(FilterContext)

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.SALE_TABLE'})}</PageTitle>
      <ItemsContainer items={saleTableItems} />
    </>
  )
}

const ItemsContainer = ({items}: {items: any}) => {
  const intl = useIntl()
  const columns = useMemo(() => SALE_TABLE_COLUMNS, [])
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
        intl.formatMessage({id: 'MONTH_FULL'}),
        intl.formatMessage({id: 'PRODUCT_SALE_TOTAL'}),
        intl.formatMessage({id: 'PRODUCT_EXPENSES'}),
        intl.formatMessage({id: 'PRODUCT_DISCOUNTS'}),
        intl.formatMessage({id: 'PRODUCT_NET'}),
        intl.formatMessage({id: 'PRODUCT_NET_USD'}),
        intl.formatMessage({id: 'PRODUCT_RETURN_TOTAL'}),
        intl.formatMessage({id: 'PRODUCT_RETURN_TOTAL_USD'}),
      ],
    ]

    const data = items.map((item: ISaleTable) => {
      switch (item.date) {
        case 1:
          item.date = intl.formatMessage({id: 'JANUARY_FULL'})
          break
        case 2:
          item.date = intl.formatMessage({id: 'FEBRUARY_FULL'})
          break
        case 3:
          item.date = intl.formatMessage({id: 'MARCH_FULL'})
          break
        case 4:
          item.date = intl.formatMessage({id: 'APRIL_FULL'})
          break
        case 5:
          item.date = intl.formatMessage({id: 'MAY_FULL'})
          break
        case 6:
          item.date = intl.formatMessage({id: 'JUNE_FULL'})
          break
        case 7:
          item.date = intl.formatMessage({id: 'JULY_FULL'})
          break
        case 8:
          item.date = intl.formatMessage({id: 'AUGUST_FULL'})
          break
        case 9:
          item.date = intl.formatMessage({id: 'SEPTEMBER_FULL'})
          break
        case 10:
          item.date = intl.formatMessage({id: 'OCTOBER_FULL'})
          break
        case 11:
          item.date = intl.formatMessage({id: 'NOVEMBER_FULL'})
          break
        case 12:
          item.date = intl.formatMessage({id: 'DECEMBER_FULL'})
          break
      }

      item.total = Math.round(item.total)
      item.discounts = Math.round(item.discounts)
      item.expenses = Math.round(item.expenses)
      item.net = Math.round(item.net)
      item.net_usd = Math.round(item.net_usd)
      item.ret_total = Math.round(item.ret_total)
      item.ret_total_usd = Math.round(item.ret_total_usd)
      return Object.values(item)
    })

    autoTable(doc, {
      head: head,
      body: data,
      styles: {font: 'Roboto-Regular'},
    })
    doc.save('SaleTable.pdf')
  }

  function exportCSV() {
    // const data_type = 'data:application/vnd.ms-excel'
    // const table_div = document.getElementById('productRemains')
    // const table_html = table_div?.outerHTML.replace(/ /g, '%20')
    // const a = document.createElement('a')
    // a.href = data_type + ', ' + table_html
    // a.download = 'Example_Table_To_Excel.xls'
    // a.click()

    let str = `${intl.formatMessage({id: 'MONTH_FULL'})};${intl.formatMessage({
      id: 'PRODUCT_SALE_TOTAL',
    })};${intl.formatMessage({id: 'PRODUCT_EXPENSES'})};${intl.formatMessage({
      id: 'PRODUCT_DISCOUNTS',
    })};${intl.formatMessage({id: 'PRODUCT_NET'})};${intl.formatMessage({
      id: 'PRODUCT_NET_USD',
    })};${intl.formatMessage({id: 'PRODUCT_RETURN_TOTAL'})};${intl.formatMessage({
      id: 'PRODUCT_RETURN_TOTAL_USD',
    })}\n`

    //  Add \ tto prevent tables from displaying scientific notation or other formats
    for (let i = 0; i < items.length; i++) {
      for (let item in items[i]) {
        switch (items[i]['date']) {
          case '1':
            items[i]['date'] = intl.formatMessage({id: 'JANUARY_FULL'})
            break
          case '2':
            items[i]['date'] = intl.formatMessage({id: 'FEBRUARY_FULL'})
            break
          case '3':
            items[i]['date'] = intl.formatMessage({id: 'MARCH_FULL'})
            break
          case '4':
            items[i]['date'] = intl.formatMessage({id: 'APRIL_FULL'})
            break
          case '5':
            items[i]['date'] = intl.formatMessage({id: 'MAY_FULL'})
            break
          case '6':
            items[i]['date'] = intl.formatMessage({id: 'JUNE_FULL'})
            break
          case '7':
            items[i]['date'] = intl.formatMessage({id: 'JULY_FULL'})
            break
          case '8':
            items[i]['date'] = intl.formatMessage({id: 'AUGUST_FULL'})
            break
          case '9':
            items[i]['date'] = intl.formatMessage({id: 'SEPTEMBER_FULL'})
            break
          case '10':
            items[i]['date'] = intl.formatMessage({id: 'OCTOBER_FULL'})
            break
          case '11':
            items[i]['date'] = intl.formatMessage({id: 'NOVEMBER_FULL'})
            break
          case '12':
            items[i]['date'] = intl.formatMessage({id: 'DECEMBER_FULL'})
            break
        }

        items[i]['total'] = Math.round(items[i]['total'])
        items[i]['expenses'] = Math.round(items[i]['expenses'])
        items[i]['discounts'] = Math.round(items[i]['discounts'])
        items[i]['net'] = Math.round(items[i]['net'])
        items[i]['net_usd'] = Math.round(items[i]['net_usd'])
        items[i]['ret_total'] = Math.round(items[i]['ret_total'])
        items[i]['ret_total_usd'] = Math.round(items[i]['ret_total_usd'])

        str += `${items[i][item]};`
      }
      str += '\n'
    }

    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
    let link = document.createElement('a')
    link.href = uri
    link.download = 'SaleTable.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  //@ts-expect-error
  const {globalFilter, pageIndex, pageSize} = state

  return (
    <KTCard>
      <HeaderTable
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

export default SaleTable
