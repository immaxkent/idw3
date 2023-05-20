import SismoSignUp from "./Sismo";
import { useRouter } from "next/router";
import { useState } from "react";
import UserTypeSelection from "./UserTypeSelection";
import KYCSignUp from "./KYCSignUp";

const SignUp = () => {
  const { query } = useRouter();

  switch (query.step) {
    case "sismo":
      return <SismoSignUp />;
    case "userType":
      return <UserTypeSelection />;
    case "kyc":
      return <KYCSignUp />;
  }
};

export default SignUp;
