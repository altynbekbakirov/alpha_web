import FicheContent from '../../../../../../_metronic/partials/modals/finance/FicheContent'
import {SearchComponent} from './Search'
import {ToolBar} from './ToolBar'

interface IProps {
  value: string
  change: (e: any) => string
  exportPDF: () => void
  exportCSV: () => void
  show: boolean
  setShow: () => void
  item: string
}

const Header: React.FC<IProps> = ({value, change, exportPDF, exportCSV, show, setShow, item}) => {
  return (
    <>
      <div className='card-header border-0 pt-6'>
        <SearchComponent value={value} change={change} />
        {/* begin::Card toolbar */}
        <div className='card-toolbar'>
          {/* begin::Group actions */}
          <ToolBar exportPDF={exportPDF} exportCSV={exportCSV} />
          {/* end::Group actions */}
        </div>
        {/* end::Card toolbar */}
      </div>
      <FicheContent show={show} setShow={setShow} item={item} />
    </>
  )
}

export {Header}
