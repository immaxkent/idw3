import styled from "styled-components";
import Image from "next/image";

const HeaderContainer = styled.div`
  width: 100%;
  padding-top: 48px;
  padding-bottom: 16px;
  display: flex;
  justify-content: center;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderLogo = styled.img`
  width: 400px;
`;

const HeaderText = styled.div`
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 0.25em;
  margin-top: 8px;
`;

const Header = () => (
  <HeaderContainer>
    <LogoContainer>
      <HeaderLogo src="assets/logo.png" />
      <HeaderText>idw3</HeaderText>
    </LogoContainer>
  </HeaderContainer>
);

export default Header;
