import Container from "../Atoms/Container";
import { initialize, getSnarkProver } from "../../lib/railgunEngine";
import { createRailgunWallet } from "@railgun-community/quickstart";
import Button from "../Atoms/Button";
import {
  NetworkName,
  serializeUnsignedTransaction,
  deserializeTransaction,
  TransactionGasDetailsSerialized,
  EVMGasType,
} from "@railgun-community/shared-models";
import { useRouter } from "next/router";
import { useState } from "react";
import { SismoConnect } from "@sismo-core/sismo-connect-client";
import { sismoConnectConfig } from "./Sismo";
import { InstantiateIDW3 } from "../../lib/instantiateIDW3";
import { populateProvedCrossContractCalls } from "@railgun-community/quickstart";

const Railgun = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { sismoId } = query;

  const [railgunWallet, setRailgunWallet] = useState(null);

  initialize();

  // getSnarkProver();

  const handleCreateWallet = async () => {
    // Current block numbers for each chain when wallet was first created.
    // If unknown, provide undefined.
    const creationBlockNumberMap = {
      [NetworkName.Ethereum]: 15725700,
      [NetworkName.Polygon]: 3421400,
    };

    const railgunWallet = await createRailgunWallet(
      process.env.NEXT_PUBLIC_RAILGUN_ENCRYPTION_KEY,
      process.env.NEXT_PUBLIC_RAILGUN_MONIC,
      creationBlockNumberMap
    );

    console.log("railgunWallet", railgunWallet.railgunWalletInfo.id);

    await fetch("api/mongo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sismoId,
        railgunWalletId: railgunWallet.railgunWalletInfo.id,
      }),
    });

    router.push({
      pathname,
      query: {
        ...query,
        step: "idw3",
        railgunWalletId: railgunWallet.railgunWalletInfo.id,
      },
    });
  };

  const sismoConnect = SismoConnect(sismoConnectConfig);
  const sismoResponse = sismoConnect.getResponse();
  const proof = sismoResponse.proofs[0].proofData;

  // const provider = new ethers.providers.JsonRpcProvider();

  const instantiateIDW3 = async () => {
    const swap = new InstantiateIDW3(proof, "" /*provider*/);

    // Inputs that will be unshielded from private balance.
    const unshieldERC20Amounts = [];

    const recipeInput = {
      networkName: NetworkName.Ethereum,
      unshieldERC20Amounts,
      erc20Amounts: [],
      nfts: [],
    };
    const { populatedTransactions, erc20Amounts } = await swap.getRecipeOutput(
      recipeInput
    );

    // Outputs to re-shield after the Recipe multicall.
    const shieldERC20Addresses = erc20Amounts.map(
      ({ tokenAddress }) => tokenAddress
    );

    // RAILGUN Quickstart will generate a [unshield -> call -> re-shield] transaction enclosing the Recipe multicall.
    const crossContractCallsSerialized = populatedTransactions.map(
      serializeUnsignedTransaction
    );

    const gasDetailsSerialized: TransactionGasDetailsSerialized = {
      evmGasType: EVMGasType.Type2, // Depends on the chain (BNB uses type 0)
      gasEstimateString: "0x0100", // Output from gasEstimateForDeposit
      maxFeePerGasString: "0x100000", // Current gas Max Fee
      maxPriorityFeePerGasString: "0x010000", // Current gas Max Priority Fee
    };

    const { serializedTransaction } = await populateProvedCrossContractCalls(
      NetworkName.Ethereum,
      railgunWallet.id as string,
      unshieldERC20Amounts,
      [],
      shieldERC20Addresses,
      [],
      crossContractCallsSerialized,
      undefined,
      true,
      undefined,
      gasDetailsSerialized
    );

    // Submit transaction to RPC.
    const transaction = deserializeTransaction(
      serializedTransaction,
      undefined,
      1
    );
    await railgunWallet.sendTransaction(transaction);
  };

  return (
    <Container>
      {!railgunWallet ? (
        <>
          <div>Railgun integration goes here</div>
          <Button onClick={handleCreateWallet}>Integrate me</Button>
        </>
      ) : (
        <Button onClick={instantiateIDW3}>init IDW3</Button>
      )}
    </Container>
  );
};

export default Railgun;
