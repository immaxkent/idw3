//for the sake of production, we needn't include the deploy script for idw3 as these are instatiated post successful KYC etc
const hre = require("hardhat");

async function main() {

  // Deploy Idw3Factory
  const Idw3Factory = await ethers.getContractFactory("Idw3Factory");
  console.log("Deploying Idw3Factory...");
  const idw3Factory = await Idw3Factory.deploy();
  await idw3Factory.deployed();
  console.log("Idw3Factory deployed to:", idw3Factory.address);

  // Deploy Idw3Bridge
  const Idw3Bridge = await ethers.getContractFactory("Idw3Bridge");
  console.log("Deploying Idw3Bridge...");
  const idw3Bridge = await Idw3Bridge.deploy(idw3Factory.address);
  await idw3Bridge.deployed();
  console.log("Idw3Bridge deployed to:", idw3Bridge.address);

}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });