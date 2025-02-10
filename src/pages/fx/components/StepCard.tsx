import React from 'react';
import { Card } from 'antd';

interface StepCardProps {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  id,
}) => {
  return (
    <Card
      bordered
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        color: '#1E293B',
      }}
    >
      <div>
        <div
          style={{
            marginBottom: 16,
            backgroundColor: '#F8FAFC',
            padding: '6px',
            width: 'fit-content',
            borderRadius: '8px',
          }}
        >
          <img
            src={icon}
            alt={title}
            style={{
              width: '36px',
              height: '36px',
            }}
          />
        </div>
        <h3
          style={{
            fontWeight: '500',
            fontSize: '1rem',
          }}
        >
          <span>{id}. </span> {title}
        </h3>
        <p>{description}</p>
      </div>
    </Card>
  );
};

export default StepCard;
