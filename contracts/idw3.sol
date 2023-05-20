// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";

contract Idw3 {

string vaultId;
bool pseudoSwitch; 
bool public isSentient;
// uint256[10] public superSet;

    constructor(string memory _vaultId, string memory _typeOfId) {
        vaultId = _vaultId;
        typeOfId = _typeOfId;
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
