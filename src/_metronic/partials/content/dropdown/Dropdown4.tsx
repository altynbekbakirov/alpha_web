/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {useIntl} from 'react-intl'
import {ISafe} from '../../../../app/modules/apps/reports/safes/models/safes_model'

interface ISelect {
  selected: ISafe
  setSelected: (selected: ISafe) => void
  cases: ISafe[]
}

export function Dropdown4({selected, setSelected, cases}: ISelect) {
  const intl = useIntl()

  function changeValue(e: string) {
    setSelected({
      ...selected,
      code: e,
      name: cases.filter((value) => value.code.includes(e)).map((value) => value.name)[0],
    })
  }

  return (
    <div className='menu menu-sub menu-sub-dropdown w-250px w-md-300px' data-kt-menu='true'>
      <div className='px-7 py-5'>
        <div className='fs-5 text-dark fw-bolder'>{intl.formatMessage({id: 'FILTER_OPTIONS'})}</div>
      </div>

      <div className='separator border-gray-200'></div>

      <div className='px-7 py-5'>
        <div className='mb-10'>
          <label className='form-label fw-bold'>
            {intl.formatMessage({id: 'DASHBOARD_CASE'})}:
          </label>

          <div>
            <select
              className='form-select form-select-solid'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              value={selected?.code}
              onChange={(e) => changeValue(e.target.value)}
            >
              {cases.map((value) => (
                <option key={value.code} value={value.code}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='d-flex justify-content-end'>
          <button
            type='reset'
            className='btn btn-sm btn-white btn-active-light-primary me-2'
            data-kt-menu-dismiss='true'
          >
            {intl.formatMessage({id: 'MODAL_CLOSE'})}
          </button>
        </div>
      </div>
    </div>
  )
}
