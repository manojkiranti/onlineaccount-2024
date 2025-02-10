import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

export const loanMenu:MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/loan/home-loan">
          Home Loan
        </Link>
      ),
    },
    {
        key: '2',
        label: (
          <Link to="/loan/gold-loan">
              Gold Loan
          </Link>
        ),
      },
      {
        key: '3',
        label: (
          <Link to="/loan/loan-against-share">
            Loan Against Share
          </Link>
        ),
      },
      {
        key: '4',
        label: (
          <Link to="/loan/credit-card">
            Credit Card
          </Link>
        ),
      }
  ];