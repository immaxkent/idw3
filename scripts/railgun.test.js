const { entropyToMnemonic, randomBytes } = require("ethers/lib/utils");
const { createRailgunWallet } = require("@railgun-community/quickstart");

// Current block numbers for each chain when wallet was first created.
// If unknown, provide undefined.
async function main() {
	const mnemonic = entropyToMnemonic(randomBytes(16));
	const creationBlockNumberMap = {
		"NetworkName.Ethereum": 15725700,
		"NetworkName.Polygon": 3421400,
	};

	const railgunWallet = await createRailgunWallet(
		"encryptionKey",
		mnemonic,
		creationBlockNumberMap
	);
	console.log(railgunWallet);
	const id = railgunWallet.id;
	console.log(id);
}
// import { loadWalletByID } from '@railgun-community/quickstart';
// const railgunWallet = await loadWalletByID(encryptionKey, id);n

// Execute the deployment script
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
