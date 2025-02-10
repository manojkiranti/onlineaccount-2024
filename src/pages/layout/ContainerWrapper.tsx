import React from 'react';

const ContainerWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        width: '95%',
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  );
};

export default ContainerWrapper;
