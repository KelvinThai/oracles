// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ISupraOraclePull.sol";
import "./interfaces/ISupraSValueFeed.sol";

// Mock contract which can consume oracle pull data
contract MockOracleClient is Ownable {
    /// @notice The oracle contract
    ISupraOraclePull public supra_pull;
    ISupraSValueFeed public supra_storage;
    uint256 public dPrice;
    uint256 public dDecimal;
    int256 public dRound;

    // Event emitted when a pair price is received
    event PairPrice(uint256 pair, uint256 price, uint256 decimals);

    constructor(
        ISupraOraclePull oracle_,
        ISupraSValueFeed storage_
    ) Ownable(msg.sender) {
        supra_pull = oracle_;
        supra_storage = storage_;
    }

    // Verify price updates recieved with Supra pull contract
    function GetPairPrice(
        bytes calldata _bytesProof,
        uint256 pair
    ) external returns (uint256) {
        ISupraOraclePull.PriceData memory prices = supra_pull.verifyOracleProof(
            _bytesProof
        );
        uint256 price = 0;
        uint256 decimals = 0;
        for (uint256 i = 0; i < prices.pairs.length; i++) {
            if (prices.pairs[i] == pair) {
                price = prices.prices[i];
                decimals = prices.decimals[i];
                break;
            }
        }
        require(price != 0, "Pair not found");
        return price;
    }

    //  Get the Derived Pair Price using two pair from oracle data
    // Input parameter for "Operation" would be,  Multiplication=0 and Division=1

    function GetDerivedPairPrice(
        bytes calldata _bytesProof,
        uint256 pair_id_1,
        uint256 pair_id_2,
        uint256 operation
    ) external {
        supra_pull.verifyOracleProof(_bytesProof);
        ISupraSValueFeed.derivedData memory dp = ISupraSValueFeed(supra_storage)
            .getDerivedSvalue(pair_id_1, pair_id_2, operation);
        dPrice = dp.derivedPrice;
        dDecimal = dp.decimals;
        dRound = dp.roundDifference;
    }

    function updatePullAddress(ISupraOraclePull oracle_) external onlyOwner {
        supra_pull = oracle_;
    }

    function updateStorageAddress(
        ISupraSValueFeed storage_
    ) external onlyOwner {
        supra_storage = storage_;
    }
}
