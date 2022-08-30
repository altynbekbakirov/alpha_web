/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  ChartsWidget1,
  ChartsWidget2,
  ChartsWidget4,
  ChartsWidget6,
  MixedWidget1,
  MixedWidget10,
  MixedWidget11,
  TablesWidget7,
  TablesWidget8,
} from '../../../_metronic/partials/widgets'
import {ChartsWidget9} from '../../../_metronic/partials/widgets/charts/ChartsWidget9'

const DashboardPage: React.FC = () => (
  <>
    {/* begin::Row */}
    <div className='row g-5 g-xl-8'>
      <div className='col-xl-8'>
        <ChartsWidget2 className='card-xl-stretch mb-5 mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ChartsWidget9 className='card-xl-stretch mb-5 mb-xl-8' />
      </div>
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row g-5 g-xl-8'>
      {/* begin::Col */}
      <div className='col-xl-8'>
        <ChartsWidget1 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <MixedWidget1 className='card-xl-stretch mb-xl-8' color='info' />
      </div>
      {/* end::Col */}
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row g-5 g-xl-8'>
      {/* begin::Col */}
      <div className='col-xl-8'>
        <ChartsWidget6 className='card-xl-stretch mb-5 mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <MixedWidget10
          className='card-xl-stretch mb-xl-8'
          chartColor='warning'
          chartHeight='200px'
        />
      </div>
      {/* end::Col */}
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row g-5 g-xl-8'>
      {/* begin::Col */}
      <div className='col-xl-8'>
        <ChartsWidget4 className='card-xl-stretch mb-5 mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <MixedWidget11 className='card-xl-stretch mb-xl-8' chartColor='info' chartHeight='320px' />
      </div>
      {/* end::Col */}
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row g-5 g-xl-8'>
      {/* begin::Col */}
      <div className='col-xl-6'>
        <TablesWidget7 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-6'>
        <TablesWidget8 className='card-xl-stretch mb-5 mb-xl-8' />
      </div>
      {/* end::Col */}
    </div>
    {/* end::Row */}

    {/* <div className='row g-5 g-xl-8'>
      <div className='col-xl-4'>
        <div className='card card-flush h-md-100'>
          <div className='card-header flex-nowrap pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bolder text-dark'>Top Selling Categories</span>
              <span className='text-gray-400 pt-2 fw-bold fs-6'>8k social visitors</span>
            </h3>
            <div className='card-toolbar'>
              <button
                className='btn btn-icon btn-color-gray-400 btn-active-color-primary justify-content-end'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-overflow='true'
              >
                <span className='svg-icon svg-icon-1 svg-icon-gray-300 me-n1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <rect
                      opacity='0.3'
                      x='2'
                      y='2'
                      width='20'
                      height='20'
                      rx='4'
                      fill='currentColor'
                    />
                    <rect x='11' y='11' width='2.6' height='2.6' rx='1.3' fill='currentColor' />
                    <rect x='15' y='11' width='2.6' height='2.6' rx='1.3' fill='currentColor' />
                    <rect x='7' y='11' width='2.6' height='2.6' rx='1.3' fill='currentColor' />
                  </svg>
                </span>
              </button>
              <div
                className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px'
                data-kt-menu='true'
              >
                <div className='menu-item px-3'>
                  <div className='menu-content fs-6 text-dark fw-bolder px-3 py-4'>
                    Quick Actions
                  </div>
                </div>
                <div className='separator mb-3 opacity-75'></div>
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    New Ticket
                  </a>
                </div>
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    New Customer
                  </a>
                </div>
                <div
                  className='menu-item px-3'
                  data-kt-menu-trigger='hover'
                  data-kt-menu-placement='right-start'
                >
                  <a href='#' className='menu-link px-3'>
                    <span className='menu-title'>New Group</span>
                    <span className='menu-arrow'></span>
                  </a>
                  <div className='menu-sub menu-sub-dropdown w-175px py-4'>
                    <div className='menu-item px-3'>
                      <a href='#' className='menu-link px-3'>
                        Admin Group
                      </a>
                    </div>
                    <div className='menu-item px-3'>
                      <a href='#' className='menu-link px-3'>
                        Staff Group
                      </a>
                    </div>
                    <div className='menu-item px-3'>
                      <a href='#' className='menu-link px-3'>
                        Member Group
                      </a>
                    </div>
                  </div>
                </div>
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    New Contact
                  </a>
                </div>
                <div className='separator mt-3 opacity-75'></div>
                <div className='menu-item px-3'>
                  <div className='menu-content px-3 py-3'>
                    <a className='btn btn-primary btn-sm px-4' href='#'>
                      Generate Reports
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card-body pt-5 ps-6'>
            <div id='kt_charts_widget_5' className='min-h-auto'></div>
          </div>
        </div>
      </div>
    </div> */}
  </>
)

const DashboardWrapper: React.FC = () => {
  const intl = useIntl()

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
