/* eslint-disable jsx-a11y/anchor-is-valid */
import ApexCharts, {ApexOptions} from 'apexcharts'
import axios from 'axios'
import React, {useEffect, useRef, useState} from 'react'
import {useIntl} from 'react-intl'
import {ISaleTable} from '../../../../app/modules/apps/reports/sale/models/sale_model'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'

type Props = {
  className: string
}

const TablesWidget14: React.FC<Props> = ({className}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const chartRef2 = useRef<HTMLDivElement | null>(null)

  const intl = useIntl()
  const [items, setItems] = useState<ISaleTable[]>([])

  const net_title = intl.formatMessage({id: 'TOTAL_SUM'})
  const net_usd_title = intl.formatMessage({id: 'TOTAL_SUM_USD'})

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/sales/table`

    async function fetchMonthSales() {
      const response = await axios.post<ISaleTable[]>(REQUEST_URL, {
        firmno: 1,
        periodno: 3,
        begdate: '01.01.2022',
        enddate: '31.12.2022',
        sourceindex: 0,
      })
      setItems(response.data)
    }
    fetchMonthSales()
  }, [])

  useEffect(() => {
    const net_usd = items.map((item) =>
      Math.round(typeof item.net_usd === 'string' ? parseInt(item.net_usd) : item.net_usd)
    )
    const ret_total_usd = items.map((item) =>
      Math.round(typeof item.net === 'string' ? parseInt(item.net) : item.net)
    )
    const months = items.map((item) => {
      switch (item.date) { 
        case '1':
          return intl.formatMessage({id: 'JANUARY'})
        case '2':
          return intl.formatMessage({id: 'FEBRUARY'})
        case '3':
          return intl.formatMessage({id: 'MARCH'})
        case '4':
          return intl.formatMessage({id: 'APRIL'})
        case '5':
          return intl.formatMessage({id: 'MAY'})
        case '6':
          return intl.formatMessage({id: 'JUNE'})
        case '7':
          return intl.formatMessage({id: 'JULY'})
        case '8':
          return intl.formatMessage({id: 'AUGUST'})
        case '9':
          return intl.formatMessage({id: 'SEPTEMBER'})
        case '10':
          return intl.formatMessage({id: 'OCTOBER'})
        case '11':
          return intl.formatMessage({id: 'NOVEMBER'})
        case '12':
          return intl.formatMessage({id: 'DECEMBER'})
        default:
          return ''
      }
    })

    if (!chartRef.current) {
      return
    }

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(height, net_usd, ret_total_usd, net_usd_title, net_title, months)
    )
    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, items, net_usd_title, net_title, intl])

  useEffect(() => {
    if (!chartRef2.current) {
      return
    }

    const height2 = parseInt(getCSS(chartRef2.current, 'height'))

    const chart2 = new ApexCharts(chartRef2.current, getChartOptions2(height2))
    if (chart2) {
      chart2.render()
    }

    return () => {
      if (chart2) {
        chart2.destroy()
      }
    }
  }, [chartRef2])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>
            {intl.formatMessage({id: 'DASHBOARD_SALES'})}
          </span>
          <span className='text-muted mt-1 fw-bold fs-7'>
            {intl.formatMessage({id: 'DASHBOARD_SALES_DESCRIPTION'})}
          </span>
        </h3>
        <div className='card-toolbar'>
          <ul className='nav'>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bolder px-4 me-1'
                data-bs-toggle='tab'
                href='#kt_table_widget_14_tab_1'
              >
                {intl.formatMessage({id: 'DASHBOARD_SALES_YEAR'})}
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4 me-1'
                data-bs-toggle='tab'
                href='#kt_table_widget_14_tab_2'
              >
                {intl.formatMessage({id: 'DASHBOARD_SALES_WEEK'})}
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        <div className='tab-content'>
          {/* begin::Tap pane */}
          <div className='tab-pane fade show active' id='kt_table_widget_14_tab_1'>
            {/* begin::Table container */}
            <div ref={chartRef} id='kt_charts_widget_14' style={{height: '350px'}}></div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}
          {/* begin::Tap pane */}
          <div className='tab-pane fade' id='kt_table_widget_14_tab_2'>
            {/* begin::Table container */}
            <div ref={chartRef2} id='kt_charts_widget_15' style={{height: '350px'}}></div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export {TablesWidget14}

function getChartOptions(
  height: number,
  net_usd: number[],
  ret_total_usd: number[],
  net_usd_title: string,
  net_title: string,
  months: string[]
): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-700')
  const borderColor = getCSSVariableValue('--bs-gray-300')
  const baseColor = getCSSVariableValue('--bs-warning')
  const secondaryColor = getCSSVariableValue('--bs-success')
  const thirdColor = getCSSVariableValue('--bs-primary')

  return {
    series: [
      {
        name: net_usd_title,
        data: net_usd,
      },
      {
        name: net_title,
        data: ret_total_usd,
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
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
      categories: months,
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
      opacity: 1,
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
          return val.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
        },
      },
    },
    colors: [baseColor, secondaryColor, thirdColor],
    grid: {
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

function getChartOptions2(height2: number): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-700')
  const borderColor = getCSSVariableValue('--bs-gray-300')
  const baseColor = getCSSVariableValue('--bs-warning')
  const secondaryColor = getCSSVariableValue('--bs-success')
  const thirdColor = getCSSVariableValue('--bs-primary')

  return {
    series: [
      {
        name: 'sum',
        data: [5, 10, 15, 20, 25, 30],
      },
      {
        name: 'return',
        data: [5, 10, 15, 20, 25, 30],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: height2,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
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
      categories: ['jan', 'feb', 'mart', 'april', 'may', 'june'],
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
      opacity: 1,
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
          return val.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
        },
      },
    },
    colors: [baseColor, secondaryColor, thirdColor],
    grid: {
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
