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

export class InstantiateIDW3Step extends Step {
  readonly config: StepConfig = {
    name: "Instantiate IDW3",
    description: "Instantiate IDW3.",
  };

  private readonly proof: string;
  private readonly typeOfId: boolean;

  constructor(proof: string, typeOfId: boolean) {
    super();
    this.proof = proof;
    this.typeOfId = typeOfId;
  }

  protected async getStepOutput(
    input: StepInput
  ): Promise<UnvalidatedStepOutput> {
    const contract = new Idw3FactoryContract(""); // TODO: add address
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
