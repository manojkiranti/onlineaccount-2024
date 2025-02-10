import { Button } from 'antd';
import styled from 'styled-components';
import GoogleImg from '@/assets/images/social/google.png';
import { FC } from 'react';

const StyledButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-weight: 600;
`;
const LogoContainer = styled.div`
  margin-right: 10px;
  > img {
    height: 20px;
    vertical-align: middle;
  }
`;

interface GoogleLoginButtonProps {
  isLoading: boolean;
  handleButtonClick: () => void;
  isError: boolean;
}
const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({
  isLoading,
  handleButtonClick,
}) => {
  return (
    <StyledButton disabled={isLoading} onClick={handleButtonClick}>
      <LogoContainer>
        <img src={GoogleImg} alt="" />
      </LogoContainer>
      <div>Continue with Google</div>
    </StyledButton>
  );
};

export default GoogleLoginButton;
