/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {useIntl} from 'react-intl'
import axios from 'axios'
import {ISaleWare} from '../../../../app/modules/apps/reports/sale/models/sale_model'
import {getCSS} from '../../../assets/ts/_utils'

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

const ChartsWidget10: React.FC<Props> = ({className}) => {
  const intl = useIntl()
  const [values, setValues] = useState<ISaleWare[]>([])
  const chartRef = useRef<HTMLDivElement | null>(null)

  async function loadValues() {
    if (localStorage.getItem('defaultParams') === null) {
      return null
    }
    return JSON.parse(localStorage.getItem('defaultParams') || '')
  }

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/sales/ware`
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
      const response = await axios.post<ISaleWare[]>(REQUEST_URL, {
        firmNo: defaultParams.company,
        periodNo: defaultParams.period,
        begDate: defaultParams.begdate,
        endDate: defaultParams.enddate,
        sourceIndex: defaultParams.warehouse,
        filterName: '',
      })
      setValues(response.data)
    }
  }, [])

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(chartRef.current, getChartOptions(height, values))
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
            {intl.formatMessage({id: 'DASHBOARD_SALES_WAREHOUSE_DESCRIPTION'})}
          </span>
        </h3>
        {/* end::Title */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='kt_charts_widget_1_chart' style={{height: '200px'}} />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ChartsWidget10}

function getChartOptions(height: number, values: ISaleWare[]): ApexOptions {
  return {
    series: values.map((value) =>
      Math.round(typeof value.itemTotal === 'string' ? parseInt(value.itemTotal) : value.itemTotal)
    ),
    chart: {
      fontFamily: 'inherit',
      type: 'pie',      
      toolbar: {
        show: true,
      },
    },
    legend: {
      show: true,
      horizontalAlign: 'left',
      showForSingleSeries: true,
      position: 'bottom', 
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    labels: values.map((value) => value.wareName),
    responsive: [
      {
        breakpoint: 300,
        options: {
          chart: {
            width: 280,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  }
}
