import { FC, useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

import { OnboardingFormProps } from '../../types';
import { EMPLOYMENT_SITUATION_LIST } from '../../constant';
import { ErrorText, SelectCard } from '@/components/Elements';

import Employee from '@/assets/images/icons/employee.svg';
import SelfEmployed from '@/assets/images/icons/business-man.svg';
import Unemployed from '@/assets/images/icons/variant.svg';
import StepTitle from './StepTitle';

const iconsMap: Record<string, string> = {
  employee: Employee,
  selfEmployed: SelfEmployed,
  unemployed: Unemployed,
};

export type StepFourFormType = { employmentStatus: string };

const StepFour: FC<OnboardingFormProps<StepFourFormType>> = ({
  handleFormSubmit,
  savedData,
  submitRef,
}) => {
  const [activeItem, setActiveItem] = useState<string | undefined>(undefined);
  const [showValidation, setShowValidation] = useState(false);
  const onSubmit = (name?: string) => {
    if (!name) {
      setShowValidation(true);
      return;
    }

    handleFormSubmit({ employmentStatus: name });
  };

  useEffect(() => {
    if (savedData) {
      setActiveItem(savedData.employmentStatus);
    }
  }, [savedData]);

  const handleMortgageSelect = (name: string) => {
    setActiveItem(name);
    setTimeout(() => {
      onSubmit(name);
    }, 100);
  };

  return (
    <>
      <StepTitle
        title="What's Your Employment Situation"
        subTitle="Choose the option that best describes your current employment."
        formTitle="4. What is your current employment status?"
      />
      <Row gutter={30}>
        {EMPLOYMENT_SITUATION_LIST.map((type, index) => {
          return (
            <Col xs={24} md={12} key={index}>
              <SelectCard
                className={activeItem === type.name ? 'card-active' : ''}
                handleSelect={() => handleMortgageSelect(type.name)}
                style={{ marginBottom: '1.6rem' }}
                data={{ ...type, icon: iconsMap[type.icon] }}
              />
            </Col>
          );
        })}
      </Row>
      <Paragraph>
        Please ensure you have answered all of the questions above before
        proceeding to the next page
      </Paragraph>
      {showValidation && (
        <ErrorText error=" Please select a property type before proceeding." />
      )}
      <Button
        style={{ display: 'none' }}
        ref={submitRef}
        onClick={() => onSubmit(activeItem)}
      >
        Form Submit
      </Button>
    </>
  );
};

export default StepFour;
