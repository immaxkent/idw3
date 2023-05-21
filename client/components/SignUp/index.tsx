import SismoSignUp from "./Sismo";
import { useRouter } from "next/router";
import UserTypeSelection from "./UserTypeSelection";
import KYCSignUp from "./KYCSignUp";
import Railgun from "./Railgun";
import Idw3Instantiation from "./Idw3Instantiation";

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
    case "idw3":
      return <Idw3Instantiation />;
    case "completed":
      return <div>I'm done baby</div>;
  }
};

export default SignUp;
