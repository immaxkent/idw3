import styled from "styled-components";
import Button from "./Button";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 360px;
  text-align: start;
`;

export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const SubmitButton = styled(Button)`
  margin: 0 auto;
`;
