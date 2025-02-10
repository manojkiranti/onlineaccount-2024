import React, { useEffect, useState } from 'react';
import { useGetLodgeReturnListQuery } from '@/pages/tax/apis/lodgeReturnAPI';
import { formatDate } from '@/utils/commonUtils';
import {
  Card,
  Input,
  Table,
  Button,
  Typography,
  Space,
  Tag,
  Row,
  Col,
  Divider,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import TaxMeeting from '@/pages/tax/components/TaxMeeting';
import ApplicationHeading from '@/components/Elements/Heading/ApplicationHeading';
import CalculatorListComponent from '@/components/Calculator/Calculator';
import useScrollToTop from '@/hooks/useScrollTop';

const { Search } = Input;

const LodgeReturn = () => {
  const { data: lodgeReturnList } = useGetLodgeReturnListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();

  useScrollToTop();

  const columns: any = [
    {
      title: 'Application ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Approval Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, { status }: { status: string }) => {
        const color = status === 'pending' ? 'orange' : 'green';
        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Tax Year',
      dataIndex: 'tax_year',
      key: 'tax_year',
    },
    {
      title: 'Submission Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_: any, { created_at }: { created_at: string | null }) => {
        if (!created_at) return null;
        return <div>{formatDate(created_at)}</div>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, { id }: { id: number }) => {
        return (
          <Button
            type="primary"
            size="small"
            onClick={() => {
              navigate(`/tax/lodge-return/application/${id}`);
            }}
          >
            Update Detail
          </Button>
        );
      },
    },
  ];

  return (
    <div
      style={{
        width: '95%',
        margin: '0 auto',
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <ApplicationHeading title="All Tax Returns" />
          <Table
            columns={columns}
            dataSource={lodgeReturnList?.data}
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: '8px',
              padding: '0px 20px',
            }}
            title={() => (
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  width: '100%',
                }}
              >
                <div>
                  <Button
                    type="primary"
                    onClick={() => navigate('application')}
                  >
                    New Tax Return
                  </Button>
                </div>
              </Space>
            )}
          />
        </Col>
        <Col xs={24}>
          <Divider />
        </Col>
        <Col xs={24} md={24} lg={12}>
          <TaxMeeting meetingUrl="https://meetings.hubspot.com/pau-lam/tax-meeting?embed=true" />
        </Col>
        <Col xs={24} md={24} lg={12}>
          <Typography.Title level={3}>Calculator</Typography.Title>
          <CalculatorListComponent />
        </Col>
      </Row>
    </div>
  );
};

export default LodgeReturn;
