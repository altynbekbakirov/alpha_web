import {SearchComponent} from './Search'
import { ToolBarPrice } from './ToolBarPrice'

interface IProps {
  value: string
  change: (e: any) => string
  exportPDF: () => void
  exportCSV: () => void
}

const HeaderPrice: React.FC<IProps> = ({value, change, exportPDF, exportCSV}) => {    
  return (
    <>
      <div className='card-header border-0 pt-6'>
        <SearchComponent value={value} change={change} />
        {/* begin::Card toolbar */}
        <div className='card-toolbar'>
          {/* begin::Group actions */}
          <ToolBarPrice exportPDF={exportPDF} exportCSV={exportCSV} />
          {/* end::Group actions */}
        </div>
        {/* end::Card toolbar */}
      </div>
    </>
  )
}

export {HeaderPrice}
