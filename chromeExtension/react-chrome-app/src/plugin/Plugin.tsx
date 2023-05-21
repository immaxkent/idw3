import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  StepNumbers,
  StepDescription,
  StepActions,
  StepMessage,
} from "../components";
import queryString from "query-string";

const Wrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  display: flex;
  width: 350px;
  height: 350px;
  background: #454947;
`;

const Main = styled.main`
  background: #dcdfdb50;
  grid-column: span 2 / span 2;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NextButton = styled.button`
  display: flex;
  background: "ECECEC";
  color: "#ffffff" : "#000000";
  border: "1px solid #000000";
  outline: 0;
  font-family: Consolas, monaco, monospace;
  padding: 10px 20px;
  font-size: 22px;
  letter-spacing: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

export const Plugin = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const { openIdw3 } = queryString.parse(window.location.search);

  const steps = [
    "SWAP QUOTATION",
    "CONFIRM SWAP",
    "PAY PROPRIETOR",
    "CONFIRMATION",
  ];

  const handleStepChange = (step: number) => {
    setStep(step);
  };

  return !openIdw3 ? null : (
    <Wrapper>
      <Main>
        <StepNumbers step={step} steps={steps} onChange={handleStepChange} />
        <Body>
          <>
            <StepDescription title={steps[step]} />
            {step > 0 ? null : (
              <>
                <StepMessage step={step} />
                <StepActions step={step} />
              </>
            )}
            <NextButton onClick={() => setStep(step + 1)}>Next</NextButton>
          </>
        </Body>
      </Main>
    </Wrapper>
  );
};
