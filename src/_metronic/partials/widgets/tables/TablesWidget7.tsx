/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {ISaleFiche} from '../../../../app/modules/apps/reports/sale/models/sale_model'
import {KTSVG} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className: string
}

const TablesWidget7: React.FC<Props> = ({className}) => {
  const [fiches, setFiches] = useState<ISaleFiche[]>([])
  const intl = useIntl()  

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/sales`

    async function fetchMonthSales() {
      const response = await axios.post<ISaleFiche[]>(REQUEST_URL, {
        firmno: 1,
        periodno: 3,
        begdate: '01.01.2022',
        enddate: '31.12.2022',
        sourceindex: 0,
      })
      setFiches(response.data)
    }
    fetchMonthSales()
  }, [])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>{intl.formatMessage({id: 'DASHBOARD_LATEST_SALES'})}</span>
          <span className='text-muted mt-1 fw-bold fs-7'>{intl.formatMessage({id: 'DASHBOARD_LATEST_SALES_DESCRIPTION'})}</span>
        </h3>
        <div className='card-toolbar'>
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          <Dropdown1 />
        </div>
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
                    <th className='p-0 min-w-140px text-center'>
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
                            {fiche.managerName}
                          </span>
                        </td>
                        <td className='text-center'>{fiche.discounts}</td>
                        <td className='text-center'>{fiche.expenses}</td>
                        <td className='text-center'>
                          <span className='badge badge-success fs-7 fw-bolder'>
                            {fiche.net.toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </span>
                        </td>
                        <td className='text-center'>
                          <span className='badge badge-info fs-7 fw-bolder'>
                            {fiche.netUsd.toLocaleString(undefined, {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
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
          {/* begin::Tap pane */}
          <div className='tab-pane fade' id='kt_table_widget_7_tab_2'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table align-middle gs-0 gy-3'>
                {/* begin::Table head */}
                <thead>
                  <tr>
                    <th className='p-0 w-50px'></th>
                    <th className='p-0 min-w-150px'></th>
                    <th className='p-0 min-w-140px'></th>
                    <th className='p-0 min-w-120px'></th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  <tr>
                    <td>
                      <div className='symbol symbol-50px me-2'>
                        <span className='symbol-label bg-light-info'>
                          <KTSVG
                            path='/media/icons/duotune/abstract/abs042.svg'
                            className='svg-icon-2x svg-icon-info'
                          />
                        </span>
                      </div>
                    </td>
                    <td>
                      <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                        Strawberry Boxes
                      </a>
                      <span className='text-muted fw-bold d-block fs-7'>From Spain</span>
                    </td>
                    <td className='text-end'>
                      <span className='text-muted fw-bold d-block fs-8'>Ordered</span>
                      <span className='text-dark fw-bolder d-block fs-7'>4 week ago</span>
                    </td>
                    <td className='text-end'>
                      <span className='badge badge-light-info fs-7 fw-bolder'>Delivered</span>
                    </td>
                    <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                      >
                        <i className='bi bi-three-dots fs-5'></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='symbol symbol-50px me-2'>
                        <span className='symbol-label bg-light-danger'>
                          <KTSVG
                            path='/media/icons/duotune/general/gen024.svg'
                            className='svg-icon-2x svg-icon-danger'
                          />
                        </span>
                      </div>
                    </td>
                    <td>
                      <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                        Special Meal
                      </a>
                      <span className='text-muted fw-bold d-block fs-7'>Quona Rice</span>
                    </td>
                    <td className='text-end'>
                      <span className='text-muted fw-bold d-block fs-8'>Ordered</span>
                      <span className='text-dark fw-bolder d-block fs-7'>2 week ago</span>
                    </td>
                    <td className='text-end'>
                      <span className='badge badge-light-danger fs-7 fw-bolder'>Delivered</span>
                    </td>
                    <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                      >
                        <i className='bi bi-three-dots fs-5'></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='symbol symbol-50px me-2'>
                        <span className='symbol-label bg-light-warning'>
                          <KTSVG
                            path='/media/icons/duotune/abstract/abs027.svg'
                            className='svg-icon-2x svg-icon-warning'
                          />
                        </span>
                      </div>
                    </td>
                    <td>
                      <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                        Active Customers
                      </a>
                      <span className='text-muted fw-bold d-block fs-7'>Best Customers</span>
                    </td>
                    <td className='text-end'>
                      <span className='text-muted fw-bold d-block fs-8'>Ordered</span>
                      <span className='text-dark fw-bolder d-block fs-7'>5 week ago</span>
                    </td>
                    <td className='text-end'>
                      <span className='badge badge-light-warning fs-7 fw-bolder'>Delivered</span>
                    </td>
                    <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                      >
                        <i className='bi bi-three-dots fs-5'></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}
          {/* begin::Tap pane */}
          <div className='tab-pane fade' id='kt_table_widget_7_tab_3'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table align-middle gs-0 gy-3'>
                {/* begin::Table head */}
                <thead>
                  <tr>
                    <th className='p-0 w-50px'></th>
                    <th className='p-0 min-w-150px'></th>
                    <th className='p-0 min-w-140px'></th>
                    <th className='p-0 min-w-120px'></th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  <tr>
                    <td>
                      <div className='symbol symbol-50px me-2'>
                        <span className='symbol-label bg-light-success'>
                          <KTSVG
                            path='/media/icons/duotune/ecommerce/ecm002.svg'
                            className='svg-icon-2x svg-icon-success'
                          />
                        </span>
                      </div>
                    </td>
                    <td>
                      <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                        Media Device
                      </a>
                      <span className='text-muted fw-bold d-block fs-7'>
                        Voice and video recorder
                      </span>
                    </td>
                    <td className='text-end'>
                      <span className='text-muted fw-bold d-block fs-8'>Ordered</span>
                      <span className='text-dark fw-bolder d-block fs-7'>3 month ago</span>
                    </td>
                    <td className='text-end'>
                      <span className='badge badge-light-success fs-7 fw-bolder'>Delivered</span>
                    </td>
                    <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                      >
                        <i className='bi bi-three-dots fs-5'></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='symbol symbol-50px me-2'>
                        <span className='symbol-label bg-light-danger'>
                          <KTSVG
                            path='/media/icons/duotune/general/gen024.svg'
                            className='svg-icon-2x svg-icon-danger'
                          />
                        </span>
                      </div>
                    </td>
                    <td>
                      <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                        Special Meal
                      </a>
                      <span className='text-muted fw-bold d-block fs-7'>Quona Rice</span>
                    </td>
                    <td className='text-end'>
                      <span className='text-muted fw-bold d-block fs-8'>Ordered</span>
                      <span className='text-dark fw-bolder d-block fs-7'>5 month ago</span>
                    </td>
                    <td className='text-end'>
                      <span className='badge badge-light-danger fs-7 fw-bolder'>Delivered</span>
                    </td>
                    <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                      >
                        <i className='bi bi-three-dots fs-5'></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='symbol symbol-50px me-2'>
                        <span className='symbol-label bg-light-warning'>
                          <KTSVG
                            path='/media/icons/duotune/abstract/abs027.svg'
                            className='svg-icon-2x svg-icon-warning'
                          />
                        </span>
                      </div>
                    </td>
                    <td>
                      <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                        Active Customers
                      </a>
                      <span className='text-muted fw-bold d-block fs-7'>Best Customers</span>
                    </td>
                    <td className='text-end'>
                      <span className='text-muted fw-bold d-block fs-8'>Ordered</span>
                      <span className='text-dark fw-bolder d-block fs-7'>6 month ago</span>
                    </td>
                    <td className='text-end'>
                      <span className='badge badge-light-warning fs-7 fw-bolder'>Delivered</span>
                    </td>
                    <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                      >
                        <i className='bi bi-three-dots fs-5'></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='symbol symbol-50px me-2'>
                        <span className='symbol-label bg-light-info'>
                          <KTSVG
                            path='/media/icons/duotune/abstract/abs042.svg'
                            className='svg-icon-2x svg-icon-info'
                          />
                        </span>
                      </div>
                    </td>
                    <td>
                      <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                        Strawberry Boxes
                      </a>
                      <span className='text-muted fw-bold d-block fs-7'>From Spain</span>
                    </td>
                    <td className='text-end'>
                      <span className='text-muted fw-bold d-block fs-8'>Ordered</span>
                      <span className='text-dark fw-bolder d-block fs-7'>4 month ago</span>
                    </td>
                    <td className='text-end'>
                      <span className='badge badge-light-info fs-7 fw-bolder'>Delivered</span>
                    </td>
                    <td className='text-end'>
                      <a
                        href='#'
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                      >
                        <i className='bi bi-three-dots fs-5'></i>
                      </a>
                    </td>
                  </tr>
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
