import Container from "../Atoms/Container";
import {
  initialize,
  getSnarkProver,
  loadEthereumNetwork,
} from "../../lib/railgunEngine";
import {
  createRailgunWallet,
  gasEstimateForUnprovenCrossContractCalls,
  generateCrossContractCallsProof,
} from "@railgun-community/quickstart";
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
import { Wallet } from "@ethersproject/wallet";
import { ethers } from "ethers";

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

    setRailgunWallet(railgunWallet);
  };

  const sismoConnect = SismoConnect(sismoConnectConfig);
  const sismoResponse = sismoConnect.getResponse();
  const proof = sismoResponse.proofs[0].proofData;

  const instantiateIDW3 = async () => {
    const ethersWallet = Wallet.fromMnemonic(
      "test test test test test test test test test test test junk"
    );

    const fallbackProvider = await loadEthereumNetwork();
    // console.log("provider out of loadeth", fallbackProvider);

    const provider = new ethers.providers.JsonRpcProvider(
      "https://mainnet.infura.io/v3/907216bd3d954504821de1a9df6756fc"
    );
    const swap = new InstantiateIDW3(proof, true, provider as any);

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

    console.log("railgunWallet", railgunWallet);

    const originalGasDetailsSerialized: TransactionGasDetailsSerialized = {
      evmGasType: EVMGasType.Type2, // Depends on the chain (BNB uses type 0)
      gasEstimateString: "0x00", // Always 0, we don't have this yet.
      maxFeePerGasString: "0x100000", // Current gas Max Fee
      maxPriorityFeePerGasString: "0x010000", // Current gas Max Priority Fee
    };

    const { gasEstimateString } =
      await gasEstimateForUnprovenCrossContractCalls(
        NetworkName.Ethereum,
        railgunWallet.railgunWalletInfo.id,
        process.env.NEXT_PUBLIC_RAILGUN_ENCRYPTION_KEY,
        [],
        [],
        [],
        [],
        crossContractCallsSerialized,
        originalGasDetailsSerialized,
        undefined,
        true
      );
    console.log("gasEstimateString", gasEstimateString);
    const gasDetailsSerialized: TransactionGasDetailsSerialized = {
      evmGasType: EVMGasType.Type2, // Depends on the chain (BNB uses type 0)
      gasEstimateString: gasEstimateString, // Output from gasEstimateForDeposit
      maxFeePerGasString: "0x100000", // Current gas Max Fee
      maxPriorityFeePerGasString: "0x010000", // Current gas Max Priority Fee
      // maxFeePerGasString: "0xfff", // Current gas Max Fee
      // maxPriorityFeePerGasString: "0xfff", // Current gas Max Priority Fee
    };

    const gcccp = await generateCrossContractCallsProof(
      NetworkName.Ethereum,
      railgunWallet.railgunWalletInfo.id,
      process.env.NEXT_PUBLIC_RAILGUN_ENCRYPTION_KEY,
      [],
      [],
      [],
      [],
      crossContractCallsSerialized,
      undefined,
      true,
      undefined,
      () => console.log("I'm doine")
    );
    console.log(gcccp, "gcccp");
    const { error } = gcccp;

    console.log(error, "error");

    const cccs = await populateProvedCrossContractCalls(
      NetworkName.Ethereum,
      railgunWallet.railgunWalletInfo.id,
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

    console.log("cccs", cccs);

    const { serializedTransaction } = cccs;

    console.log("serializedTransaction", serializedTransaction);
    // Submit transaction to RPC.
    const transaction = deserializeTransaction(
      serializedTransaction,
      1000000,
      1
    );
    console.log(ethersWallet);
    const signedTransaction = await ethersWallet.signTransaction(transaction);
    console.log(ethersWallet.address);
    console.log("balance", await provider.getBalance(ethersWallet.address));
    await fallbackProvider.sendTransaction(signedTransaction);
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
