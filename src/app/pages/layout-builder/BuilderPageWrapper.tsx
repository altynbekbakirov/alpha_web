import React, {FC} from 'react'
import { useIntl } from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {BuilderPage} from './BuilderPage'

const BuilderPageWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'LAYOUT_BUILDER'})}</PageTitle>
      <BuilderPage />
    </>
  )
}

export default BuilderPageWrapper
