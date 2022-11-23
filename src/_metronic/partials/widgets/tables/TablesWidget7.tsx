/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {ISaleFiche} from '../../../../app/modules/apps/reports/sale/models/sale_model'
import {KTSVG} from '../../../helpers'

type Props = {
  className: string
}

interface ICompany {
  company: number
  period: number
  warehouse: number
  begdate: string
  enddate: string
}

const TablesWidget7: React.FC<Props> = ({className}) => {
  const [fiches, setFiches] = useState<ISaleFiche[]>([])
  const intl = useIntl()

  async function loadValues() {
    if (localStorage.getItem('defaultParams') === null) {
      return null
    }
    return JSON.parse(localStorage.getItem('defaultParams') || '')
  }

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/sales`
    let defaultParams: ICompany

    loadValues()
      .then((response) => response)
      .then(function (data) {
        if (data !== null) {
          defaultParams = data
        }
        fetchMonthSales()
      })

    async function fetchMonthSales() {
      const response = await axios.post<ISaleFiche[]>(REQUEST_URL, {
        firmNo: defaultParams.company,
        periodNo: defaultParams.period,
        begDate: defaultParams.begdate,
        endDate: defaultParams.enddate,
        sourceIndex: defaultParams.warehouse,
        filterName: '',
        operationType: '2, 3, 7, 8',
      })
      setFiches(response.data)
    }
  }, [])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>
            {intl.formatMessage({id: 'DASHBOARD_SALES'})}
          </span>
          <span className='text-muted mt-1 fw-bold fs-7'>
            {intl.formatMessage({id: 'DASHBOARD_LATEST_SALES_DESCRIPTION'})}
          </span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        <div className='tab-content'>
          {/* begin::Tap pane */}
          <div className='tab-pane fade show active' id='kt_table_widget_7_tab_1'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table align-middle gs-0 gy-3'>
                {/* begin::Table head */}
                <thead>
                  <tr>
                    <th className='p-0 w-50px'></th>
                    <th className='p-0 min-w-150px'>
                      <span className='text-muted mt-1 fw-bold fs-7'>
                        {intl.formatMessage({id: 'CLIENT_NAME'})}
                      </span>
                    </th>
                    <th className='p-0 min-w-120px text-center'>
                      <span className='text-muted mt-1 fw-bold fs-7'>
                        {intl.formatMessage({id: 'PRODUCT_DISCOUNTS'})}
                      </span>
                    </th>
                    <th className='p-0 min-w-120px text-center'>
                      <span className='text-muted mt-1 fw-bold fs-7'>
                        {intl.formatMessage({id: 'PRODUCT_EXPENSES'})}
                      </span>
                    </th>
                    <th className='p-0 min-w-120px text-center'>
                      <span className='text-muted mt-1 fw-bold fs-7'>
                        {intl.formatMessage({id: 'TOTAL_SUM'})}
                      </span>
                    </th>
                    <th className='p-0 min-w-120px text-center'>
                      <span className='text-muted mt-1 fw-bold fs-7'>
                        {intl.formatMessage({id: 'TOTAL_SUM_USD'})}
                      </span>
                    </th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {fiches
                    .map((fiche, index) => (
                      <tr key={index}>
                        <td>
                          <div className='symbol symbol-50px me-2'>
                            {fiche.clientCode?.startsWith('100') ? (
                              <span className='symbol-label bg-light-success'>
                                <KTSVG
                                  path='/media/icons/duotune/coding/cod003.svg'
                                  className='svg-icon-2x svg-icon-danger'
                                />
                              </span>
                            ) : fiche.clientCode?.startsWith('200') ? (
                              <span className='symbol-label bg-light-info'>
                                <KTSVG
                                  path='/media/icons/duotune/coding/cod001.svg'
                                  className='svg-icon-2x svg-icon-info'
                                />
                              </span>
                            ) : fiche.clientCode?.startsWith('300') ? (
                              <span className='symbol-label bg-light-primary'>
                                <KTSVG
                                  path='/media/icons/duotune/coding/cod007.svg'
                                  className='svg-icon-2x svg-icon-primary'
                                />
                              </span>
                            ) : fiche.clientCode?.startsWith('600') ? (
                              <span className='symbol-label bg-light-danger'>
                                <KTSVG
                                  path='/media/icons/duotune/coding/cod006.svg'
                                  className='svg-icon-2x svg-icon-danger'
                                />
                              </span>
                            ) : (
                              <span className='symbol-label bg-light-secondary'>
                                <KTSVG
                                  path='/media/icons/duotune/coding/cod008.svg'
                                  className='svg-icon-2x svg-icon-secondary'
                                />
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                            {fiche.clientName}
                          </span>

                          <span className='text-muted fw-bold d-block fs-7'>
                            <strong>{fiche.managerName}</strong> ({fiche.date})
                          </span>
                        </td>
                        <td className='text-center'>{fiche.discounts}</td>
                        <td className='text-center'>{fiche.expenses}</td>
                        <td className='text-center'>
                          <span className={`badge ${fiche.net > 0 ? 'badge-success' : 'badge-danger'} fs-7 fw-bolder`}>
                            {fiche.net.toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </td>
                        <td className='text-center'>
                          <span className={`badge ${fiche.netUsd > 0 ? 'badge-info' : 'badge-warning'} fs-7 fw-bolder`}>
                            {fiche.netUsd.toLocaleString(undefined, {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </td>
                      </tr>
                    ))
                    .reverse()
                    .slice(0, 5)}
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export {TablesWidget7}
