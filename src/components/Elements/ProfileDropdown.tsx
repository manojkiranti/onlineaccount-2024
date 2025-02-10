import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space, theme } from 'antd';

import { useAppDispatch } from '@/hooks/hooks';
import { clearAuthToken } from '@/store/slices/auth/authSlice';
import { AuthUser } from '@/types';

const iconStyle = { fontSize: '16px' };
const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Profile',
    icon: <UserOutlined style={iconStyle} />,
  },
  {
    key: '2',
    icon: <LogoutOutlined style={iconStyle} />,
    label: 'Log Out',
  },
];

const { useToken } = theme;
interface ProfileDropdownProps {
  userDetail: AuthUser | null;
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({ userDetail }) => {
  const { token } = useToken();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '2') {
      dispatch(clearAuthToken());
      navigate('/auth');
    }
    if (e.key === '1') {
      navigate('/profile');
    }
  };

  return (
    <>
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        trigger={['click']}
        overlayStyle={{ width: '300px' }}
      >
        <a
          onClick={(e) => e.preventDefault()}
          style={{ color: token.colorText, padding: '10px 0 10px 10px' }}
        >
          <Space>
            {userDetail?.email}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};

export default ProfileDropdown;
