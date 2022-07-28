/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {KTSVG} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {useIntl} from 'react-intl'
import axios from 'axios'
import {ISaleManager} from '../../../../app/modules/apps/reports/sale/models/sale_model'

type Props = {
  className: string
}

const ChartsWidget9: React.FC<Props> = ({className}) => {
  const intl = useIntl()
  const [values, setValues] = useState<ISaleManager[]>([])
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/sales/manager`

    async function fetchMonthSales() {
      const response = await axios.post<ISaleManager[]>(REQUEST_URL, {
        firmno: 1,
        periodno: 3,
        begdate: '01.01.2022',
        enddate: '31.12.2022',
        sourceindex: 0,
      })
      setValues(response.data)
    }
    fetchMonthSales()
  }, [])

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, getChartOptions(values))
    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, values])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        {/* begin::Title */}
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>
            {intl.formatMessage({id: 'DASHBOARD_SALES'})}
          </span>

          <span className='text-muted fw-bold fs-7'>
            {intl.formatMessage({id: 'DASHBOARD_SALES_MANAGER_DESCRIPTION'})}
          </span>
        </h3>
        {/* end::Title */}

        {/* begin::Toolbar */}
        <div className='card-toolbar'>
          {/* begin::Menu */}
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
          {/* end::Menu */}
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='kt_charts_widget_1_chart' />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ChartsWidget9}

function getChartOptions(values : ISaleManager[]): ApexOptions {
  return {
    series: values.map(value => Math.round(value.itemTotal)),
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: values.map(value => value.clientName),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  }
}