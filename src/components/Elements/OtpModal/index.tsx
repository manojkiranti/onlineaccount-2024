// components/OtpModal.tsx
import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';

interface OtpModalProps {
  visible: boolean;
  onCancel: () => void;
  onVerify: (otp: string) => Promise<void>;
}

const OtpModal: React.FC<OtpModalProps> = ({ visible, onCancel, onVerify }) => {
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerify = async () => {
    if (!otp) {
      message.error('Please enter the OTP.');
      return;
    }
    setLoading(true);
    try {
      await onVerify(otp);
      setOtp('');
    } catch (error) {
      // Handle verification error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Enter OTP"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="verify" type="primary" onClick={handleVerify} loading={loading}>
          Verify
        </Button>,
      ]}
    >
      <Input.OTP

        value={otp}
        onChange={(text) => setOtp(text)}
        length={6}
      />
    </Modal>
  );
};

export default OtpModal;
