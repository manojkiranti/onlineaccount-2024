import { Row, Col } from 'antd';
import { InputField, SelectField } from '@/components/Form';
import { MONTHS, YEARS } from '@/constant/options';
import { currencies } from '@/utils/currenciesUtils';

interface ContractorFieldProps {
  control: any;
  errors: any;
  watchSalaryCurrency: string | undefined;
  watchAllowanceIncome: boolean | undefined;
  watchCommissionIncome: boolean | undefined;
  watchAnnualCashBonus: boolean | undefined;
  watchStockUnit: boolean | undefined;
}

export const ContractorField: React.FC<ContractorFieldProps> = ({
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
            name="operationStartMonth"
            control={control}
            size="large"
            label="Started Month"
            placeholder="Select operation start month"
            error={errors?.operationStartMonth?.message ?? ''}
          />
        </Col>
        <Col xs={24} md={12}>
          <SelectField
            options={YEARS}
            name="operationStartYear"
            control={control}
            size="large"
            label="Started Year"
            placeholder="Select operation start year"
            error={errors?.operationStartYear?.message ?? ''}
          />
        </Col>
        <Col xs={24} md={12}>
          <InputField
            label="Enter your industry?"
            name="industry"
            control={control}
            error={errors?.industry?.message ?? ''}
            placeholder="Enter your industry"
            size="large"
          />
        </Col>
        <Col xs={24} md={12}>
          <SelectField
            options={currencies}
            name="companySalaryCurrency"
            control={control}
            size="large"
            label="Salary Currency"
            placeholder="Select your salary currency"
            error={errors?.companySalaryCurrency?.message ?? ''}
          />
        </Col>
        <Col xs={24} md={12}>
          <InputField
            label="This year net income after taxes"
            name="thisYearPersonalNetIncomeAfterTaxes"
            control={control}
            error={errors?.thisYearPersonalNetIncomeAfterTaxes?.message ?? ''}
            placeholder="Eg: 1000"
            size="large"
            type="number"
            prefix={watchSalaryCurrency}
          />
        </Col>
        <Col xs={24} md={12}>
          <InputField
            label="Last year net income after taxes"
            name="lastYearPersonalNetIncomeAfterTaxes"
            control={control}
            error={errors?.lastYearPersonalNetIncomeAfterTaxes?.message ?? ''}
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
