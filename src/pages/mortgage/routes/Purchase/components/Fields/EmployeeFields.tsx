import { Row, Col } from 'antd';
import { InputField, SelectField, ListOptionsField } from '@/components/Form';
import {
  AGREE_OPTIONS,
  FREQUENCY_OPTIONS,
  MONTHS,
  YEARS,
} from '@/constant/options';
import { currencies } from '@/utils/currenciesUtils';
import { Control } from 'react-hook-form';
import {
  ALLOWANCES_TYPES_OPTIONS,
  COMMISSION_YEARS,
} from '../../constant/optionList';

interface EmployeeFieldsProps {
  control: Control<any>;
  errors: any;
  watchSalaryCurrency: string | undefined;
  watchAllowanceIncome: boolean | undefined;
  watchCommissionIncome: boolean | undefined;
  watchAnnualCashBonus: boolean | undefined;
  watchStockUnit: boolean | undefined;
}

export const EmployeeFields: React.FC<EmployeeFieldsProps> = ({
  control,
  errors,
  watchSalaryCurrency,
  watchAllowanceIncome,
  watchCommissionIncome,
  watchAnnualCashBonus,
  watchStockUnit,
}) => (
  <Col xl={24}>
    <Row gutter={30}>
      <Col xs={24} md={12}>
        <SelectField
          options={MONTHS}
          name="jobStartMonth"
          control={control}
          size="large"
          label="Started Month"
          placeholder="Select job start month"
          showSearch={true}
          error={errors?.jobStartMonth?.message ?? ''}
        />
      </Col>
      <Col xs={24} md={12}>
        <SelectField
          options={YEARS}
          name="jobStartYear"
          control={control}
          size="large"
          label="Started Year"
          placeholder="Select job start year"
          showSearch={true}
          error={errors?.jobStartYear?.message ?? ''}
        />
      </Col>
      <Col xs={24} md={12}>
        <InputField
          label="What's your Occupation"
          name="occupation"
          control={control}
          error={errors?.occupation?.message ?? ''}
          placeholder="Eg: Doctor"
          size="large"
        />
      </Col>
      <Col xs={24} md={12}>
        <SelectField
          options={currencies}
          name="salaryCurrency"
          control={control}
          size="large"
          label="Salary Currency"
          placeholder="Select your salary currency"
          error={errors?.salaryCurrency?.message ?? ''}
        />
      </Col>
      <Col xs={24} md={12}>
        <InputField
          label="Base Salary"
          name="baseSalary"
          control={control}
          error={errors?.baseSalary?.message ?? ''}
          placeholder="$ 54000"
          size="large"
          type="number"
          prefix={watchSalaryCurrency ?? ''}
        />
      </Col>
      <Col xs={24} md={12}>
        <SelectField
          label="Salary Frequency"
          name="salaryFrequency"
          placeholder="Select frequency"
          control={control}
          error={errors?.salaryFrequency?.message ?? ''}
          size="large"
          showSearch={true}
          options={FREQUENCY_OPTIONS}
        />
      </Col>
      <Col xs={24}>
        <ListOptionsField
          name="receiveAllowanceIncome"
          options={AGREE_OPTIONS}
          label="Do you receive allowance income?"
          error={errors?.receiveAllowanceIncome?.message ?? ''}
          control={control}
          cols={2}
        />
      </Col>
      {watchAllowanceIncome && (
        <>
          <Col xs={24} md={12}>
            <InputField
              label="Allowance Income"
              name="allowanceIncome"
              control={control}
              placeholder="$ 54000"
              size="large"
              type="number"
              prefix={watchSalaryCurrency ?? ''}
              error={errors?.allowanceIncome?.message ?? ''}
            />
          </Col>
          <Col xs={24} md={12}>
            <SelectField
              label="Allowance Frequency"
              name="allowanceFrequency"
              placeholder="Select frequency"
              control={control}
              error={errors?.allowanceFrequency?.message ?? ''}
              size="large"
              showSearch={true}
              options={FREQUENCY_OPTIONS}
            />
          </Col>
          <Col xs={24}>
            <ListOptionsField
              name="typeOfAllowanceIncome"
              options={ALLOWANCES_TYPES_OPTIONS}
              label="Type of allowance?"
              error={errors?.typeOfAllowanceIncome?.message ?? ''}
              control={control}
              cols={2}
              multiple={true}
            />
          </Col>
        </>
      )}
      <Col xs={24}>
        <ListOptionsField
          name="receiveCommissionIncome"
          options={AGREE_OPTIONS}
          label="Do you receive commission income?"
          error={errors?.receiveCommissionIncome?.message ?? ''}
          control={control}
          cols={2}
        />
      </Col>
      {watchCommissionIncome && (
        <>
          <Col xs={24} md={12}>
            <InputField
              label="What is your commission Income?"
              name="commissionIncome"
              control={control}
              placeholder="$ 54000"
              size="large"
              type="number"
              prefix={watchSalaryCurrency ?? ''}
              error={errors?.commissionIncome?.message ?? ''}
            />
          </Col>
          <Col xs={24} md={12}>
            <SelectField
              label="Commission Frequency"
              placeholder="Select frequency"
              name="commissionFrequency"
              control={control}
              error={errors?.commissionFrequency?.message ?? ''}
              size="large"
              showSearch={true}
              options={FREQUENCY_OPTIONS}
            />
          </Col>
          <Col xs={24}>
            <SelectField
              name="commissionYears"
              options={COMMISSION_YEARS}
              control={control}
              size="large"
              label="How long have you been receiving this commission?"
              placeholder="Select years"
              error={errors?.commissionYears?.message ?? ''}
            />
          </Col>
        </>
      )}
      <Col xs={24}>
        <ListOptionsField
          name="receiveAnnualCashBonus"
          options={AGREE_OPTIONS}
          label="Do you receive Annual Cash Bonus?"
          error={errors?.receiveAnnualCashBonus?.message ?? ''}
          control={control}
          cols={2}
        />
      </Col>
      {watchAnnualCashBonus && (
        <>
          <Col xs={24} md={12}>
            <InputField
              label="This Year Cash Bonus"
              name="thisYearAnnualCashBonus"
              control={control}
              placeholder="$ 54000"
              size="large"
              type="number"
              prefix={watchSalaryCurrency ?? ''}
              error={errors?.thisYearAnnualCashBonus?.message ?? ''}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputField
              label="Last Year Cash Bonus"
              name="lastYearAnnualCashBonus"
              control={control}
              placeholder="$ 54000"
              size="large"
              type="number"
              prefix={watchSalaryCurrency ?? ''}
              error={errors?.lastYearAnnualCashBonus?.message ?? ''}
            />
          </Col>
        </>
      )}
      <Col xs={24}>
        <ListOptionsField
          name="receiveStockUnit"
          options={AGREE_OPTIONS}
          label="Do you receive stock options/restricted stock units?"
          error={errors?.receiveStockUnit?.message ?? ''}
          control={control}
          cols={2}
        />
      </Col>
      {watchStockUnit && (
        <>
          <Col xs={24} md={12}>
            <InputField
              label="This Year Stock Options"
              name="thisYearStockOptions"
              control={control}
              placeholder="$ 54000"
              size="large"
              type="number"
              prefix={watchSalaryCurrency ?? ''}
              error={errors?.thisYearStockOptions?.message ?? ''}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputField
              label="Last Year Stock Options"
              name="lastYearStockOptions"
              control={control}
              placeholder="$ 54000"
              size="large"
              type="number"
              prefix={watchSalaryCurrency ?? ''}
              error={errors?.lastYearStockOptions?.message ?? ''}
            />
          </Col>
        </>
      )}
    </Row>
  </Col>
);
