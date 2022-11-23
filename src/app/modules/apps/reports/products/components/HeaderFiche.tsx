import FicheContents from '../../../../../../_metronic/partials/modals/products/FicheContents'
import { SearchComponent } from './Search'
import { ToolBarFiche } from './ToolBarFiche'

interface IProps {
  value: string
  change: (e: any) => string
  exportPDF: () => void
  exportCSV: () => void
  show: boolean
  setShow: () => void
  item: string
}

const HeaderFiche: React.FC<IProps> = ({value, change, exportPDF, exportCSV, show, setShow, item}) => {    
  return (
    <>
      <div className='card-header border-0 pt-6'>
        <SearchComponent value={value} change={change} />
        {/* begin::Card toolbar */}
        <div className='card-toolbar'>
          {/* begin::Group actions */}
          <ToolBarFiche exportPDF={exportPDF} exportCSV={exportCSV} />
          {/* end::Group actions */}
        </div>
        {/* end::Card toolbar */}
      </div>
      <FicheContents show={show} setShow={setShow} item={item} />
    </>
  )
}

export {HeaderFiche}
