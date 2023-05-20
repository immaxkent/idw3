import SentientKYC from "./SentientKYC";
import ProprietorKYC from "./ProprietorKYC";
import { useRouter } from "next/router";

const KYCSignUp = () => {
  const router = useRouter();
  const {
    query: { userType },
  } = router;

  if (userType === "proprietor") {
    return <ProprietorKYC />;
  } else {
    return <SentientKYC />;
  }
};

export default KYCSignUp;
