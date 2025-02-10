import { InputField, SelectField } from '@/components/Form';
import {
  useFetchUserDataQuery,
  usePostUserDataMutation,
} from '@/store/apis/userApi';
import { Button, Col, Row, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import { extractPhoneNumber, formatPhoneNumber } from '@/utils/phoneUtils';
import { UserProfile } from '@/types';
import { useCountryOptions } from '@/hooks/useCountryOptions';
import { getCountryData, ICountryData, TCountryCode } from 'countries-list';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '@/pages/profile/schema/profileSchema';
import { useFetchCountryByIPQuery } from '@/store/apis/coreApi';

interface UserDataModalProps {
  visible: boolean;
  onClose: () => void;
}

const UserDataModal = ({ visible, onClose }: UserDataModalProps) => {
  const { data: profileData } = useFetchUserDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [countryDetail, setCountryDetail] = useState<ICountryData | null>(null);
  const { data: countryData, isLoading } = useFetchCountryByIPQuery();

  const profileDetail = profileData?.data;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const watchResidence = watch('countryCode');
  useEffect(() => {
    if (countryData) {
      setValue('countryCode', countryData.data.country);
    }
  }, [countryData]);

  useEffect(() => {
    if (watchResidence) {
      const countryDetail = getCountryData(watchResidence as TCountryCode);
      setCountryDetail(countryDetail);
    }
  }, [watchResidence]);

  const [
    postUserData,
    { isLoading: postUserDataLoading, error: postUserDataError },
  ] = usePostUserDataMutation();

  const countryOptions = useCountryOptions();

  useEffect(() => {
    if (profileDetail) {
      setValue('fullname', profileDetail?.fullname ?? '');
      setValue('countryCode', profileDetail?.country ?? '');
      setValue('email', profileDetail?.email ?? '');
      setValue(
        'phone',
        profileDetail?.phone
          ? profileDetail?.phone.slice(profileDetail?.country?.length)
          : '',
      );

      if (profileDetail?.country) {
        const phoneWithoutCountryCode = extractPhoneNumber(
          profileDetail?.phone,
          profileDetail?.country,
        );
        setValue('phone', phoneWithoutCountryCode);
      }
    }
  }, [profileDetail]);

  const onSubmit = async (data: UserProfile) => {
    try {
      const filteredData = {
        fullname: data.fullname,
        phone: formatPhoneNumber(data.phone ?? '', data.countryCode ?? ''),
        country: data.countryCode,
      };

      await postUserData(filteredData).unwrap();
      displaySuccess('Successfully Updated Profile.');
    } catch (err) {
      displayError('Something went wrong. Please try again later.');
    }
  };

  return (
    <Modal
      title="Add User Profile Information"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={30}>
          <Col sm={24}>
            <InputField
              name="fullname"
              control={control}
              label="Full Name"
              size="large"
              required
              error={errors?.fullname?.message ?? ''}
            />
          </Col>
          <Col sm={24}>
            <InputField
              disabled
              name="email"
              control={control}
              label="Email"
              size="large"
              required
              error={errors?.email?.message ?? ''}
            />
          </Col>
          <Col xs={24}>
            <SelectField
              showSearch={true}
              options={countryOptions}
              name="countryCode"
              control={control}
              label="Country"
              size="large"
              placeholder="Select your country"
              error={errors.countryCode?.message ?? ''}
              // onBlur={handleBlur}
              required={true}
            />
          </Col>
          <Col sm={24}>
            <InputField
              size="large"
              prefix={countryDetail ? `+ ${countryDetail.phone[0]}` : ''}
              name="phone"
              control={control}
              label="Phone"
              error={errors.phone?.message ?? ''}
            />
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginTop: '20px' }}
          loading={isLoading}
        >
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default UserDataModal;
