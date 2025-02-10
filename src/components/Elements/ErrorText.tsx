import { Typography } from 'antd';
const { Text } = Typography;

const ErrorText = ({ error }: { error: string }) => {
  return (
    <div>
      <Text type="danger" style={{ fontSize: '12px' }}>
        {error}
      </Text>
    </div>
  );
};

export default ErrorText;
