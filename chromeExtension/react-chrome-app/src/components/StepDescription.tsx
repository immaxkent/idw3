import styled from "styled-components";

type StepDescriptionProps = {
  title: string;
};

const Heading = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 30px;
  letter-spacing: 5px;
  color: #fff;
  margin: 0;
`;

const Description = styled.p`
  display: flex;
  justify-content: center;
  font-size: 18px;
  letter-spacing: 2px;
  color: #fff;
`;

export const StepDescription = ({
  title,
}: StepDescriptionProps): JSX.Element => {
  return (
    <>
      <Heading>{title}</Heading>
      <Description>Step Description</Description>
    </>
  );
};
