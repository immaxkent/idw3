import styled from "styled-components";

type StepActionsProps = {
  step: number;
};

type ButtonProps = {
  $outlined?: boolean;
};

const Container = styled.div`
  padding: 20px 0;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const Button = styled.button<ButtonProps>`
  display: flex;
  background: ${({ $outlined }) => ($outlined ? "transparent" : "ECECEC")};
  color: ${({ $outlined }) => ($outlined ? "#ffffff" : "#000000")};
  border: ${({ $outlined }) => ($outlined ? "1px solid #000000" : 0)};
  outline: 0;
  font-family: Consolas, monaco, monospace;
  padding: 10px 20px;
  font-size: 22px;
  letter-spacing: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

export const StepActions = ({ step }: StepActionsProps): JSX.Element => {
  return (
    <Container>
      <Button $outlined>ETH</Button>
      <Button>USDT</Button>
      <Button>WBTC</Button>
    </Container>
  );
};
