import { Spin } from 'antd';
import { useAppSelector } from '@/hooks/hooks';

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const selectIsGlobalLoading = createSelector(
  (state: RootState) => state.purchaseAPI.queries,
  (state: RootState) => state.purchaseAPI.mutations,
  (queries, mutations) => {
    const queriesLoading = Object.values(queries).some(
      (query) => query && query.status === 'pending',
    );

    const mutationsLoading = Object.values(mutations).some(
      (mutation) => mutation && mutation.status === 'pending',
    );

    return queriesLoading || mutationsLoading;
  },
);

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const Loader = () => {
  const isLoading = useSelector(selectIsGlobalLoading);
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

export default Loader;
