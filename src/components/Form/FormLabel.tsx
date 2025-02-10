import { CSSProperties, FC } from 'react';
import { theme } from 'antd';
const { useToken } = theme;

interface FormLabelProps {
  label: string;
  required?: boolean;
  style?: CSSProperties;
}

const FormLabel: FC<FormLabelProps> = ({ label, required = false, style }) => {
  const { token } = useToken();
  return (
    <div
      className={`form-label-wrap ${required ? 'required' : ''}`}
      style={{ ...style }}
    >
      <label className="form-label" style={{ color: token.colorTextHeading }}>
        {label}
      </label>
    </div>
  );
};

export default FormLabel;
