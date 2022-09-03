/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {
  deactivateAccount,
  IDeactivateAccount,
} from '../../../app/modules/accounts/components/settings/SettingsModel'
import {KTSVG} from '../../helpers'
import {useIntl} from 'react-intl'
import axios from 'axios'

const deactivateAccountSchema = Yup.object().shape({
  confirm: Yup.boolean().oneOf([true], 'Подтвердите, чтобы продолжить.'),
})

interface ICompany {
  company: number
  period: number
  warehouse: number
  begdate: string
  enddate: string
}

const NetworkClearCard: React.FC = () => {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const formik = useFormik<IDeactivateAccount>({
    initialValues: {
      ...deactivateAccount,
    },
    validationSchema: deactivateAccountSchema,
    onSubmit: () => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      clearNetwork()
    },
  })

  useEffect(() => {}, [])

  async function clearNetwork() {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const REQUEST_URL = `${BASE_URL}`
    let defaultParams: ICompany

    async function loadValues() {
      if (localStorage.getItem('defaultParams') === null) {
        return null
      }
      return JSON.parse(localStorage.getItem('defaultParams') || '')
    }

    loadValues()
      .then((response) => response)
      .then(function (data) {
        if (data !== null) {
          defaultParams = data
        }
        fetchProducts()
      })

    async function fetchProducts() {
      const response = await axios.get(REQUEST_URL + '/' + defaultParams.company + '/clear')
      alert(response.data)
    }
  }

  return (
    <div className='card'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_deactivate'
        aria-expanded='true'
        aria-controls='kt_account_deactivate'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>
            {intl.formatMessage({id: 'MENU.UTILITY_CLEAR_NETWORK'})}
          </h3>
        </div>
      </div>

      <div id='kt_account_deactivate' className='collapse show'>
        <form onSubmit={formik.handleSubmit} id='kt_account_deactivate_form' className='form'>
          <div className='card-body border-top p-9'>
            <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed mb-9 p-6'>
              <KTSVG
                path='/media/icons/duotune/general/gen044.svg'
                className='svg-icon-2tx svg-icon-warning me-4'
              />

              <div className='d-flex flex-stack flex-grow-1'>
                <div className='fw-bold'>
                  <h4 className='text-gray-800 fw-bolder'>
                    {intl.formatMessage({id: 'NETWORK_CLEAR_TITLE'})}
                  </h4>
                  <div className='fs-6 text-gray-600'>
                    {intl.formatMessage({id: 'NETWORK_CLEAR_DEFINITION'})}
                    <br />
                  </div>
                </div>
              </div>
            </div>

            <div className='form-check form-check-solid fv-row'>
              <input
                className='form-check-input'
                type='checkbox'
                {...formik.getFieldProps('confirm')}
              />
              <label className='form-check-label fw-bold ps-2 fs-6' htmlFor='deactivate'>
                {intl.formatMessage({id: 'NETWORK_CLEAR_CONFIRM'})}
              </label>
            </div>
            {formik.touched.confirm && formik.errors.confirm && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  {intl.formatMessage({id: 'NETWORK_CLEAR_CONFIRM_ERROR'})}
                </div>
              </div>
            )}
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              id='kt_account_deactivate_account_submit'
              type='submit'
              className='btn btn-danger fw-bold'
            >
              {!loading && `${intl.formatMessage({id: 'NETWORK_CLEAR_BUTTON_TEXT'})}`}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  {intl.formatMessage({id: 'NETWORK_CLEAR_PLEASE_WAIT'})}{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {NetworkClearCard}
