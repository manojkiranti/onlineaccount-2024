import { ReactNode } from 'react';
import styles from './Layout.module.scss';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import { MenuProvider } from '@/contexts/menuContext';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <MenuProvider>
        
        <Header />
        <div className={styles.mainLayout}>
          <div className={styles.sidebarContainer}>
            <Sidebar />
          </div>

          <div className={styles.mainBodyContainer}>
            <div className={styles.mainBody}>{children}</div>
          </div>
        </div>
      </MenuProvider>
    </>
  );
};

export default MainLayout;
