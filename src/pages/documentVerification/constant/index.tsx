import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

export const documentVerificationMenu:MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/document-verification/bank-guarantee">
          Bank Gurantee Verification
        </Link>
      ),
    }
  ];