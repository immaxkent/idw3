import styled from "styled-components";

type NumberDiscProps = {
  $isActive: boolean;
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  &:after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    content: "";
    height: 6px;
    width: calc(100% - 40px);
    background: #fff;
  }
`;

const NumberDisc = styled.div<NumberDiscProps>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ $isActive }) => ($isActive ? "#ffffff" : "#dfdfdf")};
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  z-index: 1;
  cursor: pointer;
`;

type StepNumbersProps = {
  step: number;
  steps: string[];
  onChange: (step: number) => void;
};

type StepNumberProps = {
  index: number;
  step: number;
  onClick: () => void;
};

export const StepNumbers = ({
  step,
  steps,
  onChange,
}: StepNumbersProps): JSX.Element => (
  <Container>
    {steps.map((_, i) => (
      <StepNumber key={i} index={i} step={step} onClick={() => onChange(i)} />
    ))}
  </Container>
);

const StepNumber = ({ index, step, onClick }: StepNumberProps): JSX.Element => (
  <NumberDisc onClick={onClick} $isActive={step === index}>
    {index + 1}
  </NumberDisc>
);
