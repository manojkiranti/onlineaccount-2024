import { Container } from '@/components/Elements';
import { Head } from '@/components/Head';
import { Row, Col, Alert } from 'antd';
import OnboardHeader from '../components/OnboardHeader';

import styles from '../styles/layout.module.scss';

const ThankYou = () => {
  return (
    <div className={styles.onboardContainer}>
      <Head title="Thank You" />
      <OnboardHeader />
      <div style={{ padding: '1rem 0' }}>
        <Container>
          <Row align="middle" gutter={30}>
            <Col xs={24} md={24}>
              <Alert
                message="Thank You"
                description="A verification link has been sent to your email. Please click the link to verify and continue the process."
                type="success"
                showIcon
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ThankYou;
