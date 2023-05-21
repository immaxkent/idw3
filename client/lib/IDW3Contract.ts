import { Idw3Factory } from "../abi-typechain/Idw3Factory";
import { PopulatedTransaction } from "@ethersproject/contracts";
import { BaseProvider } from "@ethersproject/providers";
import { Idw3Factory__factory } from "../abi-typechain";

export class Idw3FactoryContract {
  private readonly contract: Idw3Factory;

  constructor(address: string, provider?: BaseProvider) {
    this.contract = Idw3Factory__factory.connect(
      address,
      provider
    ) as Idw3Factory;
  }

  InstantiateIDW3(
    proof: string,
    typeOfId: boolean
  ): Promise<PopulatedTransaction> {
    return this.contract.populateTransaction.createIdw3(proof, typeOfId);
  }
}
