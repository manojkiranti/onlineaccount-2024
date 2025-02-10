import { CalculatorOption } from '@/constant/calculatorOptions';
import { RightOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import styles from './CalculatorCard.module.scss';
import { getIconsUrl } from '@/utils/iconsUtils';

const CalculatorCard = ({ item }: { item: CalculatorOption }) => {
  const handleCardClick = () => {
    if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  return (
    <div className={styles.calculatorCard} onClick={handleCardClick}>
      <div>
        <div className={styles.iconContainer}>
          <img
            src={getIconsUrl(item?.icon_link)}
            className={styles.icon}
            alt={item.name}
          />
        </div>
        <Typography.Title level={5}>{item.name}</Typography.Title>
        <Typography.Paragraph>{item.description}</Typography.Paragraph>
      </div>
      <div className={styles.linkContainer}>
        <Typography.Link>Calculate Now</Typography.Link>
        <RightOutlined />
      </div>
    </div>
  );
};

export default CalculatorCard;
