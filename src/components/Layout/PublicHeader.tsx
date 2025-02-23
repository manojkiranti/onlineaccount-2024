import { Col, Row } from "antd";;
import { LOGO } from "@/utils/images";


import { AsideContainer } from "./AsideContainer";
import styles from "./header.module.scss";
import { Container } from "../Elements";
import { Link } from "react-router-dom";
 const PublicHeader = () => {
  return (
    <header className={styles["main-header"]}>
      <Container>
        <Row>
          <Col md={8} sm={24}>
            <div>
              <Link to="/">
                <img className={styles.logo} src={LOGO} alt="" />
              </Link>
              
            </div>
          </Col>
          <Col md={16} sm={24}></Col>
        </Row>
      </Container>
    </header>
  );
};

export default PublicHeader;
