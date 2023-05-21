import {
  RecipeERC20AmountRecipient,
  RecipeERC20Info,
  StepConfig,
  StepInput,
  UnvalidatedStepOutput,
} from "@railgun-community/cookbook";
import { Step } from "@railgun-community/cookbook";
import { PopulatedTransaction } from "@ethersproject/contracts";
import { Idw3FactoryContract } from "./IDW3Contract";
import { BaseProvider } from "@ethersproject/providers";

export class InstantiateIDW3Step extends Step {
  readonly config: StepConfig = {
    name: "Instantiate IDW3",
    description: "Instantiate IDW3.",
  };

  private readonly proof: string;
  private readonly typeOfId: boolean;
  private readonly provider: BaseProvider;

  constructor(proof: string, typeOfId: boolean, provider: BaseProvider) {
    super();
    this.proof = proof;
    this.typeOfId = typeOfId;
    this.provider = provider;
  }

  protected async getStepOutput(
    input: StepInput
  ): Promise<UnvalidatedStepOutput> {
    const contract = new Idw3FactoryContract(
      "0x5E5713a0d915701F464DEbb66015adD62B2e6AE9",
      this.provider
    );

    console.log("proof", this.proof);
    console.log("typeOfId", this.typeOfId);

    const populatedTransactions: PopulatedTransaction[] = [
      await contract.InstantiateIDW3(this.proof, this.typeOfId),
    ];

    return {
      populatedTransactions,
      outputERC20Amounts: [],
      spentERC20Amounts: [],
      spentNFTs: [],
      outputNFTs: input.nfts,
      feeERC20AmountRecipients: [],
    };
  }
}
