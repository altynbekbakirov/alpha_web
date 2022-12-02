/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {setLanguage, useLang} from '../../../i18n/Metronici18n'
import {useLayout} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const languages = [
  {
    lang: 'ru',
    name: 'Русский',
    flag: toAbsoluteUrl('/media/flags/russia.svg'),
  },
  {
    lang: 'tr',
    name: 'Türkçe',
    flag: toAbsoluteUrl('/media/flags/turkey.svg'),
  },
]

const Toolbar1: FC = () => {
  const {classes} = useLayout()
  const intl = useIntl()
  const lang = useLang()
  const currentLanguage = languages.find((x) => x.lang === lang)

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
          <div
            className={clsx('btn btn-sm btn-flex btn-secondary', toolbarButtonMarginClass)}
            id='kt_header_user_menu_toggle'
          >
            {/* begin::Toggle */}
            <div
              className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
              data-kt-menu-trigger='click'
              data-kt-menu-attach='parent'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='bottom'
            >
              <a href='#' className='menu-link px-5'>
                {currentLanguage?.name}{' '}
                <img
                  className='w-15px h-15px rounded-1 ms-2'
                  src={currentLanguage?.flag}
                  alt='metronic'
                />
              </a>
              <div
                className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-200px'
                data-kt-menu='true'
              >
                {languages.map((l) => (
                  <div
                    className='menu-item px-2'
                    key={l.lang}
                    onClick={() => {
                      setLanguage(l.lang)
                    }}
                  >
                    <a
                      href='#'
                      className={clsx('menu-link d-flex px-2', {
                        active: l.lang === currentLanguage?.lang,
                      })}
                    >
                      <span className='symbol symbol-20px me-4'>
                        <img className='rounded-1' src={l.flag} alt='metronic' />
                      </span>
                      {l.name}
                    </a>
                  </div>
                ))}
              </div>
              
            </div>
            {/* end::Toggle */}
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
