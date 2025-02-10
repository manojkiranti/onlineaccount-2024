import { Container } from '@/components/Elements';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Flex, Row } from 'antd';

import { LOGO } from '@/constant/assets';
import WHATSAPP from '@/assets/images/social/whatsapp.png';

const OnboardHeader = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth'); // Navigate to the /auth route
  };
  return (
    <header style={{ padding: '2rem 0' }}>
      <Container>
        <Row gutter={30} align="middle">
          <Col xl={12}>
            <div>
              <img src={LOGO} alt="Odin Mortgage" />
            </div>
          </Col>
          <Col xl={12}>
            <Flex justify="flex-end" gap={30}>
              <Button
                size="large"
                style={{ width: '120px' }}
                type="primary"
                onClick={handleLoginClick}
              >
                Login
              </Button>
              <Button
                size="large"
                style={{ height: 'auto' }}
                icon={<img style={{ width: '24px' }} src={WHATSAPP} alt="" />}
              >
                {' '}
                Chat with us for help
              </Button>
            </Flex>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default OnboardHeader;
