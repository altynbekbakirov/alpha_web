import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'

const MaterialTransactions = () => {
  const intl = useIntl()

  return (
    <div className='modal fade' tabIndex={-1} id='kt_modal_2'>
      <div className='modal-dialog modal-fullscreen'>
        <div className='modal-content shadow-none'>
          <div className='modal-header'>
            <h5 className='modal-title'>
              {intl.formatMessage({id: 'ACTIONS_MATERIAL_TRANSACTIONS'})}
            </h5>
            <div
              className='btn btn-icon btn-sm btn-active-light-primary ms-2'
              data-bs-dismiss='modal'
              aria-label='Close'
            >
              <KTSVG
                path='/media/icons/duotune/arrows/arr061.svg'
                className='svg-icon svg-icon-2x'
              />
            </div>
          </div>
          <div className='modal-body'>
            <table className='table table-row-dashed table-row-gray-300 gy-7'>
              <thead>
                <tr className='fw-bolder fs-6 text-gray-800'>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>
                  <th>Age</th>
                  <th>Start date</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tiger Nixon</td>
                  <td>System Architect</td>
                  <td>Edinburgh</td>
                  <td>61</td>
                  <td>2011/04/25</td>
                  <td>$320,800</td>
                </tr>
                <tr>
                  <td>Garrett Winters</td>
                  <td>Accountant</td>
                  <td>Tokyo</td>
                  <td>63</td>
                  <td>2011/07/25</td>
                  <td>$170,750</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-primary' data-bs-dismiss='modal'>
              {intl.formatMessage({id: 'MODAL_CLOSE'})}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaterialTransactions
