// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/MockOracleClient.sol";
import "../src/interfaces/ISupraOraclePull.sol";
import "../src/interfaces/ISupraSValueFeed.sol";

contract MockOracleClientS is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        ISupraOraclePull pull = ISupraOraclePull(
            0x391Ab9ad5C4BFee04eA508b0a0Cf499198D015e3
        );
        ISupraSValueFeed storageSupra = ISupraSValueFeed(
            0x6Cd59830AAD978446e6cc7f6cc173aF7656Fb917
        );
        vm.startBroadcast(deployerPrivateKey);
        new MockOracleClient(pull, storageSupra);
        vm.stopBroadcast();
    }
}
