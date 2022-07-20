import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'

const PurchaseFiche: FC = () => {
  const intl = useIntl()

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.PURCHASE_FICHE'})}</PageTitle>
      <ProductsContainer />
    </>
  )
}

const ProductsContainer: FC = () => {
  return <div>Purchase Fiche page</div>
}

export default PurchaseFiche
