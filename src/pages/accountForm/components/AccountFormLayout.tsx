import { PublicHeader } from "@/components/Layout";
import { Container } from "@/components/Elements";
import { Row, Col } from "antd";

import FormStepper from "./FormStepper";
import FormSidebar from "./FormSidebar";
import { FC, ReactNode } from "react";
import { AsideContainer } from "@/components/Layout/AsideContainer";

interface AccountFormLayoutProps {
  currentStep?: number;
  currentStepProgress?: number;
  children: ReactNode;
}
const AccountFormLayout: FC<AccountFormLayoutProps> = ({
  currentStep,
  children,
}) => {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <PublicHeader />
      <AsideContainer>
        <Row gutter={32}>
          <Col md={24} sm={24}>
            <div style={{ paddingBottom: "2rem" }}>
              <FormStepper current={currentStep} />
            </div>
            {children}
          </Col>
        </Row>
      </AsideContainer>
      <FormSidebar />
    </div>
  );
};

export default AccountFormLayout;
