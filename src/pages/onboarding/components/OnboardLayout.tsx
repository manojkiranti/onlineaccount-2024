import { FC, ReactNode } from 'react';
import { Button, Col, Flex, Progress, Row, theme } from 'antd';
import { Container } from '@/components/Elements';
import { Head } from '@/components/Head';
import OnboardHeader from './OnboardHeader';

import styles from '../styles/layout.module.scss';

const { useToken } = theme;

interface OnboardLayoutProps {
  children: ReactNode;
  title: string;
  imgSrc: string;
  step: number;
  handleNextClick: () => void;
  handleBackClick: () => void;
  isLoading: boolean;
}

const TOTAL_STEPS = 5;

const buttonTitles = [
  'Continue to Mortgage Goal',
  'Continue',
  'Continue',
  'Continue',
  'Finish Up & Get Results',
  'Finish Up & Get Results',
];

const OnboardLayout: FC<OnboardLayoutProps> = ({
  children,
  title,
  imgSrc,
  step,
  handleNextClick,
  handleBackClick,
  isLoading,
}) => {
  const { token } = useToken();

  const completed =
    (Math.min(Math.max(step, 1), TOTAL_STEPS) / TOTAL_STEPS) * 100;
  const btnTitle = buttonTitles[step - 1] || 'Next';

  return (
    <div className={styles.onboardContainer}>
      <Head title={title} />
      <OnboardHeader />
      <div style={{ padding: '1rem 0' }}>
        <Container>
          <Row align="middle" gutter={30}>
            <Col xs={24} md={12}>
              {children}
            </Col>
            <Col xs={24} md={12}>
              <Flex justify="flex-end">
                <div className="asideImage">
                  <img src={imgSrc} alt="" style={{ maxWidth: '100%' }} />
                </div>
              </Flex>
            </Col>
          </Row>
        </Container>
      </div>
      <footer className={styles.onboardFooter}>
        <Progress
          className={styles.footerStroke}
          strokeLinecap="butt"
          strokeColor={token.colorPrimary}
          percent={completed}
          showInfo={false}
        />
        <Container>
          <Row>
            <Col xl={24}>
              <Flex
                justify={step === 1 ? 'flex-end' : 'space-between'}
                gap={30}
              >
                {step !== 1 && (
                  <Button size="large" onClick={handleBackClick}>
                    Back
                  </Button>
                )}
                <Button
                  type="primary"
                  size="large"
                  onClick={handleNextClick}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {btnTitle}
                </Button>
              </Flex>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default OnboardLayout;
