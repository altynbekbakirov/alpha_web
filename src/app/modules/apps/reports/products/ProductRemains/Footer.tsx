import React from 'react'
import {useIntl} from 'react-intl'
import {IFooter} from '../models/remains_model'

const Footer: React.FC<IFooter> = ({
  previous,
  next,
  canPrevious,
  canNext,
  pageIndex,
  pageOptions,
  gotoPage,
  pageCount,
  pageSize,
  setPageSize,
  rowCount,
}) => {
  const intl = useIntl()
  let pages: number[] = [pageCount]

  for (let i = 0; i < pageCount; i++) {
    pages[i] = i
  }

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
        <div>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className='form-select'
          >
            {[50, 100, 200, rowCount].map((pageSize) => {
              return (
                <option value={pageSize} key={pageSize}>
                  {pageSize === rowCount ? intl.formatMessage({id: 'PAGE_SIZE_ALL'}) : pageSize}
                </option>
              )
            })}
          </select>
        </div>
        {pageOptions.length > 0 && (
          <div style={{marginLeft: '15px'}}>
            {intl.formatMessage({id: 'PAGE'})} {pageIndex + 1} {intl.formatMessage({id: 'PAGE_OF'})}{' '}
            {pageOptions.length}
          </div>
        )}
      </div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            {canPrevious && (
              <>
                <li className='page-item'>
                  <button className='page-link' onClick={() => gotoPage(0)}>
                    {'<<'}
                  </button>
                </li>
                <li className='page-item'>
                  <button className='page-link' onClick={() => previous()}>
                    {'<'}
                  </button>
                </li>
              </>
            )}
            {pages.length > 1 &&
              pages.map((page) => {
                return (
                  <li key={page} className={`page-item ${page === pageIndex ? 'active' : ''}`}>
                    <a
                      href='/'
                      className='page-link'
                      onClick={(e) => {
                        e.preventDefault()
                        gotoPage(page)
                      }}
                    >
                      {page + 1}
                    </a>
                  </li>
                )
              })}
            {canNext && (
              <>
                <li className='page-item'>
                  <button className='page-link' onClick={() => next()}>
                    {'>'}
                  </button>
                </li>
                <li className='page-item'>
                  <button className='page-link' onClick={() => gotoPage(pageCount - 1)}>
                    {'>>'}
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
