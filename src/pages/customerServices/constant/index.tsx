import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

export const customerSericesMenu:MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/customer-service/fixed-deposit">
            Fixed Deposit
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/customer-service/dispute-claim">
            Dispute Claim
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="/customer-service/account-freeze">
          Block Account
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <Link to="/customer-service/cheque-request">
          Cheque Request
       </Link>
      ),
    },
    {
      key: '5',
      label: (
        <Link to="/customer-service/cheque-stop">
          Cheque Stop Payment
        </Link>
      ),
    },
    {
      key: '6',
      label: (
        <Link to="/customer-service/balance-certificate-request">
            Balance Certificate
        </Link>
      ),
    },
    {
      key: '7',
      label: (
        <Link to="/customer-service/locker-request">
            Locker Request
        </Link>
      ),
    }
  ];