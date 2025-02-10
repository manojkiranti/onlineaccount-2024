import { Button, Flex, Modal, message, Tabs } from 'antd';
import { FC, useState } from 'react';
import {
  generateReferralCode,
  UNIQUE_REFERRAL_URL,
} from '@/devFrontData/referral';
import {
  FacebookOutlined,
  MailOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import styles from './ReferralModal.module.scss';

const { TabPane } = Tabs;

const ReferralButton: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [mortgageReferralCode, setMortgageReferralCode] = useState<string>('');
  const [taxReferralCode, setTaxReferralCode] = useState<string>('');

  const handleOpenModal = () => {
    setOpen(true);
    setMortgageReferralCode(generateReferralCode());
    setTaxReferralCode(generateReferralCode());
  };

  const generateShareMessage = (referralType: string, referralCode: string) => {
    const referralBaseMessage = `Check out Odin Mortgage & Tax for Aussie expats. Use my referral code ${referralCode} to get $100 off your next ${referralType.toLowerCase()}!`;
    if (referralType === 'Mortgage') {
      return `Check out Odin's mortgage service - they provide quarterly reviews and only help Aussie expats - highly recommend. www.odinmortgage.com`;
    }
    return referralBaseMessage;
  };

  const ShareButtons = ({
    referralType,
    referralCode,
  }: {
    referralType: string;
    referralCode: string;
  }) => {
    const shareMessage = generateShareMessage(referralType, referralCode);

    return (
      <Flex gap="small" justify="center" className={styles.shareButtons}>
        <Button
          icon={<WhatsAppOutlined />}
          onClick={() =>
            window.open(
              `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
              '_blank',
            )
          }
          className={styles.button}
        >
          WhatsApp
        </Button>
        <Button
          icon={<MailOutlined />}
          onClick={() =>
            (window.location.href = `mailto:?subject=Odin Mortgage & Tax Referral&body=${encodeURIComponent(shareMessage)}`)
          }
          className={styles.button}
        >
          Email
        </Button>
        <Button
          icon={<FacebookOutlined />}
          onClick={() =>
            window.open(
              `https://www.facebook.com/dialog/send?app_id=YOUR_APP_ID&link=${encodeURIComponent(UNIQUE_REFERRAL_URL + (referralType === 'Mortgage' ? '' : '/' + referralCode))}&redirect_uri=${encodeURIComponent(UNIQUE_REFERRAL_URL)}`,
              '_blank',
            )
          }
          className={styles.button}
        >
          Messenger
        </Button>
        <Button
          key="copy"
          type="primary"
          onClick={() => {
            navigator.clipboard.writeText(
              referralType === 'Mortgage'
                ? shareMessage
                : `${referralCode}\n${UNIQUE_REFERRAL_URL}`,
            );
            message.success('Copied to clipboard!');
          }}
          className={styles.button}
        >
          Copy
        </Button>
      </Flex>
    );
  };

  const ReferralContent = ({
    referralType,
    referralCode,
  }: {
    referralType: string;
    referralCode: string;
  }) => {
    const referralBaseMessage = `Check out Odin Mortgage & Tax for Aussie expats. Use my referral code ${referralCode} to get $100 off your next ${referralType.toLowerCase()}!`;
    const isMortgage = referralType === 'Mortgage';
    const messageContent = isMortgage
      ? `Check out Odin's Mortgage Service for Aussie Expats - they provide quarterly reviews, free property and suburb reports, as well as free tax consultations. Highly recommend. www.odinmortgage.com`
      : referralBaseMessage;

    return (
      <>
        <p>
          {isMortgage
            ? `Share Odin's Mortgage Service with your friends!`
            : `Share your referral code and your friend will get $100 credit towards their next ${referralType.toLowerCase()}!`}
        </p>
        {referralType !== 'Mortgage' && (
          <div className={styles.codeContainer}>
            <p className={styles.referralCode}>{referralCode}</p>
          </div>
        )}
        <div className={styles.messageContainer}>
          {messageContent}
          {referralType !== 'Mortgage' && (
            <p>{`${UNIQUE_REFERRAL_URL}/${referralCode}`}</p>
          )}
        </div>
        <p>Share Via:</p>
        <ShareButtons referralType={referralType} referralCode={referralCode} />
      </>
    );
  };

  return (
    <>
      <Button onClick={handleOpenModal} className={styles.referButton}>
        Refer a friend!
      </Button>
      <Modal
        title="Refer a Friend"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={600}
        className={styles.modal}
      >
        <Tabs defaultActiveKey="1" className={styles.tabs}>
          <TabPane
            tab={<span className={styles.tabLabel}>Tax Referral</span>}
            key="1"
          >
            <ReferralContent
              referralType="Tax Return"
              referralCode={taxReferralCode}
            />
          </TabPane>
          <TabPane
            tab={<span className={styles.tabLabel}>Mortgage Referral</span>}
            key="2"
          >
            <ReferralContent
              referralType="Mortgage"
              referralCode={mortgageReferralCode}
            />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default ReferralButton;
