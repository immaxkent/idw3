import { Idw3Factory as Idw3FactoryABI } from '../../artifacts/contracts/Idw3Factory.sol/Idw3Factory.json';
import { Idw3Factory } from '../abi-typechain/Idw3Factory';
import { PopulatedTransaction } from '@ethersproject/contracts';
import { validateAddress } from '@railgun-community/cookbook';
import { BaseProvider } from '@ethersproject/providers';
import { Idw3Factory__factory } from '../abi-typechain';

export class Idw3FactoryContract {
  private readonly contract: Idw3Factory;

  constructor(address: string, provider?: BaseProvider) {
    if (!validateAddress(address)) {
      throw new Error('Invalid ERC20 address for contract');
    }
    this.contract = Idw3Factory__factory.connect(address, provider) as Idw3Factory;
  }

  InstantiateIDW3(
    proof: string,
    typeOfId: string,
  ): Promise<PopulatedTransaction> {
    return this.contract.populateTransaction.createIdw3(proof,typeOfId);
  }
}