import { routerArray } from '@/routers'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MENU_DEFAULT_SELECT_KEY } from '@/constant'
import style from './menu.module.less'
import * as Icons from '@ant-design/icons'

const LayoutMenu: React.FC = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([MENU_DEFAULT_SELECT_KEY])

  type MenuItem = Required<MenuProps>['items'][number]

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem
  }

  const customIcons: { [key: string]: any } = Icons

  const addIcon = (name: string) => {
    console.log(customIcons)
    return React.createElement(customIcons[name])
  }

  const reGroupMenusItems = (menus, newArr = []) => {
    const hasChidlren = (data) => {
      return Array.isArray(data.children) && data.children.length > 0
    }

    menus.forEach((menuItem) => {
      if (!hasChidlren(menuItem)) return newArr.push(getItem(menuItem.meta.title, menuItem.path))

      const [childFirstItem, ...childs] = menuItem.children

      newArr.push({
        ...getItem(
          childFirstItem.meta.title,
          childFirstItem.path,
          childFirstItem.icon ? addIcon(childFirstItem.icon) : null,
        ),
        children: childs.length > 0 ? reGroupMenusItems(childs) : null,
      })
    })

    console.log(newArr)

    return newArr
  }

  const getMenuData = () => {
    setMenus(reGroupMenusItems(routerArray))
  }

  const [menus, setMenus] = useState<MenuItem[]>([])

  useEffect(() => {
    console.log(pathname)
    setSelectedKeys([pathname])
  }, [pathname])

  useEffect(() => {
    getMenuData()
  }, [])

  const handleClickMenuItem: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    navigate(e.key)
  }

  return (
    <div className={style.menu}>
      <Menu
        mode='inline'
        triggerSubMenuAction='click'
        selectedKeys={selectedKeys}
        onClick={handleClickMenuItem}
        items={menus}
      ></Menu>
    </div>
  )
}

export default LayoutMenu
