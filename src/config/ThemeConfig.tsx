import { FC, ReactNode } from 'react';
import { ConfigProvider, theme, Grid } from 'antd';
import { useTheme } from '../contexts/themeContext';

const { useBreakpoint } = Grid;

interface ThemeConfigProps {
  children: ReactNode;
}

const ThemeConfig: FC<ThemeConfigProps> = ({ children }) => {
  const screens = useBreakpoint();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { theme: currentTheme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Poppins',
          colorPrimary: '#0055A6',
          colorBorderSecondary: currentTheme === 'dark' ? '#303030' : '#e1e1e1',
          colorLink: '#003862',
          colorWarning: '#f5bf36',
          colorText: '#475569',
          colorTextHeading: '#1E293B',
        },
        components: {
          Card: {
            // colorBorder: "@colorBorderSecondary"
          },
          Button: {
            colorPrimary: '#0055A6',
            colorPrimaryHover: '#074075',
            primaryColor: '#fff',
            primaryShadow: 'none',
            fontWeight: '500',
            controlHeightLG: 42,
            paddingContentHorizontalLG: 12
          },

          Typography: {
            fontSizeHeading1: screens.md ? 45 : 30,
            fontSizeHeading2: screens.md ? 34 : 28,
            lineHeightHeading1: 1.5,
            lineHeightHeading2: 1.4,
            fontWeightStrong: 600,
            colorTextHeading: currentTheme === 'dark' ? '#ffffff' : '#1E293B',

            // fontFamily:"Mona Sans, Arial",
            // fontF
          },

          Menu: {
            itemActiveBg: 'transparent',
            itemSelectedBg: 'transparent',
            darkItemSelectedColor: '#f5bf36',
            darkGroupTitleColor: '#fff',
            colorLinkActive: '#fff',
            groupTitleColor: 'red',
          },
          Collapse: {
            headerBg: "#ffffff"
          }
        },
        algorithm: currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeConfig;
