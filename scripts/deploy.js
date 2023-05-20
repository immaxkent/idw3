// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // Deploy Contract1
  const Idw3 = await ethers.getContractFactory("Idw3");
  console.log("Deploying Idw3...");
  const idw3 = await Idw3.deploy(12345, "proprieter");
  await idw3.deployed();
  console.log("Idw3 deployed to:", idw3.address);

  // Deploy Contract2
  const Idw3Factory = await ethers.getContractFactory("Idw3Factory");
  console.log("Deploying Idw3Factory...");
  const idw3Factory = await Idw3Factory.deploy();
  await idw3Factory.deployed();
  console.log("Idw3Factory deployed to:", idw3Factory.address);
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });