import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Col, Row, Tabs } from 'antd';
import { customerServices } from '@/pages/home/constant';
import { Container } from '@/components/Elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FixedDeposit from './FixedDeposit';
import DisputeClaim from './DisputeClaim';
import BlockAccount from './BlockAccount';
import ChequeRequest from './ChequeRequest';
import ChequeStopRequest from './ChequeStopRequest';
import BalanceCertificate from './BalanceCertificate';
import LockerRequest from './LockerRequest';


export const CustomerServiceRoutes = () => {
  const navigate = useNavigate();
    const location = useLocation();
  
    const handleTabChange = (key: string) => {
      navigate(key);
    };
    const activeKey = customerServices.find(service =>
        location.pathname.endsWith(service.link)
      )?.link || customerServices[0].link;

    return (
      <Container>
      <Row>
        <Col xs={24} md={24}>
          <Tabs
            activeKey={activeKey}
            tabPosition="left"
            // style={{ height: "calc(100vh - 520px)" }}
            onChange={handleTabChange}
            items={customerServices.map(service => ({
              label: (
                <span>
                  <FontAwesomeIcon icon={service.icon} style={{ marginRight: 8 }} />
                  {service.title}
                </span>
              ),
              key: service.link, // Use relative path as key
              children:      <Routes>
              <Route path="fixed-deposit" element={<FixedDeposit />} />
              <Route path="dispute-claim" element={<DisputeClaim />} />
              <Route path="account-freeze" element={<BlockAccount />} />
              <Route path="cheque-request" element={<ChequeRequest />} />
              <Route path="cheque-stop" element={<ChequeStopRequest />} />
              <Route path="balance-certificate-request" element={<BalanceCertificate />} />
              <Route path="locker-request" element={<LockerRequest />} />
             <Route path="*" element={<Navigate to={customerServices[0].link} replace />} />
            </Routes>
            }))}
          />

          {/* Define nested routes */}
    
        </Col>
      </Row>
    </Container>

     
    );
  };