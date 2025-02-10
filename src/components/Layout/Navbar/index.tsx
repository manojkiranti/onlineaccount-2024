import { NavLink } from "react-router-dom"; 
import { Container } from "@/components/Elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Flex, Typography } from "antd";
import {
  faMobile,
  faHeadset,
  faUserHairMullet,
  faMoneyBill,
  faBook,
  faHome
} from "@fortawesome/pro-regular-svg-icons";
import { MENU_ITEMS } from "@/devFrontData/menu";

const iconMapper = {
  home: faHome,
  mobile: faMobile,
  card: faHeadset,
  customer: faHeadset,
  teller: faUserHairMullet,
  loan: faMoneyBill,
  document: faBook,
};
const NavBar = () => {
  return (
    <div className="navbar">
      <Container>
        <Row>
          <Col xs={24} md={24}>
            <div className="navbar-wrapper">
              <Flex gap={20} justify="space-between">
                {MENU_ITEMS.map((menu) => {
                  return (
                    
                        <NavLink className={({ isActive }) => (isActive ? 'navbar-item active' : 'navbar-item')}  key={menu.key}  to={menu.link as string} >
                            <div>
                              <div className="navbar-icon">
                                  <FontAwesomeIcon icon={iconMapper[menu.icon as keyof typeof iconMapper]} />
                              </div>

                              <Typography.Title style={{ fontSize: "14px", margin:0 }}>
                                  {menu.label}
                              </Typography.Title>
                            </div>
                        </NavLink>
                 
                  );
                })}
              </Flex>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavBar;
