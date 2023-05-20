import styled from "styled-components";

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

const Button = styled.button`
  background: #d9d9d9;
  border-radius: 24px;
  height: 64px;
  width: 224px;
  text-transform: uppercase;
  font-size: 18px;
  letter-spacing: 0.15em;
  font-weight: 600px;
`;

const LandingContent = ({ onSignUp }: { onSignUp: () => void }) => (
  <Container>
    <div>
      <Image src="/assets/BTC.png" />
    </div>
    <MainContent>
      <p>
        Decentralised <br /> B2C <br /> sales portal.
      </p>
      <ButtonContainer>
        <Button onClick={onSignUp}>Sign up</Button>
      </ButtonContainer>
    </MainContent>
    <div>
      <Image src="/assets/Data.png" />
    </div>
  </Container>
);

export default LandingContent;
