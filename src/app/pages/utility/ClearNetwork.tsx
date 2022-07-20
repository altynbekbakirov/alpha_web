import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'

const ClearNetwork: FC = () => {
  const intl = useIntl()

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.UTILITY_CLEAR_NETWORK'})}</PageTitle>
      <ProductsContainer />
    </>
  )
}

const ProductsContainer: FC = () => {
  return <div>Clea rNetwork page</div>
}

export default ClearNetwork
