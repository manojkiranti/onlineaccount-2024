import { Space, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { FC } from 'react';

interface StepTitleProps {
  title: string;
  subTitle?: string;
  formTitle?: string;
}

const StepTitle: FC<StepTitleProps> = ({ title, subTitle, formTitle }) => {
  return (
    <>
      <Space direction="vertical" style={{ marginBottom: '1rem' }}>
        <Typography.Title level={2}>{title}</Typography.Title>
        {subTitle && (
          <Paragraph style={{ fontSize: '1rem' }}>{subTitle}</Paragraph>
        )}
      </Space>
      {formTitle && (
        <Typography.Title style={{ marginBottom: '1.6rem' }} level={4}>
          {formTitle}
        </Typography.Title>
      )}
    </>
  );
};
export default StepTitle;
