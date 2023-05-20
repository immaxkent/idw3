import styled from "styled-components";
import Image from "next/image";

const HeaderContainer = styled.div`
  width: 100%;
  padding-top: 48px;
  display: flex;
  justify-content: center;
`;

const HeaderLogo = styled.img`
  width: 492px;
`;

const Header = () => (
  <HeaderContainer>
    <HeaderLogo src="/assets/HeaderLogo.png" />
  </HeaderContainer>
);

export default Header;
