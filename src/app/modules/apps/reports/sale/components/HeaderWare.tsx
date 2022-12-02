import { SearchComponent } from "./Search"
import { ToolBarWare } from "./ToolBarWare"

interface IProps {
  value: string
  change: (e: any) => string
  exportPDF: () => void
  exportCSV: () => void
}

export const HeaderWare: React.FC<IProps> = ({value,
  change,
  exportPDF,
  exportCSV,}) => {
  return (
    <div className='card-header border-0 pt-6'>
      <SearchComponent value={value} change={change} />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <ToolBarWare exportPDF={exportPDF} exportCSV={exportCSV} />
        {/* end::Group actions */}
      </div>
    </div>
  )
}