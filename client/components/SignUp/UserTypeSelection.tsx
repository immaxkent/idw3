import styled from "styled-components";
import Button from "../Atoms/Button";
import Container from "../Atoms/Container";
import { useRouter } from "next/router";

const ButtonContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-evenly;
  margin: 0 auto;
`;

const Spacer = styled.div`
  width: 16px;
`;

const UserTypeSelection = ({
  sismoId,
  setUserType,
}: {
  sismoId: string;
  setUserType: (type: string) => void;
}) => {
  const router = useRouter();
  const { pathname, query } = router;

  const handleSelection = async (userType: string) => {
    await fetch("api/mongo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sismoId,
        userType,
      }),
    });
    setUserType(userType);

    router.push({
      pathname,
      query: {
        ...query,
        step: "kyc",
      },
    });
  };

  return (
    <Container>
      <p>Which type of user are you?</p>
      <ButtonContainer>
        <Button onClick={() => handleSelection("sentient")}>Sentient</Button>
        <Spacer />
        <Button onClick={() => handleSelection("proprietor")}>
          Properieter
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default UserTypeSelection;
