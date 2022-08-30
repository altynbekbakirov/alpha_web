/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'
import {useIntl} from 'react-intl'
import {ISaleClientTop} from '../../../../app/modules/apps/reports/sale/models/sale_model'
import axios from 'axios'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
}

interface ICompany {
  company: number
  period: number
  warehouse: number
  begdate: string
  enddate: string
}

const MixedWidget11: React.FC<Props> = ({className, chartColor, chartHeight}) => {
  const intl = useIntl()
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [sales, setSales] = useState<ISaleClientTop[]>([])
  const total = intl.formatMessage({id: 'PRODUCT_SALE_TOTAL'})
  const totalUsd = intl.formatMessage({id: 'PRODUCT_SALE_TOTAL_USD'})
  const [active, setActive] = useState<number>(1)

  async function loadValues() {
    if (localStorage.getItem('defaultParams') === null) {
      return null
    }
    return JSON.parse(localStorage.getItem('defaultParams') || '')
  }

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/sales/client/top`
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
      const response = await axios.post<ISaleClientTop[]>(REQUEST_URL, {
        firmno: defaultParams.company,
        periodno: defaultParams.period,
        begdate: defaultParams.begdate,
        enddate: defaultParams.enddate,
        sourceindex: defaultParams.warehouse,
      })
      setSales(response.data)
    }
  }, [])

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    active === 1 ? sales.sort(compareTotal) : sales.sort(compareTotalUsd)

    const height = parseInt(getCSS(chartRef.current, 'height'))
    const chart = new ApexCharts(
      chartRef.current,
      chartOptions(chartColor, chartHeight, height, sales, total, active)
    )
    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, sales, total, totalUsd, active])

  function compareTotal(a: ISaleClientTop, b: ISaleClientTop) {
    if (a.itemTotal > b.itemTotal) {
      return -1
    }
    if (a.itemTotal < b.itemTotal) {
      return 1
    }
    return 0
  }

  function compareTotalUsd(a: ISaleClientTop, b: ISaleClientTop) {
    if (a.itemTotalUsd > b.itemTotalUsd) {
      return -1
    }
    if (a.itemTotalUsd < b.itemTotalUsd) {
      return 1
    }
    return 0
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>
            {' '}
            {intl.formatMessage({id: 'DASHBOARD_CUSTOMERS'})}
          </span>

          <span className='text-muted fw-bold fs-7'>
            {' '}
            {intl.formatMessage({id: 'DASHBOARD_CUSTOMERS_SALES_DESCRIPTION'})}
          </span>
        </h3>

        {/* begin::Toolbar */}
        <div className='card-toolbar' data-kt-buttons='true'>
          <a
            onClick={() => setActive(1)}
            className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${
              active === 1 ? 'active' : ''
            }`}
          >
            {intl.formatMessage({id: 'CURRENCY_COM'})}
          </a>

          <a
            onClick={() => setActive(2)}
            className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${
              active === 2 ? 'active' : ''
            }`}
          >
            {intl.formatMessage({id: 'CURRENCY_USD'})}
          </a>
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} className='mixed-widget-10-chart' style={{height: '350px'}}></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

const chartOptions = (
  chartColor: string,
  chartHeight: string,
  height: number,
  sales: ISaleClientTop[],
  total: string,
  active: number
): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')
  const secondaryColor = getCSSVariableValue('--bs-gray-300')
  const baseColor = getCSSVariableValue('--bs-' + chartColor)

  return {
    series: [
      {
        name: total,
        data: sales
          .map((value) =>
            active === 1 ? Math.round(value.itemTotal) : Math.round(value.itemTotalUsd)
          )
          .slice(0, 10),
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: height,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: sales.map((value) => value.clientName).slice(0, 10),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      type: 'solid',
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return active === 1
            ? val.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            : val.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      padding: {
        top: 10,
      },
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  }
}

export {MixedWidget11}
