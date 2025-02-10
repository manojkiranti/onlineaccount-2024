import { InputField, ListOptionsField, SelectField } from '@/components/Form';
import {
  CITIZENSHIP_OPTIONS,
  MARITIAL_STATUS_OPTIONS,
  RESIDENTIAL_STATUS_OPTIONS,
} from '@/constant/options';
import {
  useFetchUserProfileQuery,
  usePostUserProfileMutation,
  UserProfileResponse,
} from '@/store/apis/userApi';
import { Button, Col, Row, Tabs } from 'antd';
import { useEffect } from 'react';
import type { TabsProps } from 'antd';
import { useForm } from 'react-hook-form';
import { useCountryOptions } from '@/hooks/useCountryOptions';
import { UserProfile } from '@/types';
import Profile from '../components/Profile';
import Application from '../components/Application';
import Settings from '../components/Settings';
import styles from '../styles/Tabs.module.scss';

export const ProfilePage = () => {
  console.log(styles.tabs);
  const {
    data: profileData,
    error: profileError,
    isLoading: profileIsLoading,
  } = useFetchUserProfileQuery();
  const profileDetail = profileData?.data?.common_data;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [
    postUserProfile,
    { isLoading: postUserProfileLoading, error: postUserProfileError },
  ] = usePostUserProfileMutation();

  const countryOption = useCountryOptions();

  useEffect(() => {
    if (profileDetail) {
      setValue('firstName', profileDetail.firstName ?? '');
      setValue('lastName', profileDetail.lastName ?? '');
      setValue('email', profileDetail.email ?? '');
      setValue('country', profileDetail.country ?? '');
      setValue('citizenship', profileDetail.citizenship ?? '');
      setValue(
        'currentResidentalStatus',
        profileDetail.currentResidentalStatus ?? '',
      );
      setValue('maritalStatus', profileDetail.maritalStatus ?? '');
    }
  }, [profileDetail]);

  const onSubmit = async (data: UserProfile) => {
    await postUserProfile(data).unwrap();
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1400px',
        height: '100%',
      }}
    >
      <Tabs
        className={styles.tabs}
        defaultActiveKey="1"
        tabPosition="left"
        title="Profile Settings"
        tabBarStyle={{
          width: '100%',
          maxWidth: '250px',
        }}
        tabBarExtraContent={{
          left: (
            <div
              style={{
                fontSize: '24px',
                textAlign: 'left',
                fontWeight: '600',
                padding: '10px 10px',
                color: '#555',
                width: '100%',
              }}
            >
              Profile Settings
            </div>
          ),
        }}
        items={[
          { key: '1', label: 'Personal Details', children: <Profile /> },
          { key: '2', label: 'Application', children: <Application /> },
          { key: '3', label: 'Password & Security', children: <Settings /> },
        ]}
      />
    </div>
  );
};
