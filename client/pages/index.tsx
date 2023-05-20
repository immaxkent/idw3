import Header from "../components/Header";
import LandingContent from "../components/LandingContent";
import RootLayout from "../components/Atoms/layout";
import styled from "styled-components";
import SignUp from "../components/SignUp";
import { useRouter } from "next/router";

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
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home({}) {
  const router = useRouter();
  const {
    query: { step },
  } = router;

  return (
    <RootLayout>
      <PageContainer>
        <Header />
        <ContentContainer>
          {!step ? <LandingContent /> : <SignUp />}
        </ContentContainer>
      </PageContainer>
    </RootLayout>
  );
}
