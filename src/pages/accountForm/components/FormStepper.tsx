import {
  AimOutlined,
  FileDoneOutlined,
  MobileOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Card, ConfigProvider, Steps } from "antd";
import { FC } from "react";

interface FormStepperProps {
  current?: number;
  progress?: number;
}

const FormStepper: FC<FormStepperProps> = ({ current = 0, progress = 30 }) => {
  console.log(current);
  return (
    <>
      <Card styles={{ body: { padding: "1rem" } }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#4cc5ea",
            },
          }}
        >
          <Steps
            current={current}
            status="process"
            percent={progress}
            items={[
              {
                title: "Register",
                // icon: <SolutionOutlined />,
                subTitle: current === 0 ? "In Progress" : "",
              },
              {
                title: "Documents & Idenfication",
                // icon: <FileDoneOutlined />,
                subTitle: current === 1 ? "In Progress" : "",
              },

              {
                title: "Address & Employment",
                // icon: <AimOutlined />,
                subTitle: current === 2 ? "In Progress" : "",
              },
            ]}
          />
        </ConfigProvider>
      </Card>
    </>
  );
};

export default FormStepper;
