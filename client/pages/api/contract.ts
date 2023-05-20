import Web3 from "web3";
import contract from "truffle-contract";
import { NextApiResponse, NextApiRequest } from "next";

// import json from "../../../artifacts/test.json";
import artifact from "../../../artifacts/test.json";

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const MyContract = contract(artifact);
MyContract.setProvider(web3.currentProvider);

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const loadContractData = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const instance = await MyContract.deployed();

      // Read contract data or call contract methods
      const data = await instance.getData();
      console.log(data);
    } catch (error) {
      console.error("Error loading contract:", error);
    }
  };

  // Call the loadContractData function when needed
  loadContractData();

  response.status(200).send("All good");
}
