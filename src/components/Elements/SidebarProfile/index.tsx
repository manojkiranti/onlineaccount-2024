import React from 'react';
import {
  Avatar,
  Dropdown,
  Menu,
  Typography,
  Space,
  Tooltip,
  MenuProps,
} from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  DownOutlined,
} from '@ant-design/icons';
import styles from './SidebarProfile.module.scss';
import useToken from 'antd/es/theme/useToken';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { clearAuthToken } from '@/store/slices/auth/authSlice';

const iconStyle = { fontSize: '16px' };
const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Profile',
    icon: <SettingOutlined style={iconStyle} />,
  },
  {
    key: '2',
    icon: <LogoutOutlined style={iconStyle} />,
    label: 'Log Out',
  },
];

const UserProfileDropdown = () => {
  const { userData } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      navigate('/profile');
    }
    if (e.key === '2') {
      dispatch(clearAuthToken());
      navigate('/auth');
    }
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      trigger={['click']}
      placement="bottomRight"
    >
      <Space className={styles.trigger} style={{ cursor: 'pointer' }}>
        <Avatar
          icon={<UserOutlined />}
          style={{
            backgroundColor: '#003862',
          }}
        />
        <div className={styles.details}>
          <Tooltip title={userData?.email}>
            <Typography.Text type="secondary" ellipsis className={styles.email}>
              {userData?.email}
            </Typography.Text>
          </Tooltip>
        </div>
        <DownOutlined
          style={{
            color: '#fff',
            fontSize: '12px',
          }}
        />
      </Space>
    </Dropdown>
  );
};

export default UserProfileDropdown;
