/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {useIntl} from 'react-intl'
import axios from 'axios'
import {ISaleManager} from '../../../../app/modules/apps/reports/sale/models/sale_model'

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

const ChartsWidget9: React.FC<Props> = ({className}) => {
  const intl = useIntl()
  const [values, setValues] = useState<ISaleManager[]>([])
  const chartRef = useRef<HTMLDivElement | null>(null)

  async function loadValues() {
    if (localStorage.getItem('defaultParams') === null) {
      return null
    }
    return JSON.parse(localStorage.getItem('defaultParams') || '')
  }

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/sales/manager`
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
      const response = await axios.post<ISaleManager[]>(REQUEST_URL, {
        firmNo: defaultParams.company,
        periodNo: defaultParams.period,
        begDate: defaultParams.begdate,
        endDate: defaultParams.enddate,
        sourceIndex: defaultParams.warehouse,
        filterName: ''
      })
      setValues(response.data)
    }    
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
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='kt_charts_widget_1_chart' style={{height: '350px'}} />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ChartsWidget9}

function getChartOptions(values: ISaleManager[]): ApexOptions {
  return {
    series: values.map((value) =>
      Math.round(typeof value.itemTotal === 'string' ? parseInt(value.itemTotal) : value.itemTotal)
    ),
    chart: {
      width: 380,
      height: 360,
      type: 'pie',
      toolbar: {
        show: true,
      },
    },
    labels: values.map((value) => value.clientName),
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
