// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

interface ISupraSValueFeed {
    struct derivedData {
        int256 roundDifference;
        uint256 derivedPrice;
        uint256 decimals;
    }

    function getDerivedSvalue(
        uint256 pair_id_1,
        uint256 pair_id_2,
        uint256 operation
    ) external view returns (derivedData memory);
}
