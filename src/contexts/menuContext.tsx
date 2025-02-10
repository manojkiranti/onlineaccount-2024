import { MenuTabType, MenuType } from '@/types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import { MENU_ITEMS } from '@/devFrontData/menu';

interface MenuContextType {
  activeMenuKey: string;
  setActiveMenuKey: (menu: string) => void;
  activeMenuItem: null | MenuType;
  setActiveMenuItem: (menuItem: MenuType) => void;
  activeTabs: MenuTabType[] | null;
}
const MenuContext = createContext<MenuContextType>({
  activeMenuKey: '',
  setActiveMenuKey: (menu: string) => {},
  activeMenuItem: null,
  setActiveMenuItem: (menuItem: MenuType) => {},
  activeTabs: null,
});

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [activeMenuKey, setActiveMenuKey] = useState('');
  const [activeMenuItem, setActiveMenuItem] = useState<MenuType | null>(null);
  const [activeTabs, setActiveTabs] = useState<MenuTabType[] | null>(null);
  const [activeTabItem, setActiveTabItem] = useState<MenuTabType | null>(null);
  const location = useLocation();

  /**
   * when the page refreshes it get the active menu item through the url
   */

  useEffect(() => {
    const findMenuItemByPath = (
      items: MenuType[],
      path: string,
      returnParent: boolean,
    ): MenuType | null => {
      for (const item of items) {
        if (item.link === path) {
          if (returnParent && item.parentKey) {
            return findParentByParentKey(MENU_ITEMS, item.parentKey);
          }
          return item;
        }

        if (item.children) {
          const foundInChildren = findMenuItemByPath(
            item.children,
            path,
            returnParent,
          );
          if (foundInChildren) return foundInChildren;
        }
      }
      return null;
    };

    const findParentByParentKey = (
      items: MenuType[],
      key: string,
    ): MenuType | null => {
      for (const item of items) {
        if (item.key === key) return item;
        if (item.children) {
          const found = findParentByParentKey(item.children, key);
          if (found) return found;
        }
      }
      return null;
    };

    const activeItem = findMenuItemByPath(MENU_ITEMS, location.pathname, false);
    setActiveMenuItem(activeItem);

    /**
     * todo: implement active tab item too
     */
    // if (activeItem && activeItem.tabs) {
    //     const activeTab = activeItem.tabs.find(tab => tab.link === location.pathname);

    //     setActiveTab(activeItem?.tabs);
    // } else {
    //     setActiveTab(null);
    // }

    if (activeItem) {
      const defaultItem: MenuTabType = {
        key: activeItem.key,
        label: activeItem.label,
        link: activeItem.link as string,
      };

      // // ts-ignore
      // setActiveTabs([defaultItem, ...(activeItem.tabs || [])]);
    }
  }, [location]);

  return (
    <MenuContext.Provider
      value={{
        activeMenuKey,
        setActiveMenuKey,
        activeMenuItem,
        setActiveMenuItem,
        activeTabs,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
