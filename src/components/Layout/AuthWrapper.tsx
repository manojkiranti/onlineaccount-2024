import { FC } from 'react';
import { Container } from '../Elements';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  return (
    <div className="auth-layout" style={{ padding: '1rem' }}>
      <Container>{children}</Container>
    </div>
  );
};

export default AuthWrapper;
