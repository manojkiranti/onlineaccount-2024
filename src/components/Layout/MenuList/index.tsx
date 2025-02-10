import { FC, useEffect, useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { MENU_ITEMS } from '@/devFrontData/menu';
import { manageMenuList } from '@/utils/menuUtils';
import { useLocation } from 'react-router-dom';

interface MenuListProps {
  onSelect?: () => void;
}

const MenuList: FC<MenuListProps> = () => {
  const location = useLocation();
  const defaultOpenKeys = ['3', '4'];
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const findMenuKeyByPath = (path: string, items: any[]): string | null => {
    for (const item of items) {
      if (item.link === path) {
        return item.key;
      }
      if (item.children) {
        const childKey = findMenuKeyByPath(path, item.children);
        if (childKey) return childKey;
      }
    }
    return null;
  };

  const findParentKeys = (currentKey: string, items: any[]): string[] => {
    const parentKeys: string[] = [];

    const findParent = (items: any[], targetKey: string) => {
      for (const item of items) {
        if (item.children) {
          if (item.children.some((child: any) => child.key === targetKey)) {
            parentKeys.push(item.key);
          }
          findParent(item.children, targetKey);
        }
      }
    };

    findParent(items, currentKey);
    return parentKeys;
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const menuKey = findMenuKeyByPath(currentPath, MENU_ITEMS);

    if (menuKey) {
      setSelectedKeys([menuKey]);

      const parentKeys = findParentKeys(menuKey, MENU_ITEMS);
      if (parentKeys.length > 0) {
        setOpenKeys((prevKeys) => {
          const newKeys = new Set([...prevKeys, ...parentKeys]);
          return Array.from(newKeys);
        });
      }
    }
  }, [location.pathname]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedKeys([e.key]);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys as string[]);
  };

  const updatedItems = manageMenuList(MENU_ITEMS);

  return (
    <Menu
      selectedKeys={selectedKeys}
      onClick={handleMenuClick}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      style={{ background: 'none', border: 'none' }}
      items={updatedItems}
      theme="dark"
    />
  );
};

export default MenuList;
