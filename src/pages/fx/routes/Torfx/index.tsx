import ApplicationHeading from '@/components/Elements/Heading/ApplicationHeading';
import ApplicationSubHeading from '@/components/Elements/Heading/ApplicationSubHeading';
import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import FeatureWithCheck from '../../components/FeatureWithCheck';
import { whyChooseTorfx } from './constants/whyChooseTorfx';
import { RightOutlined } from '@ant-design/icons';
import { steps } from './constants/steps';
import StepCard from '../../components/StepCard';
import TorfxImage from '@/assets/images/fx/Torfx_image.png';

const TorfxPage = () => {
  return (
    <div>
      <ApplicationHeading title="Award-winning currency transfers" />
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
              {whyChooseTorfx.map((item, index) => (
                <Col key={index} xs={24} sm={12}>
                  <FeatureWithCheck
                    title={item.title}
                    text={item.text}
                    checkColor="#F43F5E"
                  />
                </Col>
              ))}
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <ApplicationSubHeading title="How TorFX Works" />
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
              src={TorfxImage}
              alt="OFX"
              style={{ width: '100%', padding: '0 3rem' }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TorfxPage;
