import { Typography } from 'antd';
import { FC } from 'react';

interface FormFieldHeadingProps {
  total?: number;
  current?: number;
  title: string;
  subTitle?: string;
  topbarTitle?: string;
}

const FormFieldHeading: FC<FormFieldHeadingProps> = ({
  total,
  current,
  title,
  subTitle,
  topbarTitle,
}) => {
  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {current && (
          <Typography.Paragraph style={{ fontSize: '1rem' }}>
            Question {current} of {total}
          </Typography.Paragraph>
        )}
        {topbarTitle && (
          <Typography.Paragraph style={{ fontSize: '1rem' }}>
            {topbarTitle}
          </Typography.Paragraph>
        )}

        <Typography.Title
          style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}
          level={2}
        >
          {title}
        </Typography.Title>
        {subTitle && <Typography.Paragraph>{subTitle}</Typography.Paragraph>}
      </div>
    </>
  );
};

export default FormFieldHeading;
