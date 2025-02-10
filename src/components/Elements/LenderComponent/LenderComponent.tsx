import React from 'react';
import { Card, Row, Col, Tag, Typography, Skeleton } from 'antd';
import styles from './LenderComponent.module.scss';

const { Title, Text } = Typography;

interface LenderProps {
  id: number;
  image_url: string;
  variable_rate: string;
  comparison_rate: string;
  tags: string[];
}

interface LenderComponentProps {
  data: LenderProps;
  isLenderDataLoading: boolean;
}

const LenderComponent: React.FC<LenderComponentProps> = ({
  data,
  isLenderDataLoading,
}) => {
  return (
    <Card className={styles.LenderComponent} bordered={true}>
      <div className={styles.companyLogoContainer}>
        {isLenderDataLoading ? (
          <Skeleton.Avatar
            active
            size={64}
            shape="square"
            className={styles.companyLogoSkeleton}
          />
        ) : (
          <img
            src={data.image_url}
            alt="Company Logo"
            className={styles.companyLogo}
          />
        )}
      </div>

      <Row gutter={16} justify="center" className={styles.rates}>
        <Col span={12}>
          <div
            style={{
              textAlign: 'center',
              borderRight: '1px solid #e0e0e0',
              paddingRight: '8px',
            }}
          >
            <div className={styles.rateDetail}>
              <Title level={3} style={{ margin: 0 }}>
                {isLenderDataLoading ? (
                  <Skeleton.Input active style={{ width: 100 }} />
                ) : (
                  data?.variable_rate
                )}
              </Title>
              {!isLenderDataLoading && (
                <Title level={4} style={{ margin: 0 }}>
                  p.a.*
                </Title>
              )}
            </div>
            <h2 className={styles.subHeadingText}>Variable rate</h2>
          </div>
        </Col>
        <Col span={12}>
          <div
            style={{
              textAlign: 'center',
              paddingLeft: '8px',
            }}
          >
            <div className={styles.rateDetail}>
              <Title level={3} style={{ margin: 0 }}>
                {isLenderDataLoading ? (
                  <Skeleton.Input active style={{ width: 100 }} />
                ) : (
                  data?.comparison_rate
                )}
              </Title>
              {!isLenderDataLoading && (
                <Title level={4} style={{ margin: 0 }}>
                  p.a.*
                </Title>
              )}
            </div>
            <h2 className={styles.subHeadingText}>Comparison rate</h2>
          </div>
        </Col>
      </Row>

      <Row gutter={[8, 8]} justify="center" className={styles.features}>
        {isLenderDataLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Col key={index}>
                <Skeleton.Button active size="small" shape="round" />
              </Col>
            ))
          : data.tags.map((tag, index) => (
              <Col key={index}>
                <Tag className={styles.customTag}>{tag}</Tag>
              </Col>
            ))}
      </Row>
    </Card>
  );
};

export default LenderComponent;
