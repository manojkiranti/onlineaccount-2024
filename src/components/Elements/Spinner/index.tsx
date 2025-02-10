import { Spin } from 'antd';

const Spinner = () => {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 99,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin tip="Loading..."></Spin>
      </div>
    </>
  );
};

export default Spinner;
