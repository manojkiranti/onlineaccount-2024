import { Container } from "@/components/Elements";
import { MAN_LAPTOP } from "@/utils/images";
import { Col, Row } from "antd";

import styles from "../scss/product.module.scss";
import Title from "antd/es/typography/Title";

const Banner = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={24} sm={24}>
            <div className={styles["banner-wrapper"]}>
              <div className="banner-content">
                <div className={styles["banner-text"]}>
                  <Title level={1}>
                    Banking at Your Fingertips –{" "}
                    <span>Open an Account Online!</span>
                  </Title>
                </div>
              </div>
              <div className={styles["banner-image"]}>
                <img src={MAN_LAPTOP} alt="" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
