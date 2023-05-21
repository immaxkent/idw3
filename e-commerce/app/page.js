"use client";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const BackImage = styled.img`
  width: 100vw;
`;

const Button = styled.div`
  position: absolute;
  top: 148px;
  right: 60px;
  height: 30px;
  width: 190px;
  background: black;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  font-size: 14px;
  cursor: pointer;

  & div {
    display: flex;
    align-items: center;
  }
`;

export default function Home() {
  const router = useRouter();
  const { pathname, query } = router;

  return (
    <PageContainer>
      <BackImage src="amazonPage.jpg" height="100vh" width="100vw" />
      <Button
        onClick={() =>
          window.location.assign(
            `${window.location.href}?openIdw3=true&price="$14.99"`
          )
        }
      >
        <div>IDW3 pay -&gt; </div>
        <img src="logo.png" />
      </Button>
    </PageContainer>
  );
}
