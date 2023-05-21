import { Recipe } from "@railgun-community/cookbook";
import { Step } from "@railgun-community/cookbook";
import { RecipeConfig } from "@railgun-community/cookbook";
import { BaseProvider } from "@ethersproject/providers";
import { InstantiateIDW3Step } from "./instantiateStep";

export class InstantiateIDW3 extends Recipe {
  private readonly proof: string;
  private readonly typeOfId: string;

  readonly config: RecipeConfig = {
    name: "Empty",
    description: "Empty recipe for testing. Sends 0 tokens to null address.",
  };

  constructor(
    proof: string,
    typeOfId: string
    // , provider: BaseProvider
  ) {
    super();
    this.proof = proof;
    this.typeOfId = typeOfId;
    // this.provider = provider;
  }

  protected supportsNetwork(): boolean {
    return true;
  }

  protected async getInternalSteps(): Promise<Step[]> {
    return [
      // How to go about calling the factory?
      // follow the erc20 recipe
      new InstantiateIDW3Step(this.proof, this.typeOfId),
    ];
  }
}
