import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
export const mobankMenuItems:MenuProps['items']  = [
    {
      key: '1',
      label: (

        <Link to="/mobank/new-registration">
           New Registration
        </Link>
      ),
    },
    {
      key: '2',
      label: (
         <Link to="/mobank/reset-pin">
            Reset Pin
         </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="/mobank/deactivate">
          Block Mobile Banking
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <Link to="/mobank/activate">
          Unblock Mobile Banking
        </Link>
      ),
    },
    
   
  ];