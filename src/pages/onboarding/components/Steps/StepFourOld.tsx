import { FC, useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

import { OnboardingFormProps } from '../../types';
import { BORROWER_TYPE_LIST } from '../../constant';

import Sole from '@/assets/images/icons/man.svg';
import JointBorrower from '@/assets/images/icons/property-joint.svg';
import Trust from '@/assets/images/icons/trust.svg';
import NonTrading from '@/assets/images/icons/property-non-trading.svg';

import { ErrorText, SelectCard } from '@/components/Elements';
import StepTitle from './StepTitle';

const iconsMap: Record<string, string> = {
  sole: Sole,
  joinBorrower: JointBorrower,
  trustEntity: Trust,
  nonTrading: NonTrading,
};

export type StepFourFormType = { borrowerType: string };

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

    handleFormSubmit({ borrowerType: name });
  };

  useEffect(() => {
    if (savedData) {
      setActiveItem(savedData.borrowerType);
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
        title="Choose Your Borrower Type"
        subTitle="Select who will be applying for this mortgage."
        formTitle="4. Who will be applying for this mortgage?"
      />
      <Row gutter={30}>
        {BORROWER_TYPE_LIST.map((type, index) => {
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
