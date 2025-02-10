import { theme } from 'antd';
import { CSSProperties, FC, ReactNode } from 'react';

const { useToken } = theme;

interface MessageBoxProps {
  children: ReactNode;
  style?: CSSProperties;
}
const MessageBox: FC<MessageBoxProps> = ({ children, style }) => {
  const { token } = useToken();
  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '5px',
        background: token.colorBgContainerDisabled,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default MessageBox;
