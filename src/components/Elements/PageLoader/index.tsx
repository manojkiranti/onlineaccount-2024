import { FC } from 'react';
import { Spin } from 'antd';

interface PageLoaderProps {
  isLoading: boolean;
}

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const PageLoader: FC<PageLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 99,
        display: 'flex',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.7)',
      }}
    >
      <Spin tip="Loading" size="large">
        {content}
      </Spin>
    </div>
  );
};

export default PageLoader;
