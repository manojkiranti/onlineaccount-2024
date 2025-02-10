import { FC, ReactNode } from 'react';
import { Row, Col } from 'antd';

import { Container } from '@/components/Elements';

import Logo from '@/assets/images/genie.png';
import styles from '../styles/Login.module.scss';
interface AuthLayoutProps {
  children: ReactNode;
  banner: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, banner }) => {
  return (
    <div>
      <Container fullWidth={true} style={{ padding: '0' }}>
        <Row>
          <Col xs={24} md={12}>
            <div
              style={{
                padding: '2rem',
              }}
            >
              <img src={Logo} alt="Bank Genie" style={{ height: '40px' }} />
            </div>
            <div className={styles.formContainerStyles}>{children}</div>
          </Col>
          <Col xs={0} md={12}>
            {banner}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthLayout;
