import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

export const cardMenuItems:MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/card/new-debit-card">
          New Debit Card
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/card/new-credit-card">
          New Credit Card
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="/card/repin-request">
            Re-pin Debit Card
        </Link>
      ),
    },
    {
      key: '4',
      label: (
         <Link to="/card/debit-card-block">
          Debit Card Block
         </Link>
      ),
    },
    {
      key: '5',
      label: (
        <Link to="/card/debit-card-unblock">
          Debit Card Unblock
       </Link>
      ),
    }
  ];