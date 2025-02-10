import { useRef, useState } from 'react';

import OnboardLayout from '../components/OnboardLayout';

import StepOne, { StepOneFormType } from '../components/Steps/StepOne';
import StepTwo from '../components/Steps/StepTwo';
import StepThree from '../components/Steps/StepThree';
import StepFour from '../components/Steps/StepFour';
import StepFive from '../components/Steps/StepFive';

import { OnboardingFormType, RegisterEmail } from '../types';

// static images
import Map from '@/assets/images/onboarding/map.svg';
import Key from '@/assets/images/onboarding/key.svg';
import Property from '@/assets/images/onboarding/property.svg';
import PenPaper from '@/assets/images/onboarding/pen-paper.svg';
import Visa from '@/assets/images/onboarding/visa.svg';
import Employment from '@/assets/images/onboarding/people.svg';
import { useNavigate } from 'react-router-dom';
import { usePostLeadDataMutation } from '../api/onboardAPI';
import { displayError } from '@/utils/displayMessageUtils';

const images = [Map, Key, Property, PenPaper, Visa, Employment];

const stepComponents = [StepOne, StepTwo, StepThree, StepFour, StepFive];

const CustomerRegister = () => {
  const navigate = useNavigate();
  const submitRefs = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [formData, setFormData] = useState<(any | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [postLead, { isLoading: postLeadLoading }] = usePostLeadDataMutation();

  const handleNextClick = () => {
    const submitRef = submitRefs[currentStep - 1];
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleFormSubmit = async (data: any) => {
    console.log(data);
    console.log(formData);
    const proceedToNextStep = () => {
      // Update the form data for the current step
      setFormData((prevData) => {
        const newData = [...prevData];
        newData[currentStep - 1] = data;
        return newData;
      });

      // Move to next step
      if (currentStep < stepComponents.length) {
        setCurrentStep(currentStep + 1);
      }
    };

    if (currentStep === 1) {
      try {
        const res = await postLead({
          step: 'step_one',
          data: data as StepOneFormType,
          ...(applicationId && { application_id: applicationId }),
        }).unwrap();
        setApplicationId(res.data?.application_id as string);
        proceedToNextStep();
      } catch (err) {
        displayError(err);
      }
    } else if (currentStep === stepComponents.length) {
      const payload = {
        email: data.email,
        mortgage_type: formData[1].typeOfMortgage,
        citizenship: formData[2].citizenshipStatus,
        employment: formData[3].employmentStatus,
      };

      try {
        const res = await postLead({
          step: 'step_six',
          data: payload as RegisterEmail,
          application_id: applicationId as string,
        }).unwrap();
        setApplicationId(res.data?.application_id as string);
        navigate('/thank-you');
      } catch (err) {
        displayError(err);
      }
    } else {
      proceedToNextStep();
    }
  };

  const renderStep = () => {
    const StepComponent = stepComponents[currentStep - 1];
    return (
      <StepComponent
        submitRef={submitRefs[currentStep - 1]}
        handleFormSubmit={handleFormSubmit}
        savedData={formData[currentStep - 1] as any}
      />
    );
  };

  return (
    <OnboardLayout
      title="Onboarding Page"
      imgSrc={images[currentStep - 1]}
      step={currentStep}
      handleNextClick={handleNextClick}
      handleBackClick={handleBackClick}
      isLoading={postLeadLoading}
    >
      {renderStep()}
    </OnboardLayout>
  );
};

export default CustomerRegister;
