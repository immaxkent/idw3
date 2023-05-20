import { useState } from "react";
import Header from "../components/Header";
import LandingContent from "../components/LandingContent";
import RootLayout from "../components/layout";
import styled from "styled-components";
import SignUp from "../components/SignUp";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(57, 205, 134);
  background-image: url("assets/WallpaperBackground.png");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const ContentContainer = styled.div`
  background: rgba(61, 114, 56, 0.5);
  width: 80%;
  max-width: 1164px;
`;

export default function Home({}) {
  const [signingUp, setSigningUp] = useState<boolean>(false);

  return (
    <RootLayout>
      <PageContainer>
        <Header />
        <ContentContainer>
          {!signingUp ? (
            <LandingContent onSignUp={() => setSigningUp(true)} />
          ) : (
            <SignUp />
          )}
        </ContentContainer>
      </PageContainer>
    </RootLayout>
  );
}
