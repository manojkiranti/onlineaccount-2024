import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Row,
  Table,
  Tag,
  Typography,
  Dropdown,
  Menu,
  Button,
  Space,
  Input,
} from 'antd';
import {
  FilterOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { useGetPreApprovalQuery } from '../../apis/dealAPI';
import { formatDate } from '@/utils/commonUtils';
import useScrollToTop from '@/hooks/useScrollTop';

const PreapprovalPage = () => {
  const [dealStageFilter, setDealStageFilter] = useState<string | null>(null);

  // Fetch pre-approval data
  const { data: preApprovalDataList, isLoading: preApprovalLoading } =
    useGetPreApprovalQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const dealStages = Array.from(
    new Set(
      preApprovalDataList?.data?.map((item: any) => item.deal_stage_name) || [],
    ),
  ) as string[];

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
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Lender',
      dataIndex: 'lender',
      key: 'lender',
    },
    {
      title: 'Deal Stage',
      dataIndex: 'deal_stage_name',
      key: 'deal_stage_name',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div style={{ padding: 16, width: 250 }}>
          <Typography.Text strong>Filter by Deal Stage</Typography.Text>
          <div style={{ marginTop: 12 }}>
            {dealStages.map((stage) => (
              <Button
                key={stage}
                type={selectedKeys[0] === stage ? 'primary' : 'default'}
                block
                style={{
                  marginBottom: 8,
                  textAlign: 'left',
                  backgroundColor:
                    selectedKeys[0] === stage ? undefined : '#f5f5f5',
                }}
                onClick={() => {
                  setSelectedKeys(stage ? [stage] : []);
                  setDealStageFilter(stage);
                }}
              >
                {stage}
              </Button>
            ))}
          </div>
          <Space
            style={{
              marginTop: 12,
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Button
              icon={<CloseOutlined />}
              onClick={() => {
                clearFilters();
                setDealStageFilter(null);
                confirm();
              }}
            >
              Reset
            </Button>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => confirm()}
            >
              Apply
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value: string, record: any) =>
        record.deal_stage_name === value,
      render: (
        _: any,
        {
          deal_stage_name,
          status_display,
        }: { deal_stage_name: string; status_display: string },
      ) => {
        const color = deal_stage_name === 'in_progress' ? 'orange' : 'green';
        return <Tag color={color}>{deal_stage_name}</Tag>;
      },
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
    {
      title: 'Pre-approval Expiry Date',
      dataIndex: 'aip_expiry',
      key: 'aip_expiry',
      render: (_: any, { aip_expiry }: { aip_expiry: string | null }) => {
        if (!aip_expiry) return null;
        return <div>{formatDate(aip_expiry)}</div>;
      },
    },
  ];

  return (
    <>
      <Typography.Title level={4}>Your Preapprovals</Typography.Title>
      <Row>
        <Col xs={24} md={24}>
          <Card
            title="Pre-approval Applications"
            extra={
              dealStageFilter && (
                <Tag
                  closable
                  onClose={() => {
                    setDealStageFilter(null);
                  }}
                >
                  {dealStageFilter}
                </Tag>
              )
            }
          >
            <Table
              dataSource={
                dealStageFilter
                  ? preApprovalDataList?.data?.filter(
                      (item: any) => item.deal_stage_name === dealStageFilter,
                    ) || []
                  : preApprovalDataList?.data || []
              }
              columns={columns}
              rowKey="id"
              loading={preApprovalLoading}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PreapprovalPage;
