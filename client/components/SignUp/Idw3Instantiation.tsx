import { InstantiateIDW3 } from "../../lib/instantiateIDW3";
import Container from "../Atoms/Container";

import { SismoConnect } from "@sismo-core/sismo-connect-client";
import { sismoConnectConfig } from "./Sismo";
import { useRouter } from "next/router";

import { ethers } from "ethers";
import {
  NetworkName,
  serializeUnsignedTransaction,
  deserializeTransaction,
} from "@railgun-community/shared-models";
import {
  gasEstimateForUnprovenCrossContractCalls,
  generateCrossContractCallsProof,
  populateProvedCrossContractCalls,
} from "@railgun-community/quickstart";

const Idw3Instantiation = () => {
  const router = useRouter();
  const { pathname, query } = router;

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

    // const { gasEstimateString } =
    //   await gasEstimateForUnprovenCrossContractCalls(
    //     "",
    //     unshieldERC20Amounts,
    //     "",
    //     shieldERC20Addresses,

    //     crossContractCallsSerialized
    //   );

    // await generateCrossContractCallsProof(
    //   unshieldERC20Amounts,
    //   shieldERC20Addresses,
    //   crossContractCallsSerialized
    // );
    const { serializedTransaction } = await populateProvedCrossContractCalls(
      NetworkName.Ethereum,

      unshieldERC20Amounts,
      shieldERC20Addresses,
      crossContractCallsSerialized
    );

    // Submit transaction to RPC.
    const transaction = deserializeTransaction(serializedTransaction);
    await wallet.sendTransaction(transaction);
  };

  return <Container></Container>;
};

export default Idw3Instantiation;
