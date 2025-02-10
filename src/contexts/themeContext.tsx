import {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  ReactNode,
  FunctionComponent,
  useEffect,
} from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  sidebarCollapseState: boolean;
  toggleSidebarState: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 *
 * Todo: utils localstoage integration is remaining
 */

const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ children }) => {
  const initialTheme = (): 'light' | 'dark' => {
    const storedTheme = localStorage.getItem('odin_app_theme');
    return storedTheme === 'dark' ? 'dark' : 'light';
  };
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);
  const [sidebarCollapseState, setSidebarCollapseState] =
    useState<boolean>(false);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleSidebarState = () => {
    setSidebarCollapseState(!sidebarCollapseState);
  };

  useEffect(() => {
    if (sidebarCollapseState) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  }, [sidebarCollapseState]);

  useLayoutEffect(() => {
    localStorage.setItem('odin_app_theme', theme);

    if (theme === 'light') {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, sidebarCollapseState, toggleSidebarState }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };
