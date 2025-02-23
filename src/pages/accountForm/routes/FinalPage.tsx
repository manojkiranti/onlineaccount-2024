import { Container } from "@/components/Elements";
import { PublicHeader } from "@/components/Layout";
import { Row, Col, Card, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useLocation } from "react-router-dom";

const FinalPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const code = queryParams.get("code");
  const message = queryParams.get("message");
  const name = queryParams.get("name");
  return (
    <div className="final-page">
      <PublicHeader />
      <Container>
        <Row>
          <Col xs={24}>
            <Card title="Account Details">
                <Typography.Title level={4}>Congratulation {name}</Typography.Title>
                <Paragraph>{message}</Paragraph>
                <Paragraph>Your reference number is: {code}</Paragraph>
            </Card>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FinalPage;
