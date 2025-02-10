import { MenuType } from '@/types';

/**
 * todo: clearify the tabs for each menu
 * todo: dynamic DB should be maintained and fetch menu through api
 */
export const MENU_ITEMS: MenuType[] = [
  {
    key: '0',
    label: 'Home',
    link: '/',
    icon: 'home'
  },
  {
    key: '1',
    label: 'Mobile Banking',
    link: '/mobank',
    icon: 'mobile'
  },

  {
    key: '2',
    label: 'Card',
    link: '/card',
    icon: 'card'
  },
  {
    key: '3',
    label: 'Customer Service',
    link: '/customer-service',
    icon: 'customer'
  },
  {
    key: '4',
    label: 'Teller',
    link: '/teller-service',
    icon: 'teller'
  },
  {
    key: '5',
    label: 'Loans',
    link: '/loan',
    icon: 'loan'
  },
  {
    key: '6',
    label: 'Documents',
    link: '/document-verification',
    icon: 'document'
  },
];
