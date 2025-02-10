import React from 'react';
import { Card, Collapse, Typography } from 'antd';
import styles from './TipsComponent.module.scss';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const TipsComponent = ({
  data,
  citizenship = 'australian_citizen',
  employment = 'employee',
}: {
  data: any;
  citizenship: string;
  employment: string;
}) => {
  return (
    <Card key={data.id} className={styles.tipsContainer}>
      {data.variable && data.name === 'citizenship' ? (
        <div className={styles.tipsContent}>
          <div className={styles.tipsTitle}>
            <span className={styles.tipsNumber}>{data.number}</span>
            <Title level={4} style={{ margin: '0rem', color: '#003862' }}>
              {data.option?.[citizenship]?.title}
            </Title>
          </div>
          <Paragraph>{data.option?.[citizenship]?.content}</Paragraph>
        </div>
      ) : data.variable && data.name === 'employment' ? (
        <div className={styles.tipsContent}>
          <div className={styles.tipsTitle}>
            <span className={styles.tipsNumber}>{data.number}</span>
            <Title level={4} style={{ margin: '0rem', color: '#003862' }}>
              {data.option?.[employment]?.title}
            </Title>
          </div>
          <Paragraph>{data.option?.[employment]?.content}</Paragraph>
        </div>
      ) : (
        <div className={styles.tipsContent}>
          <div className={styles.tipsTitle}>
            <span className={styles.tipsNumber}>{data.number}</span>
            <Title level={4} style={{ margin: '0rem', color: '#003862' }}>
              {data.title}
            </Title>
          </div>
          <Paragraph>{data.content}</Paragraph>
        </div>
      )}
    </Card>
  );
};

export default TipsComponent;
