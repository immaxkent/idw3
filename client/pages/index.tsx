import RootLayout from "../components/layout";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #39cd86;
  font-family: "Monomaniac One";
`;

const Header = styled.div`
  width: 100%;
  margin-top: 48px;
`;

export default function Home({}) {
  return (
    <RootLayout>
      <PageContainer>
        Some stuff
        <Header></Header>
      </PageContainer>
    </RootLayout>
  );
}
