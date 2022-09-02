/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'
import {useIntl} from 'react-intl'
import {ISaleTotal} from '../../../../app/modules/apps/reports/sale/models/sale_model'
import axios from 'axios'

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

const ChartsWidget1: React.FC<Props> = ({className}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const intl = useIntl()
  const [aktive, setAktive] = useState(1)
  const [values, setValues] = useState<ISaleTotal[]>([])

  async function loadValues() {
    if (localStorage.getItem('defaultParams') === null) {
      return null
    }
    return JSON.parse(localStorage.getItem('defaultParams') || '')
  }

  const sale_count = intl.formatMessage({id: 'PRODUCT_SALE_COUNT'})
  const sale_total = intl.formatMessage({id: 'PRODUCT_SALE_TOTAL'})
  const sale_total_usd = intl.formatMessage({id: 'PRODUCT_SALE_TOTAL_USD'})

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/sales/total`
    let defaultParams: ICompany

    loadValues()
      .then((response) => response)
      .then(function (data) {
        if (data !== null) {
          defaultParams = data
        }
        fetchMonthSales()
      })

    async function fetchMonthSales() {
      const response = await axios.post<ISaleTotal[]>(REQUEST_URL, {
        firmno: defaultParams.company,
        periodno: defaultParams.period,
        begdate: defaultParams.begdate,
        enddate: defaultParams.enddate,
        sourceindex: defaultParams.warehouse,
      })
      setValues(response.data)
    }
  }, [])

  function compareAmount(a: ISaleTotal, b: ISaleTotal) {
    if (a.saleCount > b.saleCount) {
      return -1
    }
    if (a.saleCount < b.saleCount) {
      return 1
    }
    return 0
  }

  function compareTotal(a: ISaleTotal, b: ISaleTotal) {
    if (a.saleTotal > b.saleTotal) {
      return -1
    }
    if (a.saleTotal < b.saleTotal) {
      return 1
    }
    return 0
  }

  function compareTotalUsd(a: ISaleTotal, b: ISaleTotal) {
    if (a.saleTotalUsd > b.saleTotalUsd) {
      return -1
    }
    if (a.saleTotalUsd < b.saleTotalUsd) {
      return 1
    }
    return 0
  }

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    aktive === 1
      ? values.sort(compareAmount)
      : aktive === 2
      ? values.sort(compareTotal)
      : values.sort(compareTotalUsd)

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(height, values, sale_count, sale_total, sale_total_usd, aktive)
    )
    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, values, sale_count, sale_total, sale_total_usd, aktive])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        {/* begin::Title */}
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>
            {intl.formatMessage({id: 'DASHBOARD_PRODUCTS_MOST_SALES'})}
          </span>

          <span className='text-muted fw-bold fs-7'>
            {intl.formatMessage({id: 'DASHBOARD_PRODUCTS_MOST_SALES_DESCRIPTION'})}
          </span>
        </h3>
        {/* end::Title */}

        {/* begin::Toolbar */}
        <div className='card-toolbar'>
          <a
            onClick={() => setAktive(1)}
            className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${
              aktive === 1 ? 'active' : ''
            }`}
          >
            {intl.formatMessage({id: 'TOTAL_COUNT_FULL'})}
          </a>

          <a
            onClick={() => setAktive(2)}
            className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${
              aktive === 2 ? 'active' : ''
            }`}
          >
            {intl.formatMessage({id: 'TOTAL_SUM'})}
          </a>

          <a
            onClick={() => setAktive(3)}
            className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${
              aktive === 3 ? 'active' : ''
            }`}
          >
            {intl.formatMessage({id: 'TOTAL_SUM_USD'})}
          </a>
        </div>
        {/* end::Toolbar */}
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

export {ChartsWidget1}

function getChartOptions(
  height: number,
  values: ISaleTotal[],
  sale_count: string,
  sale_total: string,
  sale_total_usd: string,
  aktive: number
): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-700')
  const borderColor = getCSSVariableValue('--bs-gray-200')
  const baseColor = getCSSVariableValue('--bs-danger')
  const secondaryColor = getCSSVariableValue('--bs-primary')

  return {
    series: [
      {
        name: aktive === 1 ? sale_count : aktive === 2 ? typeof sale_total : sale_total_usd,
        data:
          aktive === 1
            ? values.map((value) => value.saleCount).slice(0, 10)
            : aktive === 2
            ? values.map((value) => value.saleTotal).slice(0, 10)
            : values.map((value) => value.saleTotalUsd).slice(0, 10),
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
        horizontal: true,
        columnWidth: '30%',
        borderRadius: 5,
      },
    },
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: true,
      formatter: function (value) {
        return value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      },
      textAnchor: 'middle',
      distributed: true,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontWeight: 'bold',
        colors: ['#7239ea'],
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45,
        },
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: values.map((value) => value.name).slice(0, 10),
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
    colors: [baseColor, secondaryColor],
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
