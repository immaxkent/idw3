import styled from "styled-components";

type StepMessageProps = {
  step: number;
};

const Container = styled.div`
  padding: 20px;
  margin: 60px 0;
  border: 1px solid #000000;
  border-radius: 5px;
  width: 100%;
`;

export const StepMessage = ({ step }: StepMessageProps): JSX.Element => (
  <Container>message</Container>
);
