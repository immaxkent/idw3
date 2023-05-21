import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  StepNumbers,
  StepDescription,
  StepActions,
  StepMessage,
} from "../components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: #454947;
  padding: 40px 80px;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
`;

const Aside = styled.aside`
  grid-column: span 1 / span 1;
`;

const Main = styled.main`
  background: #dcdfdb50;
  grid-column: span 2 / span 2;
  border-radius: 10px;
  padding: 20px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Plugin = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const steps = [
    "SWAP QUOTATION",
    "CONFIRM SWAP",
    "PAY PROPRIETOR",
    "CONFIRMATION",
  ];

  const handleStepChange = (step: number) => {
    setStep(step);
  };

  return (
    <Wrapper>
      <Grid>
        <Aside>Logo here</Aside>
        <Main>
          <StepNumbers step={step} steps={steps} onChange={handleStepChange} />
          <Body>
            {loading ? (
              <>loading spinner</>
            ) : (
              <>
                <StepDescription title={steps[step]} />
                <StepMessage step={step} />
                <StepActions step={step} />
              </>
            )}
          </Body>
        </Main>
      </Grid>
    </Wrapper>
  );
};
