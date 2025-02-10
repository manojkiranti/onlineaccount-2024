import { FC, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Flex, Row, AutoComplete, Input, Typography } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { Container } from '../../Elements';
import { routes } from '@/constant/routes';
import { LOGO } from '@/constant/assets';
import styles from './PublicLayout.module.scss';
import Sidebar from '../Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/pro-light-svg-icons';
// import APPS from "@/assets/images/apps.jpg";
import APPS from "@/assets/images/app-digital.jpg";
import Assistant from '../Assistant';
import Banner from '../Banner';
import NavBar from '../Navbar';
const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});
const Header = () => {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();
  const handleSearch = (searchText: string) => {
    if (!searchText) {
      setOptions([]);
      return;
    }

    const filteredRoutes = routes.filter(route =>
      route.label.toLowerCase().includes(searchText.toLowerCase()) ||
      route.value.toLowerCase().includes(searchText.toLowerCase())
    );

    setOptions(
      filteredRoutes.map(route => ({
        value: route.value,
        label: route.label,
      }))
    );
  };

  const handleSelect = (value: string) => {
    console.log("route", value);
    navigate(value);
  };

  const handleChange = (value: string) => {
    const selectedRoute = routes.find((route) => route.value === value);
    if (selectedRoute) {
      setInputValue(selectedRoute.label); // Set to label if it's a route value
    } else {
      setInputValue(value); // Otherwise, set to the user-typed input
    }
  };

  const handleViewAssistant = () => {
    document.body.classList.toggle('assistant-open');
  }
  return (
    <header className={styles.publicHeader}>
      <Container >
        <Row gutter={30} align="middle">
          <Col md={11} xs={24}>
            <div className={styles.logoWrapper}>
              <img src={LOGO} alt="Odin Mortgage" />
            </div>
          </Col>
          <Col md={13} xs={24}>
            <Flex justify="flex-end">
              <div className='bankify-bot' onClick={handleViewAssistant}>
                <FontAwesomeIcon icon={faRobot} />
                <Typography style={{color:"#fff", fontSize:"16px"}}>Ask Genie AI Assistant</Typography>
              </div>
            </Flex>
            {/* <Flex justify="flex-end">
              <div style={{width:"100%", position:"relative"}}>
              <AutoComplete
                  options={options}
                  style={{ width: "100%", height: "55px",  }}
                  onSelect={handleSelect}
                  onSearch={handleSearch}
                  onChange={handleChange}
                  filterOption={false} 
                  value={inputValue}
                  size="large"
              >
                  <Input.Search size="large" style={{height:"55px"}} placeholder="Search..." enterButton />
                </AutoComplete>
              </div>
            </Flex> */}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate('/app/dashboard');
  };
  return (
    <footer className={styles.publicFooter}>
      <Container width="sm">
        <Row gutter={30} align="middle">
          <Col xl={24}>
            <Flex justify="flex-end">
              <Button type="primary" onClick={handleContinue}>
                Continue
              </Button>
            </Flex>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
  return <div className="main-layout">
          <div className="main-body">
            <div className='banner-wrapper' style={{
              backgroundImage: `url(${APPS})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
        
              top: 0,
              left: 0,
              width: "100%",
              position:"relative",
              zIndex:1,
 
            }}>
                <Header />
                <Banner />
            </div>
             <NavBar />
             {children}
          </div>
         
          <div className="assistant-sidebar">
            <Assistant />
          </div>
    </div>;
};

export default PublicLayout;
