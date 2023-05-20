// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";

contract Idw3 {

string vaultId;
bool pseudoSwitch; 
bool public isSentient;
// uint256[10] public superSet;

// modifier mustBeProprietor() {
//     require(isSentient, "This Idw3 is not a Sentient. Only Proprietors can add a SuperSet.");
//     _;
// }

// modifier mustBeSentient() {
//     require(!isSentient, "This Idw3 is not a Proprietor. Only Sentients can use Pseudo Identities.");
//     _;
// }

constructor(string memory _vaultId, bool _isSentient) {
    vaultId = _vaultId;
    isSentient = _isSentient;
    pseudoSwitch = false;
}

// function addSuperSet(uint256[] memory _superSet) public mustBeProprietor() {
//     //should take an array of integers and add them to the superSet array
//     superSet = _superSet;
// }

function getVaultId() public view returns (string memory) {
    return vaultId;
}

function modifyPseudoSwitch() public payable {
    pseudoSwitch = !pseudoSwitch;
}

fallback() external payable {}
receive() external payable {}
    
}
