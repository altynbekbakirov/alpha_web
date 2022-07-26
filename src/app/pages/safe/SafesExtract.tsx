import React, {FC, useMemo, useContext} from 'react'
import {useIntl} from 'react-intl'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {useTable, useGlobalFilter, useSortBy, usePagination} from 'react-table'
import {PageTitle} from '../../../_metronic/layout/core'
import {ISafeExtract} from '../../modules/apps/reports/safes/models/safes_model'
import {SAFES_EXTRACT_COLUMNS} from '../../modules/apps/reports/safes/types/Columns'
import {KTCard, KTCardBody} from '../../../_metronic/helpers'
import Footer from '../../modules/apps/reports/safes/components/Footer'
import { HeaderExtract } from '../../modules/apps/reports/safes/components/HeaderExtract'
import { FilterContext } from '../../../_metronic/layout/components/toolbar/FilterContext'

const SafesExtract: FC = () => {
  const intl = useIntl()
  const {safeExtractItems} = useContext(FilterContext)    

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.SAFE_EXTRACT'})}</PageTitle>
      <ItemsContainer items={safeExtractItems} />
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
        intl.formatMessage({id: 'DATE'}),
        intl.formatMessage({id: 'SAFE'}),
        intl.formatMessage({id: 'FICHE_NO'}),
        intl.formatMessage({id: 'CLIENT_NAME'}),
        intl.formatMessage({id: 'SAFE_DEFINITION'}),
        intl.formatMessage({id: 'TR_CODE'}),
        intl.formatMessage({id: 'SAFE_EXTRACT_COLLECTION'}),
        intl.formatMessage({id: 'SAFE_EXTRACT_COLLECTION_USD'}),
        intl.formatMessage({id: 'SAFE_EXTRACT_PAYMENT'}),
        intl.formatMessage({id: 'SAFE_EXTRACT_PAYMENT_USD'}),
      ],
    ]

    const data = items.map((item: ISafeExtract) => {
      item.collection = Math.round(item.collection);
      item.collectionUsd = Math.round(item.collectionUsd);
      item.payment = Math.round(item.payment);
      item.paymentUsd = Math.round(item.paymentUsd);

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
        default:
          item.trCode = intl.formatMessage({
            id: 'CLIENT_OTHERS',
          })
      }

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
    })};${intl.formatMessage({
      id: 'SAFE',
    })};${intl.formatMessage({id: 'FICHE_NO'})};${intl.formatMessage({
      id: 'CLIENT_NAME',
    })};${intl.formatMessage({id: 'SAFE_DEFINITION'})};${intl.formatMessage({
      id: 'TR_CODE',
    })};${intl.formatMessage({id: 'SAFE_EXTRACT_COLLECTION'})};${intl.formatMessage({
      id: 'SAFE_EXTRACT_COLLECTION_USD',
    })};${intl.formatMessage({id: 'SAFE_EXTRACT_PAYMENT'})};${intl.formatMessage({
      id: 'SAFE_EXTRACT_PAYMENT_USD',
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

        items[i]['ficheNo'] = items[i]['ficheNo'] + '\t'
        items[i]['collection'] = Math.round(items[i]['collection']);
        items[i]['collectionUsd'] = Math.round(items[i]['collectionUsd']);
        items[i]['payment'] = Math.round(items[i]['payment']);
        items[i]['paymentUsd'] = Math.round(items[i]['paymentUsd']);

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
      <HeaderExtract
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

export default SafesExtract
