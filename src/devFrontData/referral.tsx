export const generateReferralCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const REFERRAL_CODE = generateReferralCode();

export const UNIQUE_REFERRAL_URL = '[Unique Referral URL]';
