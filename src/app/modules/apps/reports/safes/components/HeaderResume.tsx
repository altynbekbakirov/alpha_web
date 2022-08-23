import SafeResumeContents from "../../../../../../_metronic/partials/modals/safe/SafeResumeContents"
import { SearchComponent } from "./Search"
import { ToolBar } from "./ToolBar"


interface IProps {
  value: string
  change: (e: any) => string
  exportPDF: () => void
  exportCSV: () => void
  show: boolean
  setShow: () => void
  item: string  
}

const HeaderResume: React.FC<IProps> = ({
  value,
  change,
  exportPDF,
  exportCSV,
  show,
  setShow, item
}) => {
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
      <SafeResumeContents show={show} setShow={setShow} item={item} />
    </>
  )
}

export {HeaderResume}
