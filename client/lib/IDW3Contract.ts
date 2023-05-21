import { Idw3Factory } from "../abi-typechain/Idw3Factory";
import { PopulatedTransaction } from "@ethersproject/contracts";
import { BaseProvider } from "@ethersproject/providers";
import { Contract } from "ethers";
import ABI from "../abi-typechain/Idw3FactoryABI.json";

export class Idw3FactoryContract {
  private readonly contract: Idw3Factory;

  constructor(address: string, provider?: BaseProvider) {
    console.log("provider here", provider);
    this.contract = new Contract(
      address,
      ABI,
      provider as any
    ) as unknown as Idw3Factory;
  }

  InstantiateIDW3(
    proof: string,
    typeOfId: boolean
  ): Promise<PopulatedTransaction> {
    console.log("contract", this.contract);
    console.log("contract", this.contract.populateTransaction);
    return this.contract.populateTransaction.createIdw3(proof, typeOfId);
  }
}
