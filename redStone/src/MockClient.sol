// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "@redstone-finance/evm-connector/dist/contracts/data-services/MainDemoConsumerBase.sol";

contract MockClient is MainDemoConsumerBase {
    function getLatestEthPrice() public view returns (uint256) {
        bytes32 dataFeedId = bytes32("ETH");
        return getOracleNumericValueFromTxMsg(dataFeedId);
    }

    function getLatestValueForDataFeed(
        bytes32 dataFeedId
    ) public view returns (uint256) {
        return getOracleNumericValueFromTxMsg(dataFeedId);
    }

    function getLatestValueWithManualPayload(
        bytes32 dataFeedId,
        bytes calldata
    ) public view returns (uint256) {
        return getLatestValueForDataFeed(dataFeedId);
    }
}
