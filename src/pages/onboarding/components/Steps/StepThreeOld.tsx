import { FC, useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

import { OnboardingFormProps } from '../../types';
import { PROPERTY_TYPE_LIST } from '../../constant';

import DetachedHouse from '@/assets/images/icons/detache.svg';
import LandBuild from '@/assets/images/icons/plot.svg';
import Apartment from '@/assets/images/icons/apartment.svg';

import { ErrorText, SelectCard } from '@/components/Elements';
import StepTitle from './StepTitle';

const iconsMap: Record<string, string> = {
  detachedHouse: DetachedHouse,
  landBuild: LandBuild,
  apartmentUnit: Apartment,
};

export type StepThreeFormType = { propertyType: string };

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

    handleFormSubmit({ propertyType: name });
  };

  useEffect(() => {
    if (savedData) {
      setActiveItem(savedData.propertyType);
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
        title="Choose Your Property Type"
        subTitle="Tell us about the property you want to finance."
        formTitle="3. What kind of property do you want to finance?"
      />
      <Row gutter={30}>
        {PROPERTY_TYPE_LIST.map((type, index) => {
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
