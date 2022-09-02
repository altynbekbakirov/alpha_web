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

  useEffect(() => {  
    if (!chartRef.current) {
      return
    }

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(height)
    )
    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef])

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
  height: number
): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-700')
  const borderColor = getCSSVariableValue('--bs-gray-300')
  const baseColor = getCSSVariableValue('--bs-warning')
  const secondaryColor = getCSSVariableValue('--bs-success')
  const thirdColor = getCSSVariableValue('--bs-primary')

  return {
    series: [
      {
        name: 'net',
        data: [5, 10, 15, 20, 25, 30],
      },
      {
        name: 'revenue',
        data: [5, 10, 15, 20, 25, 30],
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
