import MaterialPrices from '../../../../../../_metronic/partials/modals/products/MaterialPrices'
import MaterialTransactions from '../../../../../../_metronic/partials/modals/products/MaterialTransactions'
import { SearchComponent } from './Search'
import { ToolBarDetail } from './ToolBarDetail'
interface IProps {
  value: string
  change: (e: any) => string
  exportPDF: () => void
  exportCSV: () => void
  show: boolean
  setShow: () => void
  item: string
  showPrice: boolean
  setShowPrice: () => void
}

const HeaderDetail: React.FC<IProps> = ({
  value,
  change,
  exportPDF,
  exportCSV,
  show,
  setShow,
  item,
  showPrice,
  setShowPrice,
}) => {
  return (
    <>
      <div className='card-header border-0 pt-6'>
        <SearchComponent value={value} change={change} />
        {/* begin::Card toolbar */}
        <div className='card-toolbar'>
          {/* begin::Group actions */}
          <ToolBarDetail exportPDF={exportPDF} exportCSV={exportCSV} />
          {/* end::Group actions */}
        </div>
        {/* end::Card toolbar */}
      </div>
      <MaterialTransactions show={show} setShow={setShow} item={item} />
      <MaterialPrices showPrice={showPrice} setShowPrice={setShowPrice} item={item} />
    </>
  )
}

export {HeaderDetail}
