import {Dropdown} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../../../_metronic/helpers'
import {FilterButton} from './FilterButton'

const ProductsToolBar = () => {
  const intl = useIntl()
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <FilterButton />

      {/* begin::Export */}

      <Dropdown>
        <Dropdown.Toggle
          className='btn btn-light-primary font-weight-bolder dropdown-toggle'
          id='dropdown-basic'
        >
          <KTSVG path='/media/icons/duotune/general/gen054.svg' className='svg-icon-2' />
          {intl.formatMessage({id: 'EXPORT'})}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href='#/action-1' className='navi-link' style={{padding: '10px'}}>
            <div className='menu-item px-3'> {intl.formatMessage({id: 'EXPORT_EXCEL'})} </div>
          </Dropdown.Item>
          <Dropdown.Item href='#/action-2'>
            <div className='menu-item px-3'> {intl.formatMessage({id: 'EXPORT_PDF'})} </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* <button
        type='button'
        className='btn btn-light-primary font-weight-bolder dropdown-toggle'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        <span className='svg-icon svg-icon-md'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
            version='1.1'
          >
            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <rect x='0' y='0' width='24' height='24'></rect>
              <path
                d='M3,16 L5,16 C5.55228475,16 6,15.5522847 6,15 C6,14.4477153 5.55228475,14 5,14 L3,14 L3,12 L5,12 C5.55228475,12 6,11.5522847 6,11 C6,10.4477153 5.55228475,10 5,10 L3,10 L3,8 L5,8 C5.55228475,8 6,7.55228475 6,7 C6,6.44771525 5.55228475,6 5,6 L3,6 L3,4 C3,3.44771525 3.44771525,3 4,3 L10,3 C10.5522847,3 11,3.44771525 11,4 L11,19 C11,19.5522847 10.5522847,20 10,20 L4,20 C3.44771525,20 3,19.5522847 3,19 L3,16 Z'
                fill='#000000'
                opacity='0.3'
              ></path>
              <path
                d='M16,3 L19,3 C20.1045695,3 21,3.8954305 21,5 L21,15.2485298 C21,15.7329761 20.8241635,16.200956 20.5051534,16.565539 L17.8762883,19.5699562 C17.6944473,19.7777745 17.378566,19.7988332 17.1707477,19.6169922 C17.1540423,19.602375 17.1383289,19.5866616 17.1237117,19.5699562 L14.4948466,16.565539 C14.1758365,16.200956 14,15.7329761 14,15.2485298 L14,5 C14,3.8954305 14.8954305,3 16,3 Z'
                fill='#000000'
              ></path>
            </g>
          </svg>
        </span>
        {intl.formatMessage({id: 'EXPORT'})}
      </button>
      {/* end::Export */}
      {/* <div className='dropdown-menu dropdown-menu-sm dropdown-menu-right'>
        <ul className='navi flex-column navi-hover py-2'>
          <li className='navi-header font-weight-bolder text-uppercase font-size-sm text-primary pb-2'>
            Выберите:
          </li>
          <li className='navi-item'>
            <a href='/' className='navi-link'>
              <span className='navi-icon'>
                <i className='la la-print'></i>
              </span>
              <span className='navi-text' id='export_print'>
                Печать
              </span>
            </a>
          </li>
          <li className='navi-item'>
            <a href='/' className='navi-link'>
              <span className='navi-icon'>
                <i className='la la-copy'></i>
              </span>
              <span className='navi-text' id='export_copy'>
                Копировать
              </span>
            </a>
          </li>
          <li className='navi-item'>
            <a href='/' className='navi-link' aria-controls='kt_datatable1'>
              <span className='navi-icon'>
                <i className='la la-file-excel-o'></i>
              </span>
              <span className='navi-text' id='export_excel'>
                Excel
              </span>
            </a>
          </li>
          <li className='navi-item'>
            <a href='/' className='navi-link'>
              <span className='navi-icon'>
                <i className='la la-file-text-o'></i>
              </span>
              <span className='navi-text' id='export_csv'>
                CSV
              </span>
            </a>
          </li>
          <li className='navi-item'>
            <a href='/' className='navi-link'>
              <span className='navi-icon'>
                <i className='la la-file-pdf-o'></i>
              </span>
              <span className='navi-text' id='export_pdf'>
                PDF
              </span>
            </a>
          </li>
        </ul>
      </div>  */}

      {/* <div
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
      </div> */}
    </div>
  )
}

export {ProductsToolBar}
