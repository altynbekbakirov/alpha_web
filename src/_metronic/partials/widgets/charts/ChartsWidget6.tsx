/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSSVariableValue, getCSS} from '../../../assets/ts/_utils'
import {useIntl} from 'react-intl'
import {ISafe, ISafeResume} from '../../../../app/modules/apps/reports/safes/models/safes_model'
import axios from 'axios'
import {KTSVG} from '../../../helpers'
import {Dropdown4} from '../../content/dropdown/Dropdown4'

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

const ChartsWidget6: React.FC<Props> = ({className}) => {
  const intl = useIntl()
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [safes, setSafes] = useState<ISafeResume[]>([])
  const [active, setActive] = useState<number>(1)
  const [selected, setSelected] = useState<ISafe>({
    code: '',
    name: 'First',
    balance: 1000,
    balanceUsd: 2000,
    definition: '',
  })
  const [cases, setCases] = useState<ISafe[]>([])

  async function loadValues() {
    if (localStorage.getItem('defaultParams') === null) {
      return null
    }
    return JSON.parse(localStorage.getItem('defaultParams') || '')
  }

  const debit = intl.formatMessage({id: 'DASHBOARD_CASE_COLLECTION'})
  const debitUsd = intl.formatMessage({id: 'DASHBOARD_CASE_COLLECTION_USD'})
  const credit = intl.formatMessage({id: 'DASHBOARD_CASE_PAYMENT'})
  const creditUsd = intl.formatMessage({id: 'DASHBOARD_CASE_PAYMENT_USD'})
  const remains = intl.formatMessage({id: 'DASHBOARD_CASE_REMAINING'})

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/safes`
    let defaultParams: ICompany

    loadValues()
      .then((response) => response)
      .then(function (data) {
        if (data !== null) {
          defaultParams = data
        }
        fetchCases()
      })

    async function fetchCases() {
      const response = await axios.post<ISafe[]>(REQUEST_URL, {
        firmNo: defaultParams.company,
        periodNo: defaultParams.period,
        begDate: defaultParams.begdate,
        endDate: defaultParams.enddate,
        sourceIndex: defaultParams.warehouse,
      })
      setCases(response.data)
    }
  }, [])

  useEffect(() => {
    setSelected(cases[0])
  }, [cases])

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/safes/${selected?.code}`
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
        selected?.code && fetchMonthSales()
      })

    async function fetchMonthSales() {
      const response = await axios.post<ISafeResume[]>(REQUEST_URL, {
        firmNo: defaultParams.company,
        periodNo: defaultParams.period,
        begDate: defaultParams.begdate,
        endDate: defaultParams.enddate,
        sourceIndex: defaultParams.warehouse,
      })
      setSafes(response.data)
    }
  }, [selected])

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    const months = [
      intl.formatMessage({id: 'JANUARY_FULL'}),
      intl.formatMessage({id: 'FEBRUARY_FULL'}),
      intl.formatMessage({id: 'MARCH_FULL'}),
      intl.formatMessage({id: 'APRIL_FULL'}),
      intl.formatMessage({id: 'MAY_FULL'}),
      intl.formatMessage({id: 'JUNE_FULL'}),
      intl.formatMessage({id: 'JULY_FULL'}),
      intl.formatMessage({id: 'AUGUST_FULL'}),
      intl.formatMessage({id: 'SEPTEMBER_FULL'}),
      intl.formatMessage({id: 'OCTOBER_FULL'}),
      intl.formatMessage({id: 'NOVEMBER_FULL'}),
      intl.formatMessage({id: 'DECEMBER_FULL'}),
    ]

    const height = parseInt(getCSS(chartRef.current, 'height'))
    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(height, debit, credit, remains, safes, months, active)
    )

    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, safes, debit, credit, active, debitUsd, creditUsd, intl, remains])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>
            {' '}
            {intl.formatMessage({id: 'DASHBOARD_CASE'})} {selected?.name}
          </span>

          <span className='text-muted fw-bold fs-7'>
            {' '}
            {intl.formatMessage({id: 'DASHBOARD_CASE_DEFINITION'})}
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
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          <Dropdown4 selected={selected} setSelected={setSelected} cases={cases} />
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='kt_charts_widget_6_chart' style={{height: '350px'}}></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ChartsWidget6}

function getChartOptions(
  height: number,
  debit: string,
  credit: string,
  remains: string,
  safes: ISafeResume[],
  months: string[],
  active: number
): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')
  const baseColor = getCSSVariableValue('--bs-primary')
  // const baseLightColor = getCSSVariableValue('--bs-light-primary')
  const secondaryColor = getCSSVariableValue('--bs-info')
  const color2Light = getCSSVariableValue('--bs-light-success')

  return {
    series: [
      {
        name: debit,
        type: 'bar',
        data: safes
          .map((value) =>
            active === 1
              ? Math.round(typeof value.debit === 'string' ? parseInt(value.debit) : value.debit)
              : Math.round(
                  typeof value.debitUsd === 'string' ? parseInt(value.debitUsd) : value.debitUsd
                )
          )
          .slice(1),
      },
      {
        name: credit,
        type: 'bar',
        data: safes
          .map((value) =>
            active === 1
              ? Math.round(typeof value.credit === 'string' ? parseInt(value.credit) : value.credit)
              : Math.round(
                  typeof value.creditUsd === 'string' ? parseInt(value.creditUsd) : value.creditUsd
                )
          )
          .slice(1),
      },
      {
        name: remains,
        type: 'area',
        data: safes
          .map((value) =>
            active === 1
              ? Math.round(
                  (typeof value.debit === 'string' ? parseInt(value.debit) : value.debit) -
                    (typeof value.credit === 'string' ? parseInt(value.credit) : value.credit)
                )
              : Math.round(
                  (typeof value.debitUsd === 'string' ? parseInt(value.debitUsd) : value.debitUsd) -
                    (typeof value.creditUsd === 'string'
                      ? parseInt(value.creditUsd)
                      : value.creditUsd)
                )
          )
          .slice(1),
      },
    ],
    chart: {
      fontFamily: 'inherit',
      stacked: true,
      height: height,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        columnWidth: '12%',
      },
    },
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: months.map((value) => value),
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
      max:
        active === 1
          ? Math.max(
              ...safes
                .map((value) =>
                  Math.ceil(typeof value.debit === 'string' ? parseInt(value.debit) : value.debit)
                )
                .slice(1)
            ) +
            Math.round(
              Math.max(
                ...safes
                  .map((value) =>
                    Math.ceil(typeof value.debit === 'string' ? parseInt(value.debit) : value.debit)
                  )
                  .slice(1)
              ) / 10
            )
          : Math.max(
              ...safes
                .map((value) =>
                  Math.ceil(
                    typeof value.debitUsd === 'string' ? parseInt(value.debitUsd) : value.debitUsd
                  )
                )
                .slice(1)
            ) +
            Math.round(
              Math.max(
                ...safes
                  .map((value) =>
                    Math.ceil(
                      typeof value.debitUsd === 'string' ? parseInt(value.debitUsd) : value.debitUsd
                    )
                  )
                  .slice(1)
              ) / 10
            ),
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
    colors: [baseColor, secondaryColor, color2Light],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  }
}
