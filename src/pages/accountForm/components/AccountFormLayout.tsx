import { PublicHeader } from "@/components/Layout";
import { Container } from "@/components/Elements";
import { Row, Col, Grid } from "antd";

import FormStepper from "./FormStepper";
import FormSidebar from "./FormSidebar";
import { FC, ReactNode } from "react";
import { AsideContainer } from "@/components/Layout/AsideContainer";

const { useBreakpoint } = Grid;
interface AccountFormLayoutProps {
  currentStep?: number;
  currentStepProgress?: number;
  children: ReactNode;
}
const AccountFormLayout: FC<AccountFormLayoutProps> = ({
  currentStep,
  children,
}) => {
  const screens = useBreakpoint();
  return (
    
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <PublicHeader />
      <AsideContainer>
        <Row gutter={32}>
          <Col md={24} xs={24}>
            <div style={{ paddingBottom: "2rem" }}>
              <FormStepper current={currentStep} />
            </div>
            {children}
          </Col>
        </Row>
      </AsideContainer>
      {screens.md && <FormSidebar />}
    </div>
  );
};

export default AccountFormLayout;
