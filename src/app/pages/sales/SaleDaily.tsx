import React from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'

const SaleDaily: React.FC = () => {
  const intl = useIntl()
  
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.SALE_DAILY'})}</PageTitle>
      <ItemsContainer/>
    </>
  )
}

const ItemsContainer = () => {
  return (
    <div>Sale Daily report</div>
  )
}

export default SaleDaily
