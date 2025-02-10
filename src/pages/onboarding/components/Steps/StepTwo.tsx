import { FC, useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

import { OnboardingFormProps } from '../../types';
import { MORTGAGE_TYPE_LIST } from '../../constant';

import HomeSearch from '@/assets/images/icons/home-search.svg';
import HomeKey from '@/assets/images/icons/home-key.svg';
import Refinance from '@/assets/images/icons/refinance.svg';
import Cashout from '@/assets/images/icons/cashout.svg';
import { ErrorText, SelectCard } from '@/components/Elements';
import StepTitle from './StepTitle';

const iconsMap: Record<string, string> = {
  homeSearch: HomeSearch,
  homeKey: HomeKey,
  refinance: Refinance,
  cashout: Cashout,
};

export type StepTwoFormType = { typeOfMortgage: string };

const StepTwo: FC<OnboardingFormProps<StepTwoFormType>> = ({
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

    handleFormSubmit({ typeOfMortgage: name });
  };

  useEffect(() => {
    if (savedData) {
      setActiveItem(savedData.typeOfMortgage);
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
        title="Select Your Mortgage Goal"
        subTitle="Choose the mortgage purpose that aligns with your current needs."
        formTitle="2. What type of mortgage are you looking for?"
      />

      <Row gutter={30}>
        {MORTGAGE_TYPE_LIST.map((type, index) => {
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
        <ErrorText error=" Please select a mortgage type before proceeding." />
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

export default StepTwo;
