import { SelectCardDataType } from '@/types';
import { Card, Typography } from 'antd';
import { CSSProperties, FC } from 'react';

interface SelectCardProps {
  data: SelectCardDataType;
  style?: CSSProperties;
  className?: string;
  handleSelect: () => void;
}

const SelectCard: FC<SelectCardProps> = ({
  data,
  style,
  className,
  handleSelect,
}) => {
  return (
    <Card
      className={className}
      style={{ cursor: 'pointer', ...style }}
      onClick={handleSelect}
    >
      <img src={data.icon} alt={data.title}></img>
      <div style={{ minHeight: '50px' }}>
        <Typography.Title style={{ margin: '1rem 0 0.2rem' }} level={5}>
          {data.title}
        </Typography.Title>
        {data.subTitle && <Typography.Text>{data?.subTitle}</Typography.Text>}
      </div>
    </Card>
  );
};

export default SelectCard;
