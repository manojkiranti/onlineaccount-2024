import { MenuTabType } from '@/types';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';

import styles from './Header.module.scss';

interface HeaderNavigationProps {
  tabItems: MenuTabType[];
}

const HeaderNavigation: FC<HeaderNavigationProps> = ({ tabItems }) => {
  return (
    <>
      <ul className={styles.headerMenu}>
        {tabItems?.map((menu) => (
          <li key={menu.key}>
            <NavLink
              to={menu.link as string}
              className={({ isActive }) => (isActive ? styles.active : '')}
              end
            >
              {menu.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HeaderNavigation;
