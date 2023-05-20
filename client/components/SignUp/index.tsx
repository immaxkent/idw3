import SismoSignUp from "./Sismo";
import { useRouter } from "next/router";
import { useState } from "react";
import UserTypeSelection from "./UserTypeSelection";
import KYCSignUp from "./KYCSignUp";

const SignUp = () => {
  const { query } = useRouter();

  const [sismoId, setSismoId] = useState(null);
  const [userType, setUserType] = useState(null);

  switch (query.step) {
    case "sismo":
      return <SismoSignUp setSismoId={setSismoId} />;
    case "userType":
      return <UserTypeSelection sismoId={sismoId} setUserType={setUserType} />;
    case "kyc":
      return <KYCSignUp sismoId={sismoId} userType={userType} />;
  }
};

export default SignUp;
