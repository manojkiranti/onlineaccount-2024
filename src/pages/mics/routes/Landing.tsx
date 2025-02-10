import { Container, PageTitle } from '@/components/Elements';
import { Col, Row } from 'antd';

const LandingPage = () => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={24} md={24}>
            <PageTitle title="Landing Page" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LandingPage;
