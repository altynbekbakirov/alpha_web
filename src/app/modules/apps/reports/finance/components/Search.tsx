import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../../../_metronic/helpers'
import { ISearch } from '../models/finance_model' 

const SearchComponent: React.FC<ISearch> = ({value, change}) => {
  const intl = useIntl()

  return (
    <div className='card-title'>
      {/* begin::Search */}
      <div className='d-flex align-items-center position-relative my-1'>
        <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        />
        <input
          type='text'
          className='form-control form-control-solid w-250px ps-14'
          placeholder={intl.formatMessage({id: 'SEARCH'})}
          value={value ?? ''}
          onChange={(e) => change(e.target.value)}
        />
      </div>
      {/* end::Search */}
    </div>
  )
}

export {SearchComponent}
