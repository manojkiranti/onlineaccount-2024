import { FC } from 'react';
import { Button, Col, Flex, Row } from 'antd';

interface StepperFormLayoutProps {
  children: React.ReactNode;
  handleSubmit: () => void;
  handleBackClick?: () => void;
  showBackButton: boolean;
  nextBtnText?: string;
  isSubmitLoading?: boolean;
}
const StepperFormLayout: FC<StepperFormLayoutProps> = ({
  children,
  handleSubmit,
  showBackButton,
  handleBackClick,
  nextBtnText = 'Submit assessment form',
  isSubmitLoading,
}) => {
  return (
    <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
      {/* <div className="form-steps">steps</div> */}
      <div className="form-body" style={{ paddingBottom: '3.5rem' }}>
        {children}
      </div>
      <div className="stepper-form-footer">
        <Row>
          <Col xl={24}>
            <Flex
              justify={!showBackButton ? 'flex-end' : 'space-between'}
              gap={30}
            >
              {showBackButton && (
                <Button
                  size="large"
                  onClick={handleBackClick}
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    padding: '14px 24px',
                  }}
                >
                  Back
                </Button>
              )}
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                loading={isSubmitLoading}
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '14px 24px',
                }}
              >
                {nextBtnText}
              </Button>
            </Flex>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StepperFormLayout;
