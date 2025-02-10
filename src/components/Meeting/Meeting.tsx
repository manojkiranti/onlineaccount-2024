import ApplicationHeading from '@/components/Elements/Heading/ApplicationHeading';
import { Col, Row } from 'antd';
import React, { useEffect } from 'react';

interface MeetingProps {
  meetingUrl: string;
  title?: string;
}

const Meeting: React.FC<MeetingProps> = ({ meetingUrl, title }) => {
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
    <>
      {title && <ApplicationHeading title={title} />}
      <div
        className="meetings-iframe-container"
        data-src="https://meetings.hubspot.com/odinmortgage/discovery-call?embed=true"
      ></div>
    </>
  );
};

export default Meeting;
