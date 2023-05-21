import { InstantiateIDW3 } from "../../lib/instantiateIDW3";
import Container from "../Atoms/Container";

import { SismoConnect } from "@sismo-core/sismo-connect-client";
import { sismoConnectConfig } from "./Sismo";
import { useRouter } from "next/router";

import {
  NetworkName,
  serializeUnsignedTransaction,
  deserializeTransaction,
  TransactionGasDetailsSerialized,
  EVMGasType,
} from "@railgun-community/shared-models";
import { populateProvedCrossContractCalls } from "@railgun-community/quickstart";
import Button from "../Atoms/Button";

const Idw3Instantiation = () => {
  const router = useRouter();
  const {
    pathname,
    query: { railgunWalletId },
  } = router;

  const sismoConnect = SismoConnect(sismoConnectConfig);
  const sismoResponse = sismoConnect.getResponse();
  const proof = sismoResponse.proofs[0].proofData;

  // const provider = new ethers.providers.JsonRpcProvider();

  const instantiateIDW3 = async () => {
    const swap = new InstantiateIDW3(proof, true /*provider*/);

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
      railgunWalletId as string,
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
    console.log(wallet.address)
    try {
      await wallet.sendTransaction(transaction);
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <Container>
      <Button onClick={instantiateIDW3}>init IDW3</Button>
    </Container>
  );
};

export default Idw3Instantiation;
