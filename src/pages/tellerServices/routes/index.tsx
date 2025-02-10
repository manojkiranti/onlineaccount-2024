import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Col, Row, Tabs } from "antd";
import { tellerServices } from "@/pages/home/constant";
import { Container } from "@/components/Elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CashDeposit from "./CashDeposit";
import ChequeDeposit from "./ChequeDeposit";

export const TellerRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (key: string) => {
    navigate(key);
  };
  const activeKey =
    tellerServices.find((service) => location.pathname.endsWith(service.link))
      ?.link || tellerServices[0].link;
  return (
    <Container>
      <Row>
        <Col xs={24} md={24}>
          <Tabs
            activeKey={activeKey}
            tabPosition="left"
            // style={{ height: "calc(100vh - 520px)" }}
            onChange={handleTabChange}
            items={tellerServices.map(service => ({
              label: (
                <span>
                  <FontAwesomeIcon icon={service.icon} style={{ marginRight: 8 }} />
                  {service.title}
                </span>
              ),
              key: service.link, // Use relative path as key
              children:        <Routes>
              <Route path="cash-deposit" element={<CashDeposit />} />
              <Route path="cheque-deposit" element={<ChequeDeposit />} />
              <Route path="*" element={<Navigate to={tellerServices[0].link} replace />} />
            </Routes>
            }))}
          />

          {/* Define nested routes */}
    
        </Col>
      </Row>
    </Container>
 
  );
};
