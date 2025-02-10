import { Col, Row } from 'antd';
import TaxMeeting from '../../components/TaxMeeting';

export const TaxAdvicePage = () => {
  return (
    <div
      style={{
        width: '95%',
        margin: '0 auto',
      }}
    >
      <Row>
        <Col xs={12}>
          <TaxMeeting meetingUrl="https://meetings.hubspot.com/pau-lam/tax-meeting?embed=true" />
        </Col>
      </Row>
    </div>
  );
};

export default TaxAdvicePage;
