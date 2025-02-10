// MobankRoutes.tsx
import React, { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import NewMobankRegistration from './NewMobankRegistration';
import MobankResetPin from './MobankResetPin';
import MobankBlock from './MobankBlock';
import MobankUnBlock from './MobankUnblock';
import { Col, Row, Tabs } from 'antd';
import { Container } from '@/components/Elements';
import { mobileBankingServices } from '@/pages/home/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Ensure you have this import if using icons

export const MobankRoutes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle tab change by navigating to the selected route
  const handleTabChange = (key: string) => {
    navigate(key);
  };

  // Determine the active tab based on the current pathname
  const activeKey = mobileBankingServices.find(service =>
    location.pathname.endsWith(service.link)
  )?.link || mobileBankingServices[0].link;

  // // Redirect to the default tab if the current path doesn't match any service
  // useEffect(() => {
  //   const matches = mobileBankingServices.some(service =>
  //     location.pathname.endsWith(service.link)
  //   );
  //   console.log(matches)
  //   if (!matches) {
  //     navigate(mobileBankingServices[0].link, { replace: true });
  //   }
  // }, [location.pathname, navigate]);

  return (
    <Container>
      <Row>
        <Col xs={24} md={24}>
          <Tabs
            activeKey={activeKey}
            tabPosition="left"
            // style={{ height: "calc(100vh - 520px)" }}
            onChange={handleTabChange}
            items={mobileBankingServices.map(service => ({
              label: (
                <span>
                  <FontAwesomeIcon icon={service.icon} style={{ marginRight: 8 }} />
                  {service.title}
                </span>
              ),
              key: service.link, // Use relative path as key
              children:       <Routes>
              <Route path="new-registration" element={<NewMobankRegistration />} />
              <Route path="reset-pin" element={<MobankResetPin />} />
              <Route path="deactivate" element={<MobankBlock />} />
              <Route path="activate" element={<MobankUnBlock />} />
              {/* Redirect any unknown paths to the default route */}
              <Route path="*" element={<Navigate to={mobileBankingServices[0].link} replace />} />
            </Routes>, // Placeholder for nested routes
            }))}
          />

          {/* Define nested routes */}
    
        </Col>
      </Row>
    </Container>
  );
};
