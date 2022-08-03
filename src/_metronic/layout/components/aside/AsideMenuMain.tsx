/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      {/* DASHBOARD */}
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />

      {/* REPORTS */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {intl.formatMessage({id: 'MENU.REPORTS'})}
          </span>
        </div>
      </div>

      {/* PRODUCTS */}
      <AsideMenuItemWithSub
        to='/products'
        title={intl.formatMessage({id: 'MENU.PRODUCTS'})}
        icon='/media/icons/duotune/ecommerce/ecm011.svg'
        fontIcon='ecommerce-products'
      >
        <AsideMenuItem
          to='/products/remains'
          title={intl.formatMessage({id: 'MENU.PRODUCTS_REMAINS'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/products/fiche'
          title={intl.formatMessage({id: 'MENU.PRODUCTS_FICHE'})}
          hasBullet={true}
        />        
        <AsideMenuItem
          to='/products/price'
          title={intl.formatMessage({id: 'MENU.PRODUCTS_PRICE'})}
          hasBullet={true}
        />
      </AsideMenuItemWithSub>

      {/* PURCHASE */}
      <AsideMenuItemWithSub
        to='/purchase'
        title={intl.formatMessage({id: 'MENU.PURCHASE'})}
        icon='/media/icons/duotune/ecommerce/ecm004.svg'
        fontIcon='ecommerce-purchases'
      >
        <AsideMenuItem
          to='/purchase/fiche'
          title={intl.formatMessage({id: 'MENU.PURCHASE_FICHE'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/purchase/client'
          title={intl.formatMessage({id: 'MENU.PURCHASE_CLIENT'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/purchase/month'
          title={intl.formatMessage({id: 'MENU.PURCHASE_MONTH'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/purchase/total'
          title={intl.formatMessage({id: 'MENU.PURCHASE_TOTAL'})}
          hasBullet={true}
        />
      </AsideMenuItemWithSub>

      {/* SALES */}
      <AsideMenuItemWithSub
        to='/sale'
        title={intl.formatMessage({id: 'MENU.SALE'})}
        icon='/media/icons/duotune/ecommerce/ecm001.svg'
        fontIcon='ecommerce-cart'
      >
        <AsideMenuItem
          to='/sale/fiche'
          title={intl.formatMessage({id: 'MENU.SALE_FICHE'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/sale/client'
          title={intl.formatMessage({id: 'MENU.SALE_CLIENT'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/sale/manager'
          title={intl.formatMessage({id: 'MENU.SALE_MANAGER'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/sale/month'
          title={intl.formatMessage({id: 'MENU.SALE_MONTH'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/sale/daily'
          title={intl.formatMessage({id: 'MENU.SALE_DAILY'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/sale/total'
          title={intl.formatMessage({id: 'MENU.SALE_TOTAL'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/sale/table'
          title={intl.formatMessage({id: 'MENU.SALE_TABLE'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/sale/detail'
          title={intl.formatMessage({id: 'MENU.SALE_DETAIL'})}
          hasBullet={true}
        />
      </AsideMenuItemWithSub>

      {/* FINANCE */}
      <AsideMenuItemWithSub
        to='/finance'
        title={intl.formatMessage({id: 'MENU.FINANCE'})}
        icon='/media/icons/duotune/ecommerce/ecm002.svg'
        fontIcon='ecommerce-finance'
      >
        <AsideMenuItem
          to='/finance/customer'
          title={intl.formatMessage({id: 'MENU.FINANCE_CUSTOMER'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/finance/extract'
          title={intl.formatMessage({id: 'MENU.FINANCE_EXTRACT'})}
          hasBullet={true}
        />
      </AsideMenuItemWithSub>

      {/* CASE */}
      <AsideMenuItemWithSub
        to='/case'
        title={intl.formatMessage({id: 'MENU.SAFE_DEPOSIT'})}
        icon='/media/icons/duotune/ecommerce/ecm007.svg'
        fontIcon='ecommerce-case'
      >
        <AsideMenuItem
          to='/case/summary'
          title={intl.formatMessage({id: 'MENU.SAFE_ACCOUNT_SUMMARY'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/case/extract'
          title={intl.formatMessage({id: 'MENU.SAFE_EXTRACT'})}
          hasBullet={true}
        />
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub>

      {/* APPS */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {intl.formatMessage({id: 'MENU.APPS'})}
          </span>
        </div>
      </div>

      {/* UTILITY */}
      <AsideMenuItemWithSub
        to='/utility'
        title={intl.formatMessage({id: 'MENU.UTILITY'})}
        fontIcon='utility-icon'
        icon='/media/icons/duotune/technology/teh001.svg'
      >
        <AsideMenuItem
          to='/utility'
          title={intl.formatMessage({id: 'MENU.UTILITY_CLEAR_NETWORK'})}
          hasBullet={true}
        />
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>

      {/* USER MANAGEMENT */}
      <div className='menu-item'>
        <AsideMenuItem
          to='/apps/user-management/users'
          icon='/media/icons/duotune/communication/com006.svg'
          title={intl.formatMessage({id: 'MENU.USER_MANAGEMENT'})}
          fontIcon='bi-person'
        />
        <AsideMenuItem
          to='/builder'
          icon='/media/icons/duotune/general/gen019.svg'
          title={intl.formatMessage({id: 'MENU.BUILDER.PAGE'})}
          fontIcon='bi-layers'
        />
      </div>
    </>
  )
}
