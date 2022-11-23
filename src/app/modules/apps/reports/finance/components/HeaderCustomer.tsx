import FicheContent from '../../../../../../_metronic/partials/modals/finance/FicheContent'
import {SearchComponent} from './Search'
import { ToolBarCustomer } from './ToolBarCustomer'

interface IProps {
  value: string
  change: (e: any) => string
  exportPDF: () => void
  exportCSV: () => void
  show: boolean
  setShow: () => void
  item: string
}

export const HeaderCustomer: React.FC<IProps> = ({value, change, exportPDF, exportCSV, show, setShow, item}) => {
  return (
    <>
      <div className='card-header border-0 pt-6'>
        <SearchComponent value={value} change={change} />
        {/* begin::Card toolbar */}
        <div className='card-toolbar'>
          {/* begin::Group actions */}
          <ToolBarCustomer exportPDF={exportPDF} exportCSV={exportCSV} />
          {/* end::Group actions */}
        </div>
        {/* end::Card toolbar */}
      </div>
      <FicheContent show={show} setShow={setShow} item={item} />
    </>
  )
}
