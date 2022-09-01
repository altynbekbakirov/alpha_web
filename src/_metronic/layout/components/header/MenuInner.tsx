import React from 'react'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {useIntl} from 'react-intl'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      {/* DASHBOARD */}
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />

      {/* REPORTS */}
      <MenuInnerWithSub
        title={intl.formatMessage({id: 'MENU.REPORTS_HEADER'})}
        to='/reports'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        {/* PRODUCTS */}
        <MenuInnerWithSub
          to='/products'
          title={intl.formatMessage({id: 'MENU.PRODUCTS'})}
          icon='/media/icons/duotune/ecommerce/ecm011.svg'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem
            to='/products/remains'
            title={intl.formatMessage({id: 'MENU.PRODUCTS_REMAINS'})}
            hasBullet={true}
          />
          <MenuItem
            to='/products/fiche'
            title={intl.formatMessage({id: 'MENU.PRODUCTS_FICHE'})}
            hasBullet={true}
          />
          <MenuItem
            to='/products/price'
            title={intl.formatMessage({id: 'MENU.PRODUCTS_PRICE'})}
            hasBullet={true}
          />
        </MenuInnerWithSub>

        {/* PURCHASE */}
        <MenuInnerWithSub
          to='/purchase'
          title={intl.formatMessage({id: 'MENU.PURCHASE'})}
          icon='/media/icons/duotune/ecommerce/ecm004.svg'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem
            to='/purchase/fiche'
            title={intl.formatMessage({id: 'MENU.PURCHASE_FICHE'})}
            hasBullet={true}
          />
          <MenuItem
            to='/purchase/client'
            title={intl.formatMessage({id: 'MENU.PURCHASE_CLIENT'})}
            hasBullet={true}
          />
          <MenuItem
            to='/purchase/month'
            title={intl.formatMessage({id: 'MENU.PURCHASE_MONTH'})}
            hasBullet={true}
          />
          <MenuItem
            to='/purchase/total'
            title={intl.formatMessage({id: 'MENU.PURCHASE_TOTAL'})}
            hasBullet={true}
          />
        </MenuInnerWithSub>

        {/* SALES */}
        <MenuInnerWithSub
          to='/sale'
          title={intl.formatMessage({id: 'MENU.SALE'})}
          icon='/media/icons/duotune/ecommerce/ecm001.svg'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem
            to='/sale/fiche'
            title={intl.formatMessage({id: 'MENU.SALE_FICHE'})}
            hasBullet={true}
          />
          <MenuItem
            to='/sale/client'
            title={intl.formatMessage({id: 'MENU.SALE_CLIENT'})}
            hasBullet={true}
          />
          <MenuItem
            to='/sale/manager'
            title={intl.formatMessage({id: 'MENU.SALE_MANAGER'})}
            hasBullet={true}
          />
          <MenuItem
            to='/sale/month'
            title={intl.formatMessage({id: 'MENU.SALE_MONTH'})}
            hasBullet={true}
          />
          <MenuItem
            to='/sale/daily'
            title={intl.formatMessage({id: 'MENU.SALE_DAILY'})}
            hasBullet={true}
          />
          <MenuItem
            to='/sale/total'
            title={intl.formatMessage({id: 'MENU.SALE_TOTAL'})}
            hasBullet={true}
          />
          <MenuItem
            to='/sale/table'
            title={intl.formatMessage({id: 'MENU.SALE_TABLE'})}
            hasBullet={true}
          />
          <MenuItem
            to='/sale/detail'
            title={intl.formatMessage({id: 'MENU.SALE_DETAIL'})}
            hasBullet={true}
          />
        </MenuInnerWithSub>

        {/* FINANCE */}
        <MenuInnerWithSub
          to='/finance'
          title={intl.formatMessage({id: 'MENU.FINANCE'})}
          icon='/media/icons/duotune/ecommerce/ecm002.svg'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem
            to='/safes/summary'
            title={intl.formatMessage({id: 'MENU.FINANCE_CUSTOMER'})}
            hasBullet={true}
          />
          <MenuItem
            to='/safes/fiche'
            title={intl.formatMessage({id: 'MENU.FINANCE_FICHE'})}
            hasBullet={true}
          />
        </MenuInnerWithSub>

        {/* CASE */}
        <MenuInnerWithSub
          to='/case'
          title={intl.formatMessage({id: 'MENU.SAFE_DEPOSIT'})}
          icon='/media/icons/duotune/ecommerce/ecm007.svg'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem
            to='/case/summary'
            title={intl.formatMessage({id: 'MENU.SAFE_ACCOUNT_SUMMARY'})}
            hasBullet={true}
          />
          <MenuItem
            to='/case/extract'
            title={intl.formatMessage({id: 'MENU.SAFE_EXTRACT'})}
            hasBullet={true}
          />
        </MenuInnerWithSub>
      </MenuInnerWithSub>

      {/* UTILITY */}
      <MenuInnerWithSub
        title={intl.formatMessage({id: 'MENU.UTILITY'})}
        to='/utility'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem
          to='/utility'
          title={intl.formatMessage({id: 'MENU.UTILITY_CLEAR_NETWORK'})}
          hasBullet={true}
        />
      </MenuInnerWithSub>

      {/* USER MANAGEMENT */}
      {/* <MenuItem
        title={intl.formatMessage({id: 'MENU.USER_MANAGEMENT'})}
        to='/apps/user-management/users'
      /> */}
      <MenuItem title={intl.formatMessage({id: 'MENU.BUILDER.PAGE'})} to='/builder' />
    </>
  )
}
