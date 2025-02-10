import { FC, useEffect, useState } from 'react';
import { Button, Col, Row, Space, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

import { OnboardingFormProps } from '../../types';
import { CITIZENSHIP_STATUS_LIST } from '../../constant';
import { ErrorText, SelectCard } from '@/components/Elements';

import Australia from '@/assets/images/icons/pr-visa.svg';
import AustraliaPR from '@/assets/images/icons/australia.svg';
import ForeignNational from '@/assets/images/icons/foreign-national.svg';
import StepTitle from './StepTitle';

const iconsMap: Record<string, string> = {
  australia: Australia,
  australiaPR: AustraliaPR,
  foreignNational: ForeignNational,
};

export type StepThreeFormType = { citizenshipStatus: string };

const StepThree: FC<OnboardingFormProps<StepThreeFormType>> = ({
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

    handleFormSubmit({ citizenshipStatus: name });
  };

  useEffect(() => {
    if (savedData) {
      setActiveItem(savedData.citizenshipStatus);
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
        title="Select Your Citizenship Status"
        subTitle="This helps us determine your eligibility for various loan options."
        formTitle="3. What is your citizenship status?"
      />
      <Row gutter={30}>
        {CITIZENSHIP_STATUS_LIST.map((type, index) => {
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

export default StepThree;
