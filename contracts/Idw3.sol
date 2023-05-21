// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";

contract Idw3 {
    uint256 public vaultId;
    bool pseudoSwitch; // is this the correct place to implement this?
    bool typeOfId;
    uint256[] public superSet;

    constructor(uint256 _vaultId, bool _typeOfId) {
        vaultId = _vaultId;
        typeOfId = _typeOfId;
        pseudoSwitch = false;
    }

    function addSuperSet(uint256[] memory _superSet) public {
        superSet = _superSet;
    }

    function modifyPseudoSwitch() public {
        pseudoSwitch = !pseudoSwitch;
    }

    fallback() external payable {}

    receive() external payable {}
}
