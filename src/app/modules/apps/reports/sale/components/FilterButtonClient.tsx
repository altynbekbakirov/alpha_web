import {useContext, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../../../_metronic/helpers'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {FilterContext} from '../../../../../../_metronic/layout/components/toolbar/FilterContext'
import axios from 'axios'
import moment from 'moment'

interface ICompany {
  company: number
  period: number
  warehouse: number
  begdate: string
  enddate: string
}

export const FilterButtonClient = () => {
  const intl = useIntl()
  const [clientFilter, setClientFilter] = useState('')
  const [date1, setDate1] = useState<Date>()
  const [date2, setDate2] = useState<Date>()  

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setSaleClientItems,
  } = useContext(FilterContext)

  async function loadValues() {
    if (localStorage.getItem('defaultParams') === null) {
      return null
    }
    return JSON.parse(localStorage.getItem('defaultParams') || '')
  }

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/sales/client`
    let defaultParams: ICompany

    loadValues()
      .then((response) => response)
      .then(async function (data) {
        if (data !== null) {
          defaultParams = data
        }
        await fetchProducts()
      })

    async function fetchProducts() {
      const response = await axios.post(REQUEST_URL, {
        firmNo: defaultParams.company,
        periodNo: defaultParams.period,
        begDate: defaultParams.begdate,
        endDate: defaultParams.enddate,
        sourceIndex: defaultParams.warehouse,
        filterName: '',
      })
      setSaleClientItems(response.data)
    }
  }, [setSaleClientItems])

  useEffect(() => {
    let defaultParams: ICompany

    loadValues()
      .then((response) => response)
      .then(async function (data) {
        if (data !== null) {
          defaultParams = data
          var dateStart = defaultParams.begdate.split('.')
          var newDateStart = dateStart[1] + '/' + dateStart[0] + '/' + dateStart[2]
          var dateBeg = new Date(newDateStart)
          setStartDate(new Date(dateBeg))
          setDate1(new Date(dateBeg))

          var dateFinish = defaultParams.enddate.split('.')
          var newDateFinish = dateFinish[1] + '/' + dateFinish[0] + '/' + dateFinish[2]
          var dateEnd = new Date(newDateFinish)
          setEndDate(new Date(dateEnd))
          setDate2(new Date(dateEnd))
        }
      })
  }, [setStartDate, setEndDate])

  async function applyFilter() {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}/sales/client`
    let defaultParams: ICompany

    loadValues()
      .then((response) => response)
      .then(async function (data) {
        if (data !== null) {
          defaultParams = data
        }
        await fetchProducts()
      })

    async function fetchProducts() {
      const response = await axios.post(REQUEST_URL, {
        firmNo: defaultParams.company,
        periodNo: defaultParams.period,
        begDate: moment(startDate).format('DD.MM.yyyy'),
        endDate: moment(endDate).format('DD.MM.yyyy'),
        sourceIndex: defaultParams.warehouse,
        filterName: clientFilter ?? '',
      })
      setSaleClientItems(response.data)
    }
  }

  async function resetFilter() {
    let defaultParams: ICompany

    setClientFilter('')

    loadValues()
      .then((response) => response)
      .then(async function (data) {
        if (data !== null) {
          defaultParams = data
          var dateStart = defaultParams.begdate.split('.')
          var newDateStart = dateStart[1] + '/' + dateStart[0] + '/' + dateStart[2]
          var dateBeg = new Date(newDateStart)
          setStartDate(new Date(dateBeg))

          var dateFinish = defaultParams.enddate.split('.')
          var newDateFinish = dateFinish[1] + '/' + dateFinish[0] + '/' + dateFinish[2]
          var dateEnd = new Date(newDateFinish)
          setEndDate(new Date(dateEnd))
        }
      })
  }

  return (
    <>
      {/* begin::Filter Button */}
      <button
        type='button'
        className='btn btn-primary me-3'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'FILTER'})}
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
        {/* begin::Header */}
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>
            {intl.formatMessage({id: 'FILTER_OPTIONS'})}
          </div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-200'></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          {/* begin::Input group */}
          <div className='mb-10'>
            <label className='form-label'>{intl.formatMessage({id: 'CLIENT_CODE'})}:</label>
            <input
              type='text'
              value={clientFilter}
              onChange={(e: any) => setClientFilter(e.target.value)}
              className='form-control form-control-solid'
            />
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>
              {intl.formatMessage({id: 'DATE_RANGE'})}:
            </label>

            <div className='mb-10' style={{display: 'flex'}}>
              <div>
                <DatePicker
                  dateFormat='dd.MM.yyyy'
                  shouldCloseOnSelect={false}
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  startDate={startDate}
                  minDate={date1}
                  maxDate={date2}
                  className='form-control form-control-solid'
                />
              </div>

              <div
                style={{
                  width: '30px',
                  display: 'flex',
                  margin: '0px auto',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <b>-</b>
              </div>

              <div>
                <DatePicker
                  dateFormat='dd.MM.yyyy'
                  shouldCloseOnSelect={false}
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  startDate={endDate}
                  minDate={date1}
                  maxDate={date2}
                  className='form-control form-control-solid'
                />
              </div>
            </div>
          </div>
          {/* end::Input group */}

          {/* begin::Actions */}
          <div className='d-flex justify-content-end' style={{clear: 'both'}}>
            <button
              type='button'
              onClick={resetFilter}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
              data-kt-user-table-filter='reset'
            >
              {intl.formatMessage({id: 'MODAL_RESET'})}
            </button>
            <button
              type='button'
              onClick={applyFilter}
              className='btn btn-primary fw-bold px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              {intl.formatMessage({id: 'MODAL_APPLY'})}
            </button>
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}
