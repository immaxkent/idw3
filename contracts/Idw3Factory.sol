// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "./Idw3.sol";

contract Idw3Factory {
    address[] public deployedIdw3s;
    mapping(address => bool) public idw3Owners;
    mapping(address => address) public idw3s;

    modifier hasPassedKyc(bytes32 _address) {
        //implement ORACALIZE here
        _;
    }

    function createIdw3(string memory _vaultId, string memory _typeOfId)
        public
        payable
        hasPassedKyc(keccak256(abi.encodePacked(msg.sender)))
    {
        address newIdw3 = address(new Idw3(_vaultId, _typeOfId));
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
