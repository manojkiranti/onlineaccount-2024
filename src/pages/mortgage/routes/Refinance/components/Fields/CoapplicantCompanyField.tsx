import { Row, Col } from 'antd';
import { InputField, SelectField } from '@/components/Form';
import { MONTHS, YEARS } from '@/constant/options';
import { currencies } from '@/utils/currenciesUtils';

interface CoapplicantCompanyFieldProps {
  control: any;
  errors: any;
  watchSalaryCurrency: string | undefined;
  watchAllowanceIncome: boolean | undefined;
  watchCommissionIncome: boolean | undefined;
  watchAnnualCashBonus: boolean | undefined;
  watchStockUnit: boolean | undefined;
}

export const CoapplicantCompanyField: React.FC<
  CoapplicantCompanyFieldProps
> = ({
  control,
  errors,
  watchSalaryCurrency,
  watchAllowanceIncome,
  watchCommissionIncome,
  watchAnnualCashBonus,
  watchStockUnit,
}) => {
  return (
    <Col xl={24}>
      <Row gutter={30}>
        <Col xs={24} md={12}>
          <SelectField
            options={MONTHS}
            name="coapplicantOperationStartMonth"
            control={control}
            size="large"
            label="Started Month"
            placeholder="Select job start month"
            error={errors?.coapplicantOperationStartMonth?.message ?? ''}
          />
        </Col>
        <Col xs={24} md={12}>
          <SelectField
            options={YEARS}
            name="coapplicantOperationStartYear"
            control={control}
            size="large"
            label="Started Year"
            placeholder="Select job start year"
            error={errors?.coapplicantOperationStartYear?.message ?? ''}
          />
        </Col>
        <Col xs={24} md={12}>
          <InputField
            label="Enter your industry?"
            name="coapplicantIndustry"
            control={control}
            error={errors?.coapplicantIndustry?.message ?? ''}
            placeholder="Enter your industry"
            size="large"
          />
        </Col>
        <Col xs={24} md={12}>
          <SelectField
            options={currencies}
            name="coapplicantCompanySalaryCurrency"
            control={control}
            size="large"
            label="Salary Currency"
            placeholder="Select your salary currency"
            error={errors?.coapplicantCompanySalaryCurrency?.message ?? ''}
          />
        </Col>
        <Col xs={24} md={12}>
          <InputField
            label="This year net income after taxes"
            name="coapplicantThisYearPersonalNetIncomeAfterTaxes"
            control={control}
            error={
              errors?.coapplicantThisYearPersonalNetIncomeAfterTaxes?.message ??
              ''
            }
            placeholder="Eg: 1000"
            size="large"
            type="number"
            prefix={watchSalaryCurrency}
          />
        </Col>
        <Col xs={24} md={12}>
          <InputField
            label="Last year net income after taxes"
            name="coapplicantLastYearPersonalNetIncomeAfterTaxes"
            control={control}
            error={
              errors?.coapplicantLastYearPersonalNetIncomeAfterTaxes?.message ??
              ''
            }
            placeholder="Eg: 1000"
            size="large"
            type="number"
            prefix={watchSalaryCurrency}
          />
        </Col>
        <Col xs={24}>
          <InputField
            label="Please advise your ownership percentage of the company?"
            name="coapplicantOwnershipPercentage"
            control={control}
            error={errors?.coapplicantOwnershipPercentage?.message ?? ''}
            placeholder="Eg: 100"
            size="large"
            type="number"
          />
        </Col>
        <Col xs={24} md={12}>
          <InputField
            label="This year Company net income after taxes"
            name="coapplicantThisYearCompanyNetIncomeAfterTaxes"
            control={control}
            error={
              errors?.coapplicantThisYearCompanyNetIncomeAfterTaxes?.message ??
              ''
            }
            placeholder="Eg: 1000"
            size="large"
            type="number"
            prefix={watchSalaryCurrency}
          />
        </Col>
        <Col xs={24} md={12}>
          <InputField
            label="Last year Company net income after taxes"
            name="coapplicantLastYearCompanyNetIncomeAfterTaxes"
            control={control}
            error={
              errors?.coapplicantLastYearCompanyNetIncomeAfterTaxes?.message ??
              ''
            }
            placeholder="Eg: 1000"
            size="large"
            type="number"
            prefix={watchSalaryCurrency}
          />
        </Col>
      </Row>
    </Col>
  );
};
