/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'
import {useIntl} from 'react-intl'
import {ISaleDaily, ISaleTable} from '../../../../app/modules/apps/reports/sale/models/sale_model'
import axios from 'axios'

type Props = {
  className: string
}

interface ISale {
  date_: string[]
  net: number[]
  net_usd: number[]
}

const ChartsWidget2: React.FC<Props> = ({className}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const intl = useIntl()
  const [active, setActive] = useState<number>(1)
  const [months, setMonths] = useState<ISaleTable[] | ISaleDaily[]>([])
  const [dailys, setDailys] = useState<ISaleTable[] | ISaleDaily[]>([])
  const [sales, setSales] = useState<ISale>({
    date_: ['1', '2'],
    net: [250, 200],
    net_usd: [50, 100],
  })

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
      setMonths(response.data)
    }
    fetchMonthSales()
  }, [])

  useEffect(() => {
    setSales({
      date_: months.map((value) => {
        switch (value.date) {
          case '1':
            return intl.formatMessage({id: 'JANUARY_FULL'})
          case '2':
            return intl.formatMessage({id: 'FEBRUARY_FULL'})
          case '3':
            return intl.formatMessage({id: 'MARCH_FULL'})
          case '4':
            return intl.formatMessage({id: 'APRIL_FULL'})
          case '5':
            return intl.formatMessage({id: 'MAY_FULL'})
          case '6':
            return intl.formatMessage({id: 'JUNE_FULL'})
          case '7':
            return intl.formatMessage({id: 'JULY_FULL'})
          case '8':
            return intl.formatMessage({id: 'AUGUST_FULL'})
          case '9':
            return intl.formatMessage({id: 'SEPTEMBER_FULL'})
          case '10':
            return intl.formatMessage({id: 'OCTOBER_FULL'})
          case '11':
            return intl.formatMessage({id: 'NOVEMBER_FULL'})
          case '12':
            return intl.formatMessage({id: 'DECEMBER_FULL'})
          default:
            return ''
        }
      }),
      net: months.map((value) => Math.round(value.net)),
      net_usd: months.map((value) => Math.round(value.net_usd)),
    })
  }, [months, intl])

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/sales/daily`
    async function fetchProducts() {
      const response = await axios.post<ISaleDaily[]>(REQUEST_URL, {
        firmno: 1,
        periodno: 3,
        begdate: '01.01.2022',
        enddate: '31.12.2022',
        sourceindex: 0,
      })
      setDailys(response.data)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(height, net_title, net_usd_title, sales)
    )
    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, net_title, net_usd_title, sales])

  function onChange(num: number) {
    setActive(num)

    if (num === 1) {
      setSales({
        date_: months.map((value) => {
          switch (value.date) {
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
        }),
        net: months.map((value) => Math.round(value.net)),
        net_usd: months.map((value) => Math.round(value.net_usd)),
      })
    } else {
      setSales({
        date_: dailys
          .map((value) => {
            var weekday = new Array(7)
            weekday[0] = intl.formatMessage({id: 'Sunday'})
            weekday[1] = intl.formatMessage({id: 'Monday'})
            weekday[2] = intl.formatMessage({id: 'Tuesday'})
            weekday[3] = intl.formatMessage({id: 'Wednesday'})
            weekday[4] = intl.formatMessage({id: 'Thursday'})
            weekday[5] = intl.formatMessage({id: 'Friday'})
            weekday[6] = intl.formatMessage({id: 'Saturday'})
            let d = new Date(value.date)
            return weekday[d.getDay()]
          })
          .slice(0, 7)
          .reverse(),
        net: dailys
          .map((value) => Math.round(value.net))
          .slice(0, 7)
          .reverse(),
        net_usd: dailys.map((value) => Math.round(value.net_usd)).slice(0, 7),
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

function getChartOptions(
  height: number,
  net_title: string,
  net_usd_title: string,
  sales: ISale
): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-700')
  const borderColor = getCSSVariableValue('--bs-gray-300')
  const baseColor = getCSSVariableValue('--bs-warning')
  const secondaryColor = getCSSVariableValue('--bs-success')
  const thirdColor = getCSSVariableValue('--bs-primary')

  return {
    series: [
      {
        name: net_title,
        data: sales.net,
      },
      {
        name: net_usd_title,
        data: sales.net_usd,
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
      categories: sales.date_,
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
