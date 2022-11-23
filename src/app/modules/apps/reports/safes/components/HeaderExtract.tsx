import { SearchComponent } from "./Search"
import { ToolBarExtract } from "./ToolBarExtract"


interface IProps {
  value: string
  change: (e: any) => string
  exportPDF: () => void
  exportCSV: () => void
}

export const HeaderExtract: React.FC<IProps> = ({
  value,
  change,
  exportPDF,
  exportCSV
}) => {
  return (
    <>
      <div className='card-header border-0 pt-6'>
        <SearchComponent value={value} change={change} />
        {/* begin::Card toolbar */}
        <div className='card-toolbar'>
          {/* begin::Group actions */}
          <ToolBarExtract exportPDF={exportPDF} exportCSV={exportCSV} />
          {/* end::Group actions */}
        </div>
        {/* end::Card toolbar */}
      </div>
    </>
  )
}
