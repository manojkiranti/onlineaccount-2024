import { FormOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Row, Col, Typography, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

import ApplicationHeading from '@/components/Elements/Heading/ApplicationHeading';
import { FormFieldHeading } from '@/components/Elements';
import ApplicationSubHeading from '@/components/Elements/Heading/ApplicationSubHeading';
import LenderComponent from '@/components/Elements/LenderComponent/LenderComponent';
import { useFetchLendersQuery } from '@/store/apis/coreApi';
import { useFetchDashboardDataQuery } from '@/store/apis/dashboardApi';
import {
  CitizenshipStatus,
  EmploymentStatus,
  lenderMappings,
  MortgageType,
  totalLenders,
} from '../constant/LenderMap';
import { tipsData } from '../constant/TipsMap';
import { useEffect, useState } from 'react';
import TipsComponent from '@/components/Elements/TipsComponent/TipsComponent';
import TaxImage from '@/assets/images/dashboard/Tax_image.png';
import { useFetchRegisterTypeQuery } from '@/store/apis/userApi';
import UserDataModal from '@/components/Modal/UserData';
import useScrollToTop from '@/hooks/useScrollTop';

interface LenderProps {
  id: number;
  image_url: string;
  variable_rate: string;
  comparison_rate: string;
  tags: string[];
}

export const DashboardPage = () => {
  const [isProfileModalVisible, setIsProfileModalVisible] =
    useState<boolean>(false);
  const [lenders, setLenders] = useState<string[]>([]);
  const [lenderData, setLenderData] = useState<LenderProps[]>([]);
  const { data: fetchedLenderData, isLoading: isLenderDataLoading } =
    useFetchLendersQuery();
  const { data: dashboardData, isLoading: dashboardLoading } =
    useFetchDashboardDataQuery();

  const navigate = useNavigate();

  const { data: registerTypeData } = useFetchRegisterTypeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (dashboardData) {
      const mortgageType: MortgageType = dashboardData?.data?.mortgageType;
      const citizenship: CitizenshipStatus = dashboardData?.data?.citizenship;
      const employment: EmploymentStatus = dashboardData?.data?.employment;

      if (mortgageType && citizenship && employment) {
        const lendersList =
          lenderMappings?.[mortgageType]?.[citizenship]?.[employment] || [];
        setLenders(lendersList);
      } else {
        setLenders(totalLenders);
      }
    }
  }, [dashboardData]);

  useEffect(() => {
    if (fetchedLenderData && lenders.length > 0) {
      const filteredLenders = fetchedLenderData.filter((item: any) =>
        lenders.includes(item.name),
      );
      setLenderData(filteredLenders);
    }
  }, [fetchedLenderData, lenders]);

  useEffect(() => {
    if (registerTypeData) {
      const { registerType, missingFields } = registerTypeData;
      if (registerType === 3 && missingFields === true) {
        setIsProfileModalVisible(true);
      }
    }
  }, [registerTypeData]);

  const startPurchaseAssessment = () => {
    if (dashboardData) {
      const { mortgageType, hasPurchaseApplication, hasRefinanceApplication } =
        dashboardData;

      if (mortgageType === 'purchase') {
        navigate(
          hasPurchaseApplication
            ? '/mortgage/purchase'
            : '/mortgage/purchase/step/purchase-detail',
        );
      } else if (
        mortgageType === 'refinance' ||
        mortgageType === 'refinance_cashout'
      ) {
        navigate(
          hasRefinanceApplication
            ? '/mortgage/refinance'
            : '/mortgage/refinance/step/personal-detail',
        );
      } else {
        navigate('/mortgage/purchase');
      }
    }
  };

  const startTaxAssessment = () => {
    if (dashboardData) {
      const { hasTaxApplication } = dashboardData;
      navigate(
        hasTaxApplication
          ? '/tax/lodge-return'
          : '/tax/lodge-return/application',
      );
    }
  };
  if (isLenderDataLoading || dashboardLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ApplicationHeading title="Mortgage Progress" />
      <Card>
        <Row gutter={[30, 30]}>
          {lenderData?.length > 0 && (
            <Col style={{ padding: '0px 20px' }}>
              <ApplicationSubHeading title="List of Lenders You can Qualify for" />
              <Row gutter={[30, 30]}>
                {lenderData?.map((item: LenderProps) => (
                  <Col xs={24} lg={12} xl={8} key={item.id}>
                    <LenderComponent
                      data={item}
                      isLenderDataLoading={isLenderDataLoading}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          )}
          <Col style={{ padding: '0px 20px' }} xs={24}>
            <Card>
              <ApplicationSubHeading title="Continue with Online Assessment" />
              <Typography.Paragraph>
                You can also apply for mortgages using Odin portal effortlessly.
                Simply click the button below to start your Mortgage
                Application.
              </Typography.Paragraph>
              <Button
                type="primary"
                size="large"
                onClick={startPurchaseAssessment}
              >
                {dashboardData?.data?.mortgageType === 'purchase'
                  ? dashboardData?.hasPurchaseApplication
                    ? 'Continue with Purchase Assessment'
                    : 'Start My Purchase Application'
                  : dashboardData?.hasRefinanceApplication
                    ? 'Continue with Refinance Assessment'
                    : 'Start My Refinance Application'}
              </Button>
            </Card>
          </Col>
        </Row>
      </Card>
      <Divider />
      <div>
        <ApplicationHeading
          title="Tax Progress"
          style={{
            margin: '1rem 0',
          }}
        />
        <Card>
          <Row gutter={[30, 30]}>
            <Col xs={18}>
              {dashboardData?.hasTaxApplication ? (
                <ApplicationHeading title="Tax Application Filed" />
              ) : (
                <ApplicationHeading title="No Tax Application Filed Yet" />
              )}
              <Typography.Paragraph
                style={{
                  fontSize: '16px',
                }}
              >
                You can also apply for Tax Returns using Odin portal
                effortlessly. Simply click the button below to start your Tax
                Application.
              </Typography.Paragraph>
              <Button type="primary" size="large" onClick={startTaxAssessment}>
                {dashboardData?.hasTaxApplication
                  ? 'Continue with Tax Assessment'
                  : 'Start My Tax Application'}
              </Button>
            </Col>
            <Col xs={6}>
              <img src={TaxImage} alt="tax" style={{ width: '100%' }} />
            </Col>
          </Row>
        </Card>
      </div>
      <Divider />
      <Col xs={24}>
        <ApplicationHeading title="Some tips based on our analysis about your situation" />
        <Card>
          <Row gutter={[30, 30]}>
            {tipsData?.map((tip) => {
              return (
                <Col xs={24} lg={12} key={tip.id}>
                  <TipsComponent
                    data={tip}
                    citizenship={dashboardData?.data?.citizenship}
                    employment={dashboardData?.data?.employment}
                  />
                </Col>
              );
            })}
          </Row>
        </Card>
      </Col>
      <UserDataModal
        visible={isProfileModalVisible}
        onClose={() => setIsProfileModalVisible(false)}
      />
    </>
  );
};
