import { Recipe } from "@railgun-community/cookbook";
import { Step } from "@railgun-community/cookbook";
import {
  EmptyTransferBaseTokenStep,
  TransferERC20Step,
} from "@railgun-community/cookbook";
import { RecipeConfig, RecipeERC20Info } from "@railgun-community/cookbook";
import { BaseProvider } from "@ethersproject/providers";

export class MakePaymentIDW3 extends Recipe {
  private readonly businessAddress: string;
  private readonly idw3Address: string;
  private readonly businessAmount: any;
  private readonly idw3Amount: any;
  private readonly erc20Info: RecipeERC20Info;
  private readonly provider: BaseProvider;
  readonly config: RecipeConfig = {
    name: "Empty",
    description: "Empty recipe for testing. Sends 0 tokens to null address.",
  };

  constructor(provider: BaseProvider) {
    super();
    this.provider = provider;
  }

  protected supportsNetwork(): boolean {
    return true;
  }

  protected async getInternalSteps(): Promise<Step[]> {
    return [
      // How to read the existence from factory? Quickstart check will stop the transaction if step fails
      new TransferERC20Step(
        this.businessAddress,
        this.erc20Info,
        this.businessAmount
      ),
      new TransferERC20Step(this.idw3Address, this.erc20Info, this.idw3Amount),
    ];
  }
}
