import { Navigate, Route, Routes,  useNavigate, useLocation } from 'react-router-dom';
import { Col, Row, Tabs } from 'antd';
import NewDebitCard from './NewDebitCard';
import NewCreditCard from './NewCreditCard';
import RepinDebitCard from './RepinDebitCard';
import CardBlock from './DebitCardBlock';
import DebitCardUnBlock from './DebitCardUnblock';
import { cardServices } from '@/pages/home/constant';
import { Container } from '@/components/Elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const CardRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (key: string) => {
    navigate(key);
  };
  const activeKey = cardServices.find(service =>
      location.pathname.endsWith(service.link)
    )?.link || cardServices[0].link;

  return (
    <Container>
      <Row>
        <Col xs={24} md={24}>
          <Tabs
            activeKey={activeKey}
            tabPosition="left"
            // style={{ height: "calc(100vh - 520px)" }}
            onChange={handleTabChange}
            items={cardServices.map(service => ({
              label: (
                <span>
                  <FontAwesomeIcon icon={service.icon} style={{ marginRight: 8 }} />
                  {service.title}
                </span>
              ),
              key: service.link, // Use relative path as key
              children:      <Routes>
              <Route path="new-debit-card" element={<NewDebitCard />} />
              <Route path="new-credit-card" element={<NewCreditCard />} />
              <Route path="repin-request" element={<RepinDebitCard />} />
              <Route path="debit-card-block" element={<CardBlock />} />
              <Route path="debit-card-unblock" element={<DebitCardUnBlock />} />
              <Route path="*" element={<Navigate to={cardServices[0].link} replace />} />
            </Routes>
            }))}
          />

          {/* Define nested routes */}
    
        </Col>
      </Row>
    </Container>

   
  );
};
