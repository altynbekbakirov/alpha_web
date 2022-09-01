import {FC} from 'react'
import {useIntl} from 'react-intl'

const Error404: FC = () => {
  const intl = useIntl()
  return (
    <>
      <h1 className='fw-bolder fs-4x text-gray-700 mb-10'>
        {intl.formatMessage({id: 'ERROR_PAGE_404_PAGE_NOT_FOUND'})}
      </h1>

      <div className='fw-bold fs-3 text-gray-400 mb-15'>
      {intl.formatMessage({id: 'ERROR_PAGE_404_PAGE_DESCRIPTION'})} <br /> 
      </div>
    </>
  )
}

export {Error404}
