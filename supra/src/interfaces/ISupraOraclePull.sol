// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

interface ISupraOraclePull {
    // Verified price data
    struct PriceData {
        // List of pairs
        uint256[] pairs;
        // List of prices
        // prices[i] is the price of pairs[i]
        uint256[] prices;
        // List of decimals
        // decimals[i] is the decimals of pairs[i]
        uint256[] decimals;
    }

    function verifyOracleProof(
        bytes calldata _bytesProof
    ) external returns (PriceData memory);
}
