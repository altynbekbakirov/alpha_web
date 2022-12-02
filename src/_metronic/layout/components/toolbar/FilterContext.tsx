import {createContext, useState} from 'react'
import { IFinanceAging, IFinanceCustomer } from '../../../../app/modules/apps/reports/finance/models/finance_model'
import {IProductRemains} from '../../../../app/modules/apps/reports/products/models/products_model'
import {IPurchaseClient, IPurchaseFiche, IPurchaseTotal} from '../../../../app/modules/apps/reports/purchases/models/purchases_model'
import { ISafeExtract } from '../../../../app/modules/apps/reports/safes/models/safes_model'
import {ISaleClient, ISaleDaily, ISaleDetail, ISaleFiche, ISaleManager, ISaleTable, ISaleTotal, ISaleWare} from '../../../../app/modules/apps/reports/sale/models/sale_model'

export interface FilterContextModel {
  filterProductName1?: string
  setFilterProductName1: (_title: string) => void
  filterClientName?: string
  setFilterClientName: (_code: string) => void
  startDate?: Date
  setStartDate: (_description: Date) => void
  endDate?: Date
  setEndDate: (_description: Date) => void
  items?: IProductRemains[]
  setItems: (items: IProductRemains[]) => void
  purchaseClientItems?: IPurchaseClient[]
  setPurchaseClientItems: (items: IPurchaseClient[]) => void
  purchaseFicheItems?: IPurchaseFiche[]
  setPurchaseFicheItems: (items: IPurchaseFiche[]) => void
  purchaseTotalItems?: IPurchaseTotal[]
  setPurchaseTotalItems: (items: IPurchaseTotal[]) => void
  saleFicheItems?: ISaleFiche[]
  setSaleFicheItems: (items: ISaleFiche[]) => void
  saleClientItems?: ISaleClient[]
  setSaleClientItems: (items: ISaleClient[]) => void
  saleManagerItems?: ISaleManager[]
  setSaleManagerItems: (items: ISaleManager[]) => void
  saleWareItems?: ISaleWare[]
  setSaleWareItems: (items: ISaleWare[]) => void
  saleDailyItems?: ISaleDaily[]
  setSaleDailyItems: (items: ISaleDaily[]) => void
  saleTableItems?: ISaleTable[]
  setSaleTableItems: (items: ISaleTable[]) => void
  saleTotalItems?: ISaleTotal[]
  setSaleTotalItems: (items: ISaleTotal[]) => void
  saleDetailItems?: ISaleDetail[]
  setSaleDetailItems: (items: ISaleDetail[]) => void
  financeCustomerItems?: IFinanceCustomer[]
  setFinanceCustomerItems: (items: IFinanceCustomer[]) => void
  financeAgingItems?: IFinanceAging[]
  setFinanceAgingItems: (items: IFinanceAging[]) => void
  safeExtractItems?: ISafeExtract[]
  setSafeExtractItems: (items: ISafeExtract[]) => void
}

const FilterContext = createContext<FilterContextModel>({
  setFilterProductName1: (_title: string) => {},
  setFilterClientName: (_code) => {},
  setStartDate: (_description: Date) => {},
  setEndDate: (_description: Date) => {},
  setItems: () => {},
  setPurchaseFicheItems: () => {},
  setPurchaseClientItems: () => {},
  setPurchaseTotalItems: () => {},
  setSaleFicheItems: () => {},
  setSaleClientItems: () => {},
  setSaleManagerItems: () => {},
  setSaleWareItems: () => {},
  setSaleDailyItems: () => {},
  setSaleTableItems: () => {},
  setSaleTotalItems: () => {},
  setSaleDetailItems: () => {},
  setFinanceCustomerItems: () => {},
  setFinanceAgingItems: () => {},
  setSafeExtractItems: () => {},
})

const FilterContextProvider: React.FC = ({children}) => {
  const [filterProductName1, setFilterProductName1] = useState('')
  const [filterClientName, setFilterClientName] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [items, setItems] = useState<IProductRemains[]>([])
  const [purchaseFicheItems, setPurchaseFicheItems] = useState<IPurchaseFiche[]>([])
  const [purchaseClientItems, setPurchaseClientItems] = useState<IPurchaseClient[]>([])
  const [purchaseTotalItems, setPurchaseTotalItems] = useState<IPurchaseTotal[]>([])
  const [saleFicheItems, setSaleFicheItems] = useState<ISaleFiche[]>([])
  const [saleClientItems, setSaleClientItems] = useState<ISaleClient[]>([])
  const [saleManagerItems, setSaleManagerItems] = useState<ISaleManager[]>([])
  const [saleDailyItems, setSaleDailyItems] = useState<ISaleDaily[]>([])
  const [saleTotalItems, setSaleTotalItems] = useState<ISaleTotal[]>([])
  const [saleDetailItems, setSaleDetailItems] = useState<ISaleDetail[]>([])
  const [saleTableItems, setSaleTableItems] = useState<ISaleTable[]>([])
  const [financeCustomerItems, setFinanceCustomerItems] = useState<IFinanceCustomer[]>([])
  const [financeAgingItems, setFinanceAgingItems] = useState<IFinanceAging[]>([])
  const [safeExtractItems, setSafeExtractItems] = useState<ISafeExtract[]>([])
  const [saleWareItems, setSaleWareItems] = useState<ISaleWare[]>([])

  const value: FilterContextModel = {
    filterProductName1,
    setFilterProductName1,
    filterClientName,
    setFilterClientName,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    items,
    setItems,
    purchaseFicheItems,
    setPurchaseFicheItems,
    purchaseClientItems,
    setPurchaseClientItems,
    purchaseTotalItems,
    setPurchaseTotalItems,
    saleFicheItems,
    setSaleFicheItems,
    saleTotalItems,
    setSaleTotalItems,
    saleDetailItems,
    setSaleDetailItems,
    saleClientItems,
    setSaleClientItems,
    saleManagerItems,
    setSaleManagerItems,
    saleDailyItems,
    setSaleDailyItems,
    saleTableItems,
    setSaleTableItems,
    financeCustomerItems,
    setFinanceCustomerItems,
    financeAgingItems,
    setFinanceAgingItems,
    safeExtractItems,
    setSafeExtractItems,
    saleWareItems,
    setSaleWareItems
  }
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export {FilterContextProvider, FilterContext}
