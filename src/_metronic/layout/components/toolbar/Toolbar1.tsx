/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'

const Toolbar1: FC = () => {
  const {classes} = useLayout()
  const intl = useIntl()

  return (
    <div className='toolbar' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
      >
        <DefaultTitle />

        {/* begin::Actions */}
        <div className='d-flex align-items-center py-1'>
          {/* begin::Wrapper */}
          <div className='me-4'>
            {/* begin::Menu */}
            <a
              href='#'
              className='btn btn-sm btn-flex btn-light fw-bolder'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_1'
              id='kt_modal_primary_button'
            >
              <KTSVG
                path='/media/icons/duotune/general/gen055.svg'
                className='svg-icon-5 svg-icon-gray-500 me-1'
              />
              {intl.formatMessage({id: 'PARAMETHERS'})}
            </a>           

            {/* end::Menu */}
          </div>
          {/* end::Wrapper */}

          {/* begin::Button */}

          {/* <a
            href='#'
            className='btn btn-sm btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
            id='kt_toolbar_primary_button'
          >
             <KTSVG
                path='/media/icons/duotune/general/gen028.svg'
                className='svg-icon-5 svg-icon-gray-500 me-1'
              />
            Create
          </a> */}
          {/* end::Button */}
        </div>
        {/* end::Actions */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Toolbar1}
