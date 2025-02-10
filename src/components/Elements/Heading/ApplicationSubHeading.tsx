import { Typography } from 'antd';
import React from 'react';

interface ApplicationSubHeading {
  title: string;
  style?: React.CSSProperties;
}

const ApplicationSubHeading: React.FC<ApplicationSubHeading> = ({
  title,
  style = {},
}) => {
  return (
    <Typography.Title level={4} style={style}>
      {title}
    </Typography.Title>
  );
};

export default ApplicationSubHeading;
