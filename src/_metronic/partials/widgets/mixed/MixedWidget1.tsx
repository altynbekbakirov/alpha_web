/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {ISaleTable} from '../../../../app/modules/apps/reports/sale/models/sale_model'
import {KTSVG} from '../../../helpers'

type Props = {
  className: string
  color: string
}

interface ICompany {
  company: number
  period: number
  warehouse: number
  begdate: string
  enddate: string
}

const MixedWidget1: React.FC<Props> = ({className, color}) => {
  const intl = useIntl()
  const [months, setMonths] = useState<ISaleTable[]>([])

  async function loadValues() {
    if (localStorage.getItem('defaultParams') === null) {
      return null
    }
    return JSON.parse(localStorage.getItem('defaultParams') || '')
  }

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/sales/table`
    let defaultParams: ICompany = {
      company: 1,
      period: 3,
      warehouse: 0,
      begdate: '01.01.2022',
      enddate: '31.12.2022',
    }

    loadValues()
      .then((response) => response)
      .then(function (data) {
        if (data !== null) {
          defaultParams = data
        }
        fetchMonthSales()
      })

    async function fetchMonthSales() {
      const response = await axios.post<ISaleTable[]>(REQUEST_URL, {
        firmno: defaultParams.company,
        periodno: defaultParams.period,
        begdate: defaultParams.begdate,
        enddate: defaultParams.enddate,
        sourceindex: defaultParams.warehouse,
      })
      setMonths(response.data)
    }
  }, [])

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-0'>
        {/* begin::Header */}
        <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-${color}`}>
          {/* begin::Heading */}
          <div className='d-flex flex-stack'>
            <h3 className='m-0 text-white fw-bolder fs-3'>
              {intl.formatMessage({id: 'DASHBOARD_SALES'})}
            </h3>
          </div>
          {/* end::Heading */}
          {/* begin::Balance */}
          <div className='d-flex text-center flex-column text-white pt-8'>
            <span className='fw-bold fs-7'>
              {intl.formatMessage({id: 'DASHBOARD_SALES_TOTAL'})}
            </span>
            <span className='fw-bolder fs-2x pt-1'>
              {months
                .reduce(
                  (a, v) => (a = a + (typeof v.net === 'string' ? parseInt(v.net) : v.net)),
                  0
                )
                .toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
            </span>
          </div>
          {/* end::Balance */}
        </div>
        {/* end::Header */}
        {/* begin::Items */}
        <div
          className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-white'
          style={{marginTop: '-100px'}}
        >
          {/* begin::Item */}
          <div className='d-flex align-items-center mb-6'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTSVG path='/media/icons/duotune/maps/map004.svg' className='svg-icon-1' />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  {intl.formatMessage({id: 'PRODUCT_TOTAL'})} 
                </a>
                <div className='text-gray-400 fw-bold fs-7'>{intl.formatMessage({id: 'DASHBOARD_SALES_DEFINITION'})} </div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>
                  {months
                    .reduce(
                      (a, v) =>
                        (a = a + (typeof v.total === 'string' ? parseInt(v.total) : v.total)),
                      0
                    )
                    .toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                </div>
                <KTSVG
                  path='/media/icons/duotune/arrows/arr066.svg'
                  className='svg-icon-5 svg-icon-success ms-1'
                />
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center mb-6'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-1' />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  {intl.formatMessage({id: 'PRODUCT_DISCOUNTS'})}
                </a>
                <div className='text-gray-400 fw-bold fs-7'>{intl.formatMessage({id: 'DASHBOARD_DISCOUNTS_DEFINITION'})}</div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>
                  {months
                    .reduce(
                      (a, v) =>
                        (a =
                          a +
                          (typeof v.discounts === 'string' ? parseInt(v.discounts) : v.discounts)),
                      0
                    )
                    .toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                </div>
                <KTSVG
                  path='/media/icons/duotune/general/gen024.svg'
                  className='svg-icon-5 svg-icon-danger ms-1'
                />
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center mb-6'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTSVG path='/media/icons/duotune/electronics/elc005.svg' className='svg-icon-1' />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  {intl.formatMessage({id: 'PRODUCT_EXPENSES'})}
                </a>
                <div className='text-gray-400 fw-bold fs-7'>{intl.formatMessage({id: 'DASHBOARD_EXPENSES_DEFINITION'})}</div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>
                  {months
                    .reduce(
                      (a, v) =>
                        (a =
                          a + (typeof v.expenses === 'string' ? parseInt(v.expenses) : v.expenses)),
                      0
                    )
                    .toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                </div>
                <KTSVG
                  path='/media/icons/duotune/arrows/arr066.svg'
                  className='svg-icon-5 svg-icon-success ms-1'
                />
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-1' />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  {intl.formatMessage({id: 'PRODUCT_RETURNS'})}
                </a>
                <div className='text-gray-400 fw-bold fs-7'>{intl.formatMessage({id: 'DASHBOARD_RETURN_DEFINITION'})}</div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>
                  {months
                    .reduce(
                      (a, v) =>
                        (a =
                          a +
                          (typeof v.ret_total === 'string' ? parseInt(v.ret_total) : v.ret_total)),
                      0
                    )
                    .toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                </div>
                <KTSVG
                  path='/media/icons/duotune/arrows/arr065.svg'
                  className='svg-icon-5 svg-icon-danger ms-1'
                />
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
        </div>
        {/* end::Items */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {MixedWidget1}
