import {Dropdown} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../../../_metronic/helpers'

interface IProps {
  exportPDF: () => void
  exportCSV: () => void
}

const ToolBarFiche: React.FC<IProps> = ({exportCSV, exportPDF}) => {
  const intl = useIntl()

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <FilterButton /> */}
      <Dropdown>
        <Dropdown.Toggle
          className='btn btn-light-primary font-weight-bolder dropdown-toggle'
          id='dropdown-basic'
        >
          <KTSVG path='/media/icons/duotune/general/gen054.svg' className='svg-icon-2' />
          {intl.formatMessage({id: 'EXPORT'})}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item className='navi-link' style={{padding: '10px'}} onClick={exportCSV}>
            <div className='menu-item px-3'> {intl.formatMessage({id: 'EXPORT_EXCEL'})} </div>
          </Dropdown.Item>
          <Dropdown.Item className='navi-link' style={{padding: '10px'}} onClick={exportPDF}>
            <div className='menu-item px-3'> {intl.formatMessage({id: 'EXPORT_PDF'})} </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export {ToolBarFiche}
