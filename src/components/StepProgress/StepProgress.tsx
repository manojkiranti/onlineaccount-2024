import React from 'react';
import styles from './StepProgress.module.scss';
import { useNavigate } from 'react-router-dom';

interface StepProgressProps {
  completedStep: number;
  totalSteps: number;
  formId?: string;
  stepData: { id: number; step: string; link: string }[];
  id: string;
}

const StepProgress: React.FC<StepProgressProps> = ({
  completedStep,
  stepData,
  formId,
  id,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.stepProgress}>
      {stepData.map((step, index) => {
        const isActive = index <= completedStep;
        const isCompleted = index + 1 <= completedStep;

        return (
          <div
            key={step.id}
            onClick={() => {
              if (index < completedStep) {
                navigate(step.link + `/${id}`);
              }
            }}
            style={{ cursor: index < completedStep ? 'pointer' : 'default' }}
            className={`${styles['step-item']} ${isActive ? styles['step-item-active'] : ''} ${isCompleted ? styles['step-item-completed'] : ''}`}
          >
            <div className={styles['step-item__text']}>{step.step}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;
