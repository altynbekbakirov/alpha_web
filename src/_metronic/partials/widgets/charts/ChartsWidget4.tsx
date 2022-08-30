/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'
import axios from 'axios'
import {IFinanceDebit} from '../../../../app/modules/apps/reports/finance/models/finance_model'
import {useIntl} from 'react-intl'

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

const ChartsWidget4: React.FC<Props> = ({className}) => {
  const intl = useIntl()
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [accounts, setAccounts] = useState<IFinanceDebit[]>([])
  const [aktif, setAktif] = useState(1)
  const debit_title = intl.formatMessage({id: 'CLIENT_DEBIT'})
  const credit_title = intl.formatMessage({id: 'CLIENT_CREDIT'})
  const balance_title = intl.formatMessage({id: 'CLIENT_BALANCE'})

  async function loadValues() {
    if (localStorage.getItem('defaultParams') === null) {
      return null
    }
    return JSON.parse(localStorage.getItem('defaultParams') || '')
  }

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    aktif === 1 ? accounts.sort(compareCom) : accounts.sort(compareUsd)

    const height = parseInt(getCSS(chartRef.current, 'height'))
    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(height, accounts, debit_title, credit_title, balance_title, aktif)
    )
    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, accounts, debit_title, credit_title, balance_title, aktif])

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/accounts/debit`
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
        fetchBalances()
      })

    async function fetchBalances() {
      const response = await axios.post<IFinanceDebit[]>(REQUEST_URL, {
        firmno: defaultParams.company,
        periodno: defaultParams.period,
        begdate: defaultParams.begdate,
        enddate: defaultParams.enddate,
        sourceindex: defaultParams.warehouse,
      })
      setAccounts(response.data)
    }
  }, [])

  function compareCom(a: IFinanceDebit, b: IFinanceDebit) {
    if (a.balance > b.balance) {
      return -1
    }
    if (a.balance < b.balance) {
      return 1
    }
    return 0
  }

  function compareUsd(a: IFinanceDebit, b: IFinanceDebit) {
    if (a.balanceUsd > b.balanceUsd) {
      return -1
    }
    if (a.balanceUsd < b.balanceUsd) {
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
            {intl.formatMessage({id: 'DASHBOARD_CUSTOMERS'})}
          </span>

          <span className='text-muted fw-bold fs-7'>
            {intl.formatMessage({id: 'DASHBOARD_CUSTOMERS_DESCRIPTION'})}
          </span>
        </h3>

        {/* begin::Toolbar */}
        <div className='card-toolbar' data-kt-buttons='true'>
          <a
            onClick={() => setAktif(1)}
            className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${
              aktif === 1 ? 'active' : ''
            }`}
          >
            {intl.formatMessage({id: 'CURRENCY_COM'})}
          </a>

          <a
            onClick={() => setAktif(2)}
            className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${
              aktif === 2 ? 'active' : ''
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
        <div ref={chartRef} id='kt_charts_widget_4_chart' style={{height: '350px'}}></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ChartsWidget4}

function getChartOptions(
  height: number,
  accounts: IFinanceDebit[],
  debit_title: string,
  credit_title: string,
  balance_title: string,
  aktif: number
): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')

  const baseColor = getCSSVariableValue('--bs-success')
  const baseLightColor = getCSSVariableValue('--bs-light-success')
  const secondaryColor = getCSSVariableValue('--bs-warning')
  const secondaryLightColor = getCSSVariableValue('--bs-light-warning')
  const thirdColor = getCSSVariableValue('--bs-primary')

  return {
    series: [
      {
        name: debit_title,
        data:
          aktif === 1
            ? accounts.map((account) => Math.round(account.debit)).slice(0, 10)
            : accounts.map((account) => Math.round(account.debitUsd)).slice(0, 10),
      },
      {
        name: credit_title,
        data:
          aktif === 1
            ? accounts.map((account) => Math.round(account.credit)).slice(0, 10)
            : accounts.map((account) => Math.round(account.creditUsd)).slice(0, 10),
      },
      {
        name: balance_title,
        data:
          aktif === 1
            ? accounts.map((account) => Math.round(account.balance)).slice(0, 10)
            : accounts.map((account) => Math.round(account.balanceUsd)).slice(0, 10),
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: height,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: accounts.map((account) => account.name).slice(0, 10),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        rotate: -90,
        rotateAlways: true,        
        minHeight: 60,
        maxHeight: 140,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: labelColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
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
    markers: {
      colors: [baseLightColor, secondaryLightColor],
      strokeColors: [baseLightColor, secondaryLightColor],
      strokeWidth: 3,
    },
  }
}
