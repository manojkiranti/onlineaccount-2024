import { CalculatorOption } from '@/constant/calculatorOptions';
import { RightOutlined } from '@ant-design/icons';
import styles from './SmallCalculator.module.scss';
import { Typography } from 'antd';
import { getIconsUrl } from '@/utils/iconsUtils';

const SmallCalculatorCard = ({ item }: { item: CalculatorOption }) => {
  const handleCardClick = () => {
    if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  return (
    <div className={styles.smallCalculatorCard} onClick={handleCardClick}>
      <div className={styles.smallCalculatorCardContent}>
        <div className={styles.iconContainer}>
          <img
            className={styles.icon}
            src={getIconsUrl(item?.icon_link)}
            alt={item.name}
          />
        </div>
        <Typography.Paragraph className={styles.title}>
          {item.name}
        </Typography.Paragraph>
      </div>
      <RightOutlined />
    </div>
  );
};

export default SmallCalculatorCard;
