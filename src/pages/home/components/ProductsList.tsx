import { Container } from "@/components/Elements";
import { faPiggyBank } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Flex, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const navigate = useNavigate();
  const handleApply = () => {
    navigate("/online-apply/customer-register/32");
  };

  return (
    <>
      <div style={{ padding: "2rem 0" }}>
        <Container>
          <Row gutter={30}>
            <Col md={4} sm={24}></Col>
            <Col md={24} sm={24}>
              <div style={{ padding: "0 0 4rem" }}>
                <Input
                  placeholder="Search Your Desired Product"
                  style={{ height: "50px", borderRadius: "10px" }}
                />
              </div>

              <div id="saving-accounts">
                <Row gutter={30}>
                  {new Array(3).fill("x").map((item, index) => (
                    <Col md={8} sm={12} key={index}>
                      <div>
                        <div
                          style={{
                            background: "rgb(225 225 225)",
                            padding: "2rem 1rem 2rem",
                            minHeight: "150px",
                            textAlign: "center",
                            borderTopRightRadius: "10px",
                            borderTopLeftRadius: "10px",
                            position: "relative",
                          }}
                        >
                          <Title level={3} style={{ lineHeight: "1.6" }}>
                            <span
                              style={{
                                display: "block",
                                fontSize: "75%",
                                // color: "#e53135",
                              }}
                            >
                              Sarbashrestha
                            </span>
                            Sunya Maujdat Bachat Khata
                          </Title>
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: "50%",
                              transform: "translate(-50%, 50%)",
                            }}
                          >
                            <div
                              style={{
                                boxShadow: "0 0 18px rgba(0,0,0,.08)",
                                background: "rgb(252, 233, 65)",
                                width: "70px",
                                height: "70px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "50%",
                                fontSize: "34px",
                              }}
                            >
                              <FontAwesomeIcon icon={faPiggyBank} />
                            </div>
                          </div>
                        </div>
                        <div
                          className="product-content"
                          style={{
                            background: "#fff",
                            padding: "4rem 2rem 2rem",
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px",
                          }}
                        >
                          <ul>
                            <li>Interest Rate : 5.650%</li>
                            <li>Minimum Balance of Rs. 100,000</li>
                          </ul>

                          <Flex style={{ marginTop: "1.5rem" }} gap={20}>
                            <Button
                              size="large"
                              style={{
                                width: "100%",
                                fontWeight: "700",
                                height: "50px",
                              }}
                            >
                              View Detail
                            </Button>
                            <Button
                              type="primary"
                              size="large"
                              style={{
                                width: "100%",
                                fontWeight: "700",
                                height: "50px",
                              }}
                              onClick={handleApply}
                            >
                              Apply
                            </Button>
                          </Flex>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div id="fixed-deposits" style={{ margin: "2rem 0" }}></div>
              <div id="sathaniya-deposits"></div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProductsList;
