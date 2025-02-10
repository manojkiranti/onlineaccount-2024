import { Card, Col, Row, Table, Typography } from 'antd';
import { useGetDealsListQuery } from '../../apis/dealAPI';
import { formatDate } from '@/utils/commonUtils';
import { useEffect, useState } from 'react';
import useScrollToTop from '@/hooks/useScrollTop';

const SettledPage = () => {
  const { data: dealsData, isLoading: dealsLoading } = useGetDealsListQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [dealData, setDealData] = useState<any>([]);

  useScrollToTop();

  useEffect(() => {
    if (dealsData) {
      const tempData = dealsData.data.filter(
        (item: any) => item.deal_stage_name === 'Completed and Sent',
      );
      setDealData(tempData);
    }
  }, [dealsData]);

  const columns: any = [
    {
      title: 'SN',
      dataIndex: 'sn',
      key: 'sn',
      render: (_: any, __: any, index: number) => index + 1, // Render the serial number
    },
    {
      title: 'Application ID',
      dataIndex: 'hs_object_id',
      key: 'hs_object_id',
    },
    {
      title: 'Deal Name',
      dataIndex: 'dealname',
      key: 'dealname',
    },
    {
      title: 'Loan Type',
      dataIndex: 'loan_type',
      key: 'loan_type',
    },
    {
      title: 'Request Date',
      dataIndex: 'createdate',
      key: 'createdate',
      render: (_: any, { createdate }: { createdate: string | null }) => {
        if (!createdate) return null;
        return <div>{formatDate(createdate)}</div>;
      },
    },
  ];

  return (
    <>
      <Typography.Title level={4}>Settled Applications</Typography.Title>
      <Row>
        <Col xs={24} md={24}>
          <Card title="Settled Applications">
            <Table
              dataSource={dealData}
              columns={columns}
              rowKey="id"
              loading={dealsLoading}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SettledPage;
