import React from 'react';
import { CALCULATOR_OPTIONS } from '@/constant/calculatorOptions';
import SmallCalculatorCard from './SmallCalculatorCard';
import styles from './Calculator.module.scss';
import { Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Scrollbars } from 'rc-scrollbars';

const NUMBER_OF_CALCULATORS = 10;

const CalculatorListComponent = () => {
  return (
    <div className={styles.calculatorListContainer}>
      <Scrollbars
        autoHide
        style={{ width: '100%', height: '600px' }}
        className={styles.calculatorContainer}
      >
        {CALCULATOR_OPTIONS.slice(0, NUMBER_OF_CALCULATORS).map((option) => {
          return (
            <div
              key={option.id}
              style={{
                padding: '0.8rem 1rem',
              }}
            >
              <SmallCalculatorCard key={option.id} item={option} />
            </div>
          );
        })}
      </Scrollbars>
      <div className={styles.linkContainer}>
        <Typography.Link href="/calculators" className={styles.link}>
          See All Calculator
        </Typography.Link>
        <RightOutlined />
      </div>
    </div>
  );
};

export default CalculatorListComponent;
