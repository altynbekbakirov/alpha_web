/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'
import {ISafe, ISafeResume} from '../../../../app/modules/apps/reports/safes/models/safes_model'
import {useIntl} from 'react-intl'
import axios from 'axios'
import {KTSVG} from '../../../helpers'
import { Dropdown4 } from '../../content/dropdown/Dropdown4'

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

const MixedWidget10: React.FC<Props> = ({className, chartColor, chartHeight}) => {
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

  const remains = intl.formatMessage({id: 'DASHBOARD_CASE_REMAINING'})

  async function loadValues() {
    if (localStorage.getItem('defaultParams') === null) {
      return null
    }
    return JSON.parse(localStorage.getItem('defaultParams') || '')
  }

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
      chartOptions(chartColor, chartHeight, height, remains, safes, months, active)
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
  }, [chartRef, remains, safes, active])

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body d-flex flex-column p-0'>
        {/* begin::Stats */}
        <div className='flex-grow-1 card-p pb-0'>
          <div className='d-flex flex-stack flex-wrap'>
            <div className='me-2'>
              <a href='#' className='text-dark text-hover-primary fw-bolder fs-3'>
                {intl.formatMessage({id: 'DASHBOARD_CASE'})} {selected?.name}
              </a>

              <div className='text-muted fs-7 fw-bold'>{intl.formatMessage({id: 'DASHBOARD_CASE_DEFINITION_SUMMARY'})}</div>
            </div>
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
              <div className={`fw-bolder fs-3 text-${chartColor}`}>
                {safes
                  .map((value) =>
                    active === 1
                      ? value.total.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })
                      : value.totalUsd.toLocaleString(undefined, {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })
                  )
                  .slice(safes.length - 1)}
              </div>
            </div>
            {/* end::Toolbar */}
          </div>
        </div>
        {/* end::Stats */}

        {/* begin::Chart */}
        <div
          ref={chartRef}
          className='mixed-widget-7-chart card-rounded-bottom'
          style={{height: '350px'}}
        ></div>
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
  remains: string,
  safes: ISafeResume[],
  months: string[],
  active: number
): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-800')
  const strokeColor = getCSSVariableValue('--bs-gray-300')
  const baseColor = getCSSVariableValue('--bs-' + chartColor)
  const lightColor = getCSSVariableValue('--bs-light-' + chartColor)

  return {
    series: [
      {
        name: remains,
        data: safes
          .map((value) =>
            active === 1
              ? typeof value.total === 'string'
                ? parseInt(value.total)
                : value.total
              : typeof value.totalUsd === 'string'
              ? parseInt(value.totalUsd)
              : value.totalUsd
          )
          .slice(1),
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: chartHeight,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
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
      show: true,
      width: 3,
      colors: [baseColor],
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
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      labels: {
        show: false,
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
          return active === 1
            ? val.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
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
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  }
}

export {MixedWidget10}
