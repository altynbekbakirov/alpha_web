import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'

const SaleDaily: FC = () => {
  const intl = useIntl()

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.SALE_DAILY'})}</PageTitle>
      <ProductsContainer />
    </>
  )
}

const ProductsContainer: FC = () => {
  return <div>Sale Daily page</div>
}

export default SaleDaily
