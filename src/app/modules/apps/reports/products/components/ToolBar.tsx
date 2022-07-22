import {useIntl} from 'react-intl'
import { KTSVG } from '../../../../../../_metronic/helpers'
import {ProductsFilterButton} from './FilterButton'

const ProductsToolBar = () => {
  const intl = useIntl()
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <ProductsFilterButton />

      {/* begin::Export */}
      <button
        type='button'
        className='btn btn-info me-3'
        data-kt-menu-export-trigger='click'
        data-kt-menu-export-placement='bottom-end'
      >
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'EXPORT'})}
      </button>
      {/* end::Export */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu-export='true'
      >
        <div className='menu-item px-3'>
          <a href='/' className='menu-link px-3'>
            Edit
          </a>
        </div>
        <div className='menu-item px-3'>
          <a href='/' className='menu-link px-3' data-kt-products-table-filter='delete_row'>
            Delete
          </a>
        </div>
      </div>
    </div>
  )
}

export {ProductsToolBar}
