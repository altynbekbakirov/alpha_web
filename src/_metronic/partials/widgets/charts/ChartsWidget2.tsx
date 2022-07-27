/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

interface ISales {
  net_total: number[]
  net_total_usd: number[]
  dates: string[]
}

const ChartsWidget2: React.FC<Props> = ({className}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const intl = useIntl()
  const [active, setActive] = useState<number>(1)
  const [values, setValues] = useState<ISales>({
    net_total: [75, 44, 55, 57, 56, 61, 58],
    net_total_usd: [55, 76, 85, 101, 98, 87, 105],
    dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  })

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

  function onChange(num: number) {
    setActive(num)

    if (num === 1) {
      setValues({
        net_total: [75, 44, 55, 57, 56, 61, 58],
        net_total_usd: [55, 76, 85, 101, 98, 87, 105],
        dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      })
    } else {
      setValues({
        net_total: [65, 85, 65, 45, 54, 85, 85, 65, 95, 45],
        net_total_usd: [55, 76, 85, 101, 98, 87, 105, 65, 95, 45],
        dates: [
          '01.07.2022',
          '02.07.2022',
          '03.07.2022',
          '04.07.2022',
          '05.07.2022',
          '06.07.2022',
          '07.07.2022',
          '08.07.2022',
          '09.07.2022',
          '10.07.2022',
        ],
      })
    }
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>
            {intl.formatMessage({id: 'DASHBOARD_SALES'})}
          </span>
          <span className='text-muted fw-bold fs-7'>
            {intl.formatMessage({id: 'DASHBOARD_SALES_DESCRIPTION'})}
          </span>
        </h3>

        {/* begin::Toolbar */}
        <div className='card-toolbar' data-kt-buttons='true'>
          <a
            onClick={() => onChange(1)}
            className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${
              active === 1 ? 'active' : ''
            }`}
          >
            {intl.formatMessage({id: 'DASHBOARD_SALES_YEAR'})}
          </a>

          <a
            onClick={() => onChange(2)}
            className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${
              active === 2 ? 'active' : ''
            }`}
          >
            {intl.formatMessage({id: 'DASHBOARD_SALES_WEEK'})}
          </a>
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div role='tabpanel' ref={chartRef} id='kt_charts_widget_1' style={{height: '350px'}}></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ChartsWidget2}

function getChartOptions(height: number, values: ISales): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-700')
  const borderColor = getCSSVariableValue('--bs-gray-300')
  const baseColor = getCSSVariableValue('--bs-warning')
  const secondaryColor = getCSSVariableValue('--bs-success')
  const thirdColor = getCSSVariableValue('--bs-primary')

  return {
    series: [
      {
        name: 'Net Total',
        data: values.net_total,
      },
      {
        name: 'Net Total Usd',
        data: values.net_total_usd,
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
      categories: values.dates,
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
          return '$' + val + ' thousands'
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
