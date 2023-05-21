import styled from "styled-components";
import queryString from "query-string";

type StepMessageProps = {
  step: number;
};

const Container = styled.div`
  padding: 5px;
  margin: 10px 0;
  border: 1px solid #000000;
  border-radius: 5px;
  width: 100%;
`;

export const StepMessage = ({ step }: StepMessageProps): JSX.Element => {
  const { price } = queryString.parse(window.location.search);
  return <Container>Price to pay: {price}</Container>;
};
