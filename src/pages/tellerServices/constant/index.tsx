import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

export const tellerMenuItems:MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/teller-service/cash-deposit">
          Cash Deposit
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/teller-service/cheque-deposit">
            Cheque Deposit
        </Link>
      ),
    },
]