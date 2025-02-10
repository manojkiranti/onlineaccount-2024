import { InputField, SelectField } from '@/components/Form';
import {
  useFetchUserDataQuery,
  usePostUserDataMutation,
} from '@/store/apis/userApi';
import { Button, Col, Row, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCountryOptions } from '@/hooks/useCountryOptions';
import { UserProfile } from '@/types';
import { displayError, displaySuccess } from '@/utils/displayMessageUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../schema/profileSchema';
import { getCountryData, ICountryData, TCountryCode } from 'countries-list';
import { useFetchCountryByIPQuery } from '@/store/apis/coreApi';
import { extractPhoneNumber, formatPhoneNumber } from '@/utils/phoneUtils';

const Profile = () => {
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
      setValue('tfn_number', profileDetail?.tfn_number ?? '');
      setValue(
        'phone',
        profileDetail.phone.slice(profileDetail?.country?.length) ?? '',
      );

      if (profileDetail.country) {
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
        phone: formatPhoneNumber(data?.phone ?? '', data?.countryCode ?? ''),
        country: data?.countryCode,
        tfn_number: data?.tfn_number,
      };

      await postUserData(filteredData).unwrap();
      displaySuccess('Successfully Updated Profile.');
    } catch (err) {
      displayError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <div>
            <h2
              style={{
                marginBottom: '20px',
                color: '#1a1a1a',
                fontSize: '20px',
              }}
            >
              Personal Information
            </h2>
          </div>
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
            <Col xs={24} md={12}>
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
            <Col sm={24} md={12}>
              <InputField
                size="large"
                prefix={countryDetail ? `+ ${countryDetail.phone[0]}` : ''}
                name="phone"
                control={control}
                label="Phone"
                error={errors.phone?.message ?? ''}
              />
            </Col>
            <Col xs={24}>
              <InputField
                label="TFN Number"
                name="tfnNumber"
                control={control}
                placeholder="Enter your TFN Number"
                size="large"
              />
            </Col>
          </Row>
        </>
        <Button loading={postUserDataLoading} type="primary" htmlType="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default Profile;
