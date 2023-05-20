// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "./Idw3.sol";
import "sismo-connect-solidity/SismoLib.sol";

contract Idw3Factory is SismoConnect {
    address[] public deployedIdw3s;
    mapping(address => bool) public idw3Owners;
    mapping(address => address) public idw3s;

    constructor(bytes16 appId) SismoConnect(appId) {}

    function createIdw3(
        bytes calldata sismoConnectResponse,
        string calldata _typeOfId
    ) public payable {
        SismoConnectVerifiedResult memory result = verify({
            responseBytes: sismoConnectResponse,
            // we want users to prove that they own a Sismo Vault
            // and that they are members of the group with the id 0x42c768bb8ae79e4c5c05d3b51a4ec74a
            // we are recreating the auth and claim requests made in the frontend to be sure that
            // the proofs provided in the response are valid with respect to this auth request
            auth: buildAuth({authType: AuthType.VAULT})
            // we also want to check if the signed message provided in the response is the signature of the user's address
            // signature: buildSignature({message: abi.encode(msg.sender)})
        });

        // check on oracalize if the vault id is KYCed
        // Chainlink API

        // if the proofs and signed message are valid, we can take the userId from the verified result
        // in this case the userId is the vaultId (since we used AuthType.VAULT in the auth request)
        // it is the anonymous identifier of a user's vault for a specific app
        // --> vaultId = hash(userVaultSecret, appId)
        uint256 vaultId = SismoConnectHelper.getUserId(result, AuthType.VAULT);

        // Mint the IDW3 account
        address newIdw3 = address(new Idw3(vaultId, _typeOfId));
        idw3Owners[msg.sender] = true;
        idw3s[msg.sender] = newIdw3;
    }

    function evaluateIfUserHasIdw3() public view returns (bool) {
        if (idw3Owners[msg.sender] == true) {
            return true;
        } else {
            return false;
        }
    }
}
