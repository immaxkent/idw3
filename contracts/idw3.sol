// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";

contract Idw3 {

string vaultId;
bool pseudoSwitch; // is this the correct place to implement this?
string typeOfId;

constructor(string memory _vaultId, string memory _typeOfId) {
    vaultId = _vaultId;
    typeOfId = _typeOfId;
    pseudoSwitch = false;
}

function getVaultId() public view returns (string memory) {
    return vaultId;
}

function modifyPseudoSwitch() public {
    pseudoSwitch = !pseudoSwitch;
}

fallback() external payable {}
receive() external payable {}
    
}
