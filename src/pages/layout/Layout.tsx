import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import { MenuProvider } from '@/contexts/menuContext';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <MenuProvider>
        <div className={styles.mainLayout}>
          <div className={styles.sidebarContainer}>
            <Sidebar />
          </div>
          <div>
            <Header />
          </div>
          <div className={styles.mainBodyContainer}>
            <div className={styles.mainBody}>
              <Outlet /> {/* This will render the child routes */}
            </div>
          </div>
        </div>
      </MenuProvider>
    </>
  );
};

export default Layout;
