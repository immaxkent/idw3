// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "./Idw3.sol";
import "sismo-connect-solidity/SismoLib.sol";
import "chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract Idw3Factory is SismoConnect, ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;
    address[] public deployedIdw3s;
    mapping(address => bool) public idw3Owners;
    mapping(address => address) public idw3s;
    bytes32 private jobId;
    uint256 private fee;

    event RequestVolume(bytes32 indexed requestId, bool volume);

    constructor(bytes16 appId) SismoConnect(appId) ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
        // jobId = "ca98366cc7314957b8c012c72f05aeeb";//uint
        jobId = "c1c5e92880894eb6b27d3cae19670aa3"; //bool
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

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

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestVolumeData() public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        // Set the URL to perform the GET request on
        // req.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");
        req.add("get", "https://thin-lamps-judge.loca.lt/api/mongo");

        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "VOLUME24HOUR": xxx.xxx,
        //     }
        //    }
        //   }
        //  }
        // request.add("path", "RAW.ETH.USD.VOLUME24HOUR"); // Chainlink nodes prior to 1.0.0 support this format
        req.add("sismoId", "123"); // Chainlink nodes 1.0.0 and later support this format

        // Multiply the result by 1000000000000000000 to remove decimals
        // int256 timesAmount = 10 ** 18;
        // req.addInt("times", timesAmount);
        // console.log("Request sent");
        // Sends the request
        return sendChainlinkRequest(req, fee);
    }

    function fulfill(
        bytes32 _requestId,
        bool _volume
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestVolume(_requestId, _volume);
        // volume = _volume;
        // console.log("Request received");
        // console.log(_volume);
    }

    function evaluateIfUserHasIdw3() public view returns (bool) {
        if (idw3Owners[msg.sender] == true) {
            return true;
        } else {
            return false;
        }
    }
}
