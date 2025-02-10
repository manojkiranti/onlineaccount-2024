import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { MenuType } from '@/types';
import { ICON_MAPPER } from '@/constant/icons';

//@ts-expect-error : Type mismatch

const createMenuItem = (item: MenuType): MenuProps['items'][number] => ({
  key: item.key,
  label: item.link ? <Link to={item.link}>{item.label}</Link> : item.label,
  icon: item.icon ? ICON_MAPPER[item.icon] : undefined,
  children: item.children ? item.children.map(createMenuItem) : undefined,
});

export const manageMenuList = (menuItems: MenuType[]): MenuProps['items'] => {
  return menuItems.reduce<MenuProps['items']>(
    (acc, item) => {
      if (item.children && item.children.length === 1) {
        const child = createMenuItem(item.children[0]);
        acc?.push({
          key: item.key,
          label: item.link ? (
            <Link to={item.link}>{item.label}</Link>
          ) : (
            item.label
          ),
          icon: item.icon ? ICON_MAPPER[item.icon] : undefined,
          children: [child],
        });
      } else if (item.children) {
        acc?.push({
          key: item.key,
          label: item.link ? (
            <Link to={item.link}>{item.label}</Link>
          ) : (
            item.label
          ),
          icon: item.icon ? ICON_MAPPER[item.icon] : undefined,
          children: item.children.map(createMenuItem),
        });
      } else {
        acc?.push(createMenuItem(item));
      }
      return acc;
    },
    [] as MenuProps['items'],
  );
};
