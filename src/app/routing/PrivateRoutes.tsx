import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import ProductsFiche from '../pages/products/ProductsFiche'
import ProductsRemains from '../pages/products/ProductsRemains'
import ProductsPrice from '../pages/products/ProductsPrice'
import PurchaseFiche from '../pages/purchases/PurchaseFiche'
import PurchaseClient from '../pages/purchases/PurchaseClient'
import PurchaseMonth from '../pages/purchases/PurchaseMonth'
import PurchaseTotal from '../pages/purchases/PurchaseTotal'
import SaleFiche from '../pages/sales/SaleFiche'
import SaleClient from '../pages/sales/SaleClient'
import SaleManager from '../pages/sales/SaleManager'
import SaleMonth from '../pages/sales/SaleMonth'
import SaleTotal from '../pages/sales/SaleTotal'
import SaleTable from '../pages/sales/SaleTable'
import SaleDetail from '../pages/sales/SaleDetail'
import SaleDaily from '../pages/sales/SaleDaily'
import FinanceCustomer from '../pages/finances/FinanceCustomer'
import FinanceExtract from '../pages/finances/FinanceExtract'
import ClearNetwork from '../pages/utility/ClearNetwork'
import FinanceFiche from '../pages/finances/FinanceFiche'
import Safes from '../pages/safe/Safes'
import SafesExtract from '../pages/safe/SafesExtract'
import FinanceAging from '../pages/finances/FinanceAging'

const PrivateRoutes = () => {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />

        {/* Products */}
        <Route path='products' element={<Navigate to='/products/remains' />} />
        <Route path='products/remains' element={<ProductsRemains />} />
        <Route path='products/fiche' element={<ProductsFiche />} />
        <Route path='products/price' element={<ProductsPrice />} />

        {/* Purchases */}
        <Route path='purchase' element={<Navigate to='/purchase/fiche' />} />
        <Route path='purchase/fiche' element={<PurchaseFiche />} />
        <Route path='purchase/client' element={<PurchaseClient />} />
        <Route path='purchase/month' element={<PurchaseMonth />} />
        <Route path='purchase/total' element={<PurchaseTotal />} />

        {/* Sales */}
        <Route path='sale' element={<Navigate to='/sale/fiche' />} />
        <Route path='sale/fiche' element={<SaleFiche />} />
        <Route path='sale/client' element={<SaleClient />} />
        <Route path='sale/manager' element={<SaleManager />} />
        <Route path='sale/month' element={<SaleMonth />} />
        <Route path='sale/daily' element={<SaleDaily />} />
        <Route path='sale/total' element={<SaleTotal />} />
        <Route path='sale/table' element={<SaleTable />} />
        <Route path='sale/detail' element={<SaleDetail />} />

        {/* Finances */}
        <Route path='finance' element={<Navigate to='/finance/customer' />} />
        <Route path='finance/customer' element={<FinanceCustomer />} />
        <Route path='finance/extract' element={<FinanceExtract />} />
        <Route path='finance/extract/:id' element={<FinanceExtract />} />
        <Route path='finance/fiche' element={<FinanceFiche />} />
        <Route path='finance/aging' element={<FinanceAging />} />

        {/* Safe Deposit */}
        <Route path='safes' element={<Navigate to='/safes/summary' />} />
        <Route path='safes/summary' element={<Safes />} />
        <Route path='safes/extract' element={<SafesExtract />} />
        <Route path='safes/extract/:code' element={<SafesExtract />} />

        {/* Utility */}
        <Route path='utility' element={<ClearNetwork />} />

        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
