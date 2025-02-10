import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { RootState } from '@/store';

const AuthListener = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const navigate = useNavigate();
  const prevAuthRef = useRef<boolean>(isAuthenticated);

  useEffect(() => {
    if (prevAuthRef.current && !isAuthenticated) {
      message.info('Your session has expired. Please log in again.');
      navigate('/auth');
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, navigate]);

  return null; // This component doesn't render anything
};

export default AuthListener;
