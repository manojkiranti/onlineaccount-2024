import { BrowserRouter as Router } from 'react-router-dom';
import { FC, ReactNode, Suspense } from 'react';
import { ThemeProvider } from '../contexts/themeContext';
import { Spinner } from '@/components/Elements';
import ThemeConfig from '@/config/ThemeConfig';
import { HelmetProvider } from 'react-helmet-async';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <HelmetProvider>
        <ThemeProvider>
          <ThemeConfig>
            <Router>{children}</Router>
          </ThemeConfig>
        </ThemeProvider>
      </HelmetProvider>
    </Suspense>
  );
};

export default AppProvider;
