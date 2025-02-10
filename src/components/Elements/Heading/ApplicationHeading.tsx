import { Typography } from 'antd';
import React from 'react';

interface ApplicationHeadingProps {
  title: string;
  style?: React.CSSProperties;
}

const ApplicationHeading: React.FC<ApplicationHeadingProps> = ({
  title,
  style = {},
}) => {
  return (
    <Typography.Title level={3} style={style}>
      {title}
    </Typography.Title>
  );
};

export default ApplicationHeading;
