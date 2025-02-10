import ApplicationHeading from '@/components/Elements/Heading/ApplicationHeading';
import { Col, Row } from 'antd';
import React, { useEffect } from 'react';

interface TaxMeetingProps {
  meetingUrl: string;
}

const TaxMeeting: React.FC<TaxMeetingProps> = ({ meetingUrl }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <ApplicationHeading title="Tax Process" />
      <div
        className="meetings-iframe-container"
        data-src="https://meetings.hubspot.com/odinmortgage/discovery-call?embed=true"
      ></div>
    </div>
  );
};

export default TaxMeeting;
