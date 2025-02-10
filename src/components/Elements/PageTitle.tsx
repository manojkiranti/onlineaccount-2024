import Title, { TitleProps } from 'antd/es/typography/Title';
import { CSSProperties, FC } from 'react';

interface PageTitleProps {
  title: string;
  level?: TitleProps['level'];
  style?: CSSProperties;
}

const PageTitle: FC<PageTitleProps> = ({ title, level = 4, style }) => {
  // Define default styles
  const defaultStyle: CSSProperties = {
    marginTop: 0,
    marginBottom: '1rem',
  };
  const combinedStyle: CSSProperties = { ...defaultStyle, ...style };

  return (
    <Title level={level} style={combinedStyle}>
      {title}
    </Title>
  );
};

export default PageTitle;
