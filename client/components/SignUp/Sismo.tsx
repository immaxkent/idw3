import {
  SismoConnectButton, // the Sismo Connect React button displayed below
  SismoConnectClientConfig, // the client config with your appId
  AuthType, // the authType enum, we will choose 'VAULT' in this tutorial
  SismoConnectResponse,
  ClaimType, // the claimType enum, we will choose 'GTE' in this tutorial, to check that the user has a value greater than a given threshold
} from "@sismo-core/sismo-connect-react";
import { useRouter } from "next/router";

import styled from "styled-components";
import Container from "../Atoms/Container";

// you can create a new Sismo Connect app at https://factory.sismo.io
// The SismoConnectClientConfig is a configuration needed to connect to Sismo Connect and requests data from your users.
// You can find more information about the configuration here: https://docs.sismo.io/build-with-sismo-connect/technical-documentation/sismo-connect-react

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: process.env.NEXT_PUBLIC_SISMO_APP_ID,
  devMode: {
    enabled: true,
  },
};

const ButtonContainer = styled.div`
  & button {
    margin: 0 auto;
  }
`;

const SismoSignUp = () => {
  const router = useRouter();
  const { pathname, query } = router;

  return (
    <Container>
      <div>Great! First of all lets create or log in to your Sismo vault</div>
      <ButtonContainer>
        <SismoConnectButton
          // the client config created
          config={sismoConnectConfig}
          // request a proof of account ownership
          // (here Vault ownership)
          auth={{ authType: AuthType.VAULT }}
          // request a message signature
          signature={{ message: "Your message" }}
          //  a response containing his proofs
          onResponse={async (response: SismoConnectResponse) => {
            //Send the response to your server to verify it
            //thanks to the @sismo-core/sismo-connect-server package
            console.log("received sismo response", response);
            console.log("VaultId", response.proofs[0].auths[0].userId);
            const vaultId = response.proofs[0].auths[0].userId;

            await fetch("api/mongo", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                sismoId: vaultId,
              }),
            });

            router.push({
              pathname,
              query: {
                ...query,
                step: "userType",
                sismoId: vaultId,
              },
            });
          }}
          onResponseBytes={async (bytes: string) => {
            //Send the response to your contract to verify it
            //thanks to the @sismo-core/sismo-connect-solidity package
            // console.log("received sismo response bytes", bytes);
          }}
        />
      </ButtonContainer>
    </Container>
  );
};

export default SismoSignUp;
