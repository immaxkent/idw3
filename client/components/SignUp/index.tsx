import SismoSignUp from "./Sismo";
import { useRouter } from "next/router";
import UserTypeSelection from "./UserTypeSelection";
import KYCSignUp from "./KYCSignUp";
import Railgun from "./Railgun";

const SignUp = () => {
  const { query } = useRouter();

  switch (query.step) {
    case "sismo":
      return <SismoSignUp />;
    case "userType":
      return <UserTypeSelection />;
    case "kyc":
      return <KYCSignUp />;
    case "railgun":
      return <Railgun />;
  }
};

export default SignUp;
