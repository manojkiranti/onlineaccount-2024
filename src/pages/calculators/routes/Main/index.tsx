import { MainLayout } from '@/components/Layout';
import styles from './Main.module.scss';
import { CALCULATOR_OPTIONS } from '@/constant/calculatorOptions';
import CalculatorCard from '@/components/Calculator/CalculatorCard';
import { Col, Row } from 'antd';

export const CalculatorsPage = () => {
  return (
    <Row gutter={[16, 16]}>
      {CALCULATOR_OPTIONS.map((item) => (
        <Col key={item.id} xs={24} md={12} lg={8}>
          <CalculatorCard item={item} />
        </Col>
      ))}
    </Row>
  );
};

export default CalculatorsPage;
