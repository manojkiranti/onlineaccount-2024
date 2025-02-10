import {
  FormOutlined,
  GlobalOutlined,
  OpenAIOutlined,
  FileTextOutlined,
  FolderOutlined,
  UserOutlined,
  AppstoreOutlined,
  WalletOutlined,
  CalculatorOutlined,
  PercentageOutlined,
  SwapOutlined,
  GoldOutlined,
} from '@ant-design/icons';

export const ICON_MAPPER: { [key: string]: JSX.Element } = {
  search: <OpenAIOutlined />,
  zoom: <GlobalOutlined />,
  document: <FileTextOutlined />,
  form: <FormOutlined />,
  folder: <FolderOutlined />,
  user: <UserOutlined />,
  dashboard: <AppstoreOutlined />,
  wallet: <WalletOutlined />,
  calc: <CalculatorOutlined />,
  percent: <PercentageOutlined />,
  swap: <SwapOutlined />,
  utils: <GoldOutlined />,
};
