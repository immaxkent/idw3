import SentientKYC from "./SentientKYC";
import ProprietorKYC from "./ProprietorKYC";

const KYCSignUp = ({
  sismoId,
  userType,
}: {
  sismoId: string;
  userType: string;
}) => {
  if (userType === "proprietor") {
    return <ProprietorKYC sismoId={sismoId} />;
  } else {
    return <SentientKYC sismoId={sismoId} />;
  }
};

export default KYCSignUp;
