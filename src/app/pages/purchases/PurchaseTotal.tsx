import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'

const PurchaseTotal: FC = () => {
  const intl = useIntl()

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.PURCHASE_TOTAL'})}</PageTitle>
      <ProductsContainer />
    </>
  )
}

const ProductsContainer: FC = () => {
  return <div>Purchase Total page</div>
}

export default PurchaseTotal
