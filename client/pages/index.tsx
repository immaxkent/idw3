import Header from "../components/Header";
import RootLayout from "../components/layout";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #39cd86;
  font-family: "Roboto mono";
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  background: #3d7238;
  width: 80%;
  max-width: 1164px;
  font-family: "Roboto mono";
`;

export default function Home({}) {
  return (
    <RootLayout>
      <PageContainer>
        <Header />
        <ContentContainer> Some text </ContentContainer>
      </PageContainer>
    </RootLayout>
  );
}
