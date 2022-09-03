import React, {FC} from 'react'
import {useIntl} from 'react-intl'
import { KTCard, KTCardBody } from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import { NetworkClearCard } from '../../../_metronic/partials/cards/NetworkClearCard'

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
  return (
    <KTCard>
      <KTCardBody>
        <NetworkClearCard />
      </KTCardBody>
    </KTCard>
  )
}

export default ClearNetwork
