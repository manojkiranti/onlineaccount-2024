import React from 'react';
import Check from '@/assets/images/fx/check.svg';
import styles from '../styles/FeatureWithCheck.module.scss';

interface FeatureWithCheckProps {
  title: string;
  text: string;
  checkColor?: string;
}

const FeatureWithCheck: React.FC<FeatureWithCheckProps> = ({
  title,
  text,
  checkColor = 'green',
}) => {
  return (
    <div className={styles.featureContainer}>
      <div
        className={styles.checkWrapper}
        style={{ backgroundColor: checkColor }}
      >
        <img src={Check} alt="check" />
      </div>
      <p className={styles.textContainer}>
        <span className={styles.title}>{title}:</span> <span>{text}</span>
      </p>
    </div>
  );
};

export default FeatureWithCheck;
