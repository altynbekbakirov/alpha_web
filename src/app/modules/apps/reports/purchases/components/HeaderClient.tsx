import FichesList from '../../../../../../_metronic/partials/modals/purchases/FichesList'
import {SearchComponent} from './Search'
import { ToolBarClient } from './ToolBarClient'

interface IProps {
  value: string
  change: (e: any) => string
  exportPDF: () => void
  exportCSV: () => void
  show: boolean
  setShow: () => void
  item: string
}

const HeaderClient: React.FC<IProps> = ({
  value,
  change,
  exportPDF,
  exportCSV,
  show,
  setShow,
  item,
}) => {
  return (
    <>
      <div className='card-header border-0 pt-6'>
        <SearchComponent value={value} change={change} />
        {/* begin::Card toolbar */}
        <div className='card-toolbar'>
          {/* begin::Group actions */}
          <ToolBarClient exportPDF={exportPDF} exportCSV={exportCSV} />
          {/* end::Group actions */}
        </div>
        {/* end::Card toolbar */}
      </div>
      <FichesList show={show} setShow={setShow} item={item} />
    </>
  )
}

export {HeaderClient}
