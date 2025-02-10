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
import { ALLOWANCES_TYPES_OPTIONS } from '../../constant/optionList';

interface CoapplicantEmployeeFieldsProps {
  control: Control<any>;
  errors: any;
  watchSalaryCurrency: string | undefined;
  watchAllowanceIncome: boolean | undefined;
  watchCommissionIncome: boolean | undefined;
  watchAnnualCashBonus: boolean | undefined;
  watchStockUnit: boolean | undefined;
}

export const CoapplicantEmployeeField: React.FC<
  CoapplicantEmployeeFieldsProps
> = ({
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
          name="coapplicantJobStartMonth"
          control={control}
          size="large"
          label="Started Month"
          placeholder="Select job start month"
          error={errors?.coapplicantJobStartMonth?.message ?? ''}
        />
      </Col>
      <Col xs={24} md={12}>
        <SelectField
          options={YEARS}
          name="coapplicantJobStartYear"
          control={control}
          size="large"
          label="Started Year"
          placeholder="Select job start year"
          error={errors?.coapplicantJobStartYear?.message ?? ''}
        />
      </Col>
      <Col xs={24} md={12}>
        <InputField
          label="What's your Occupation"
          name="coapplicantOccupation"
          control={control}
          error={errors?.coapplicantOccupation?.message ?? ''}
          placeholder="Eg: Doctor"
          size="large"
        />
      </Col>
      <Col xs={24} md={12}>
        <SelectField
          options={currencies}
          name="coapplicantSalaryCurrency"
          control={control}
          size="large"
          label="Salary Currency"
          placeholder="Select your salary currency"
          error={errors?.coapplicantSalaryCurrency?.message ?? ''}
        />
      </Col>
      <Col xs={24} md={12}>
        <InputField
          label="Base Salary"
          name="coapplicantBaseSalary"
          control={control}
          error={errors?.coapplicantBaseSalary?.message ?? ''}
          placeholder="$ 54000"
          size="large"
          type="number"
          prefix={watchSalaryCurrency ?? ''}
        />
      </Col>
      <Col xs={24} md={12}>
        <SelectField
          label="Salary Frequency"
          name="coapplicantBaseSalaryFrequency"
          placeholder="Select your salary frequency"
          control={control}
          error={errors?.coapplicantBaseSalaryFrequency?.message ?? ''}
          size="large"
          options={FREQUENCY_OPTIONS}
        />
      </Col>
      <Col xs={24}>
        <ListOptionsField
          name="coapplicantReceiveAllowanceIncome"
          options={AGREE_OPTIONS}
          label="Do you receive allowance income?"
          error={errors?.coapplicantReceiveAllowanceIncome?.message ?? ''}
          control={control}
          cols={2}
        />
      </Col>
      {watchAllowanceIncome && (
        <>
          <Col xs={24} md={12}>
            <InputField
              label="Allowance Income"
              name="coapplicantAllowanceIncome"
              control={control}
              placeholder="$ 54000"
              size="large"
              type="number"
              prefix={watchSalaryCurrency ?? ''}
              error={errors?.coapplicantAllowanceIncome?.message ?? ''}
            />
          </Col>
          <Col xs={24} md={12}>
            <SelectField
              label="Allowance Frequency"
              name="coapplicantAllowanceFrequency"
              placeholder="Select your allowance frequency"
              control={control}
              error={errors?.coapplicantAllowanceFrequency?.message ?? ''}
              size="large"
              options={FREQUENCY_OPTIONS}
            />
          </Col>
          <Col xs={24}>
            <ListOptionsField
              name="coapplicantTypeOfAllowanceIncome"
              options={ALLOWANCES_TYPES_OPTIONS}
              label="Type of allowance?"
              error={errors?.coapplicantTypeOfAllowanceIncome?.message ?? ''}
              control={control}
              cols={2}
              multiple={true}
            />
          </Col>
        </>
      )}
      <Col xs={24}>
        <ListOptionsField
          name="coapplicantReceiveCommissionIncome"
          options={AGREE_OPTIONS}
          label="Do you receive commission income?"
          error={errors?.coapplicantReceiveCommissionIncome?.message ?? ''}
          control={control}
          cols={2}
        />
      </Col>
      {watchCommissionIncome && (
        <>
          <Col xs={24} md={12}>
            <InputField
              label="What is your commission Income?"
              name="coapplicantCommissionIncome"
              control={control}
              placeholder="$ 54000"
              size="large"
              type="number"
              prefix={watchSalaryCurrency ?? ''}
              error={errors?.coapplicantCommissionIncome?.message ?? ''}
            />
          </Col>
          <Col xs={24} md={12}>
            <SelectField
              label="Commission Frequency"
              placeholder="Select your commission frequency"
              name="coapplicantCommissionFrequency"
              control={control}
              error={errors?.coapplicantCommissionFrequency?.message ?? ''}
              size="large"
              options={FREQUENCY_OPTIONS}
            />
          </Col>
        </>
      )}
      <Col xs={24}>
        <ListOptionsField
          name="coapplicantReceiveAnnualCashBonus"
          options={AGREE_OPTIONS}
          label="Do you receive Annual Cash Bonus?"
          error={errors?.coapplicantReceiveAnnualCashBonus?.message ?? ''}
          control={control}
          cols={2}
        />
      </Col>
      {watchAnnualCashBonus && (
        <>
          <Col xs={24} md={12}>
            <InputField
              label="This Year Cash Bonus"
              name="coapplicantThisYearAnnualCashBonus"
              control={control}
              placeholder="$ 54000"
              size="large"
              type="number"
              prefix={watchSalaryCurrency ?? ''}
              error={errors?.coapplicantThisYearAnnualCashBonus?.message ?? ''}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputField
              label="Last Year Cash Bonus"
              name="coapplicantLastYearAnnualCashBonus"
              control={control}
              placeholder="$ 54000"
              size="large"
              type="number"
              prefix={watchSalaryCurrency ?? ''}
              error={errors?.coapplicantLastYearAnnualCashBonus?.message ?? ''}
            />
          </Col>
        </>
      )}
      <Col xs={24}>
        <ListOptionsField
          name="coapplicantReceiveStockUnit"
          options={AGREE_OPTIONS}
          label="Do you receive stock options/restricted stock units?"
          error={errors?.coapplicantReceiveStockUnit?.message ?? ''}
          control={control}
          cols={2}
        />
      </Col>
      {watchStockUnit && (
        <>
          <Col xs={24} md={12}>
            <InputField
              label="This Year Stock Options"
              name="coapplicantThisYearStockOptions"
              control={control}
              placeholder="$ 54000"
              size="large"
              type="number"
              prefix={watchSalaryCurrency ?? ''}
              error={errors?.coapplicantThisYearStockOptions?.message ?? ''}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputField
              label="Last Year Stock Options"
              name="coapplicantLastYearStockOptions"
              control={control}
              placeholder="$ 54000"
              size="large"
              type="number"
              prefix={watchSalaryCurrency ?? ''}
              error={errors?.coapplicantLastYearStockOptions?.message ?? ''}
            />
          </Col>
        </>
      )}
    </Row>
  </Col>
);
