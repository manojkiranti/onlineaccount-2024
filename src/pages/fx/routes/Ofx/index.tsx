import ApplicationHeading from '@/components/Elements/Heading/ApplicationHeading';
import ApplicationSubHeading from '@/components/Elements/Heading/ApplicationSubHeading';
import { Button, Card, Col, Row } from 'antd';
import FeatureWithCheck from '../../components/FeatureWithCheck';
import OfxImage from '@/assets/images/fx/Ofx_Image.png';

import { whyChooseOfx } from './constants/chooseOfx';
import { steps } from './constants/steps';
import StepCard from '../../components/StepCard';
import { RightOutlined } from '@ant-design/icons';

const OfxPage = () => {
  return (
    <div>
      <ApplicationHeading title="Get preferential rates and $0 OFX fees*" />
      <Card>
        <Row gutter={[16, 16]}>
          <Col md={24} lg={15}>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <ApplicationSubHeading
                  title="Why Choose OFX"
                  style={{ margin: 0 }}
                />
              </Col>
              {whyChooseOfx.map((item, index) => (
                <Col key={index} xs={24} sm={12}>
                  <FeatureWithCheck
                    title={item.title}
                    text={item.text}
                    checkColor="#F97316"
                  />
                </Col>
              ))}
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <ApplicationSubHeading title="How OFX Works" />
              </Col>
              {steps.map((item, index) => (
                <Col key={index} sm={12} xl={8}>
                  <StepCard
                    id={item.id}
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.text}
                  />
                </Col>
              ))}
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
              <Col>
                <Button
                  type="primary"
                  size="large"
                  icon={<RightOutlined />}
                  iconPosition="end"
                >
                  Register
                </Button>
              </Col>
              <Col>
                <Button
                  size="large"
                  icon={<RightOutlined />}
                  iconPosition="end"
                >
                  Login
                </Button>
              </Col>
            </Row>
          </Col>
          <Col md={24} lg={9}>
            <img
              src={OfxImage}
              alt="OFX"
              style={{ width: '100%', padding: '0 3rem' }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default OfxPage;
