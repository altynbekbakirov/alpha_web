import { ISearch } from "../models/purchases_model" 
import { ProductsSearchComponent } from "./Search"
import { ProductsToolBar } from "./ToolBar"

const ProductsHeader: React.FC<ISearch> = ({value, change}) => {
  return (
    <div className='card-header border-0 pt-6'>
      <ProductsSearchComponent value={value} change={change} />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <ProductsToolBar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {ProductsHeader}