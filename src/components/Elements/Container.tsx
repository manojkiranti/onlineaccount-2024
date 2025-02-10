import { CSSProperties, FC } from 'react';

interface ContainerProps {
  children: React.ReactNode;
  style?: CSSProperties;
  width?: 'md' | 'sm' | 'lg';
  align?: 'center' | 'left';
  fullWidth?: boolean;
}

const sizes = {
  md: 1200,
  sm: 1024,
  lg: 1320,
};
const Container: FC<ContainerProps> = ({
  width,
  children,
  align = 'center',
  fullWidth = false,
  style,
}) => {
  const containerWidth = width ? sizes[width] : 1320;

  return (
    <div
      style={{
        maxWidth: `${fullWidth ? '100%' : containerWidth}px`,
        margin: `${align === 'center' ? '0 auto' : '0'}`,
        padding: '0 16px',
        width: '100%',
        ...style,
      }}
      className="main-container"
    >
      {children}
    </div>
  );
};
export default Container;
