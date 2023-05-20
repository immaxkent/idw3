// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "./Idw3.sol";

contract Idw3Factory {

    address[] public deployedIdw3s;
    mapping(address => address[]) public idw3sByOwner;

    function createIdw3(string memory _vaultId, string memory _typeOfId) public payable {
        address newIdw3 = address(new Idw3(_vaultId, _typeOfId));
        deployedIdw3s.push(newIdw3);
        idw3sByOwner[msg.sender].push(newIdw3);
    }

    function evaluateKYCAndVault() public view returns (bool) {
        return true;
    }

}