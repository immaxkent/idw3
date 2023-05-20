import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "./Atoms/Button";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 160px 0;
  width: 100%;
  max-width: 500px;

  & p {
    text-align: center;
    font-size: 36px;
    font-weight: 600;
    letter-spacing: 0.25em;
  }
`;

const Image = styled.img`
  margin: 0 24px;
  width: 224px;
`;

const ButtonContainer = styled.div`
  padding-top: 16px;
`;

const LandingContent = () => {
  const router = useRouter();
  const { pathname, query } = router;

  return (
    <Container>
      <div>
        <Image src="/assets/BTC.png" />
      </div>
      <MainContent>
        <p>
          Decentralised <br /> B2C <br /> sales portal.
        </p>
        <ButtonContainer>
          <Button
            onClick={() =>
              router.push({
                pathname,
                query: {
                  ...query,
                  step: "sismo",
                },
              })
            }
          >
            Sign up
          </Button>
        </ButtonContainer>
      </MainContent>
      <div>
        <Image src="/assets/Data.png" />
      </div>
    </Container>
  );
};

export default LandingContent;
