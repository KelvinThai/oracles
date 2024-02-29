import { WrapperBuilder } from "@redstone-finance/evm-connector";
import { ethers } from "ethers";

const abis = [
  {
    type: "function",
    name: "aggregateValues",
    inputs: [{ name: "values", type: "uint256[]", internalType: "uint256[]" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "extractTimestampsAndAssertAllAreEqual",
    inputs: [],
    outputs: [
      {
        name: "extractedTimestamp",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getAuthorisedSignerIndex",
    inputs: [
      {
        name: "signerAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDataServiceId",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLatestEthPrice",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLatestValueForDataFeed",
    inputs: [{ name: "dataFeedId", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLatestValueWithManualPayload",
    inputs: [
      { name: "dataFeedId", type: "bytes32", internalType: "bytes32" },
      { name: "", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUniqueSignersThreshold",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "validateTimestamp",
    inputs: [
      {
        name: "receivedTimestampMilliseconds",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "view",
  },
  { type: "error", name: "CalldataMustHaveValidPayload", inputs: [] },
  { type: "error", name: "CalldataOverOrUnderFlow", inputs: [] },
  { type: "error", name: "CanNotPickMedianOfEmptyArray", inputs: [] },
  {
    type: "error",
    name: "DataPackageTimestampMustNotBeZero",
    inputs: [],
  },
  {
    type: "error",
    name: "DataPackageTimestampsMustBeEqual",
    inputs: [],
  },
  {
    type: "error",
    name: "EachSignerMustProvideTheSameValue",
    inputs: [],
  },
  { type: "error", name: "EmptyCalldataPointersArr", inputs: [] },
  { type: "error", name: "GetDataServiceIdNotImplemented", inputs: [] },
  { type: "error", name: "IncorrectUnsignedMetadataSize", inputs: [] },
  {
    type: "error",
    name: "InsufficientNumberOfUniqueSigners",
    inputs: [
      {
        name: "receivedSignersCount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "requiredSignersCount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  { type: "error", name: "InvalidCalldataPointer", inputs: [] },
  {
    type: "error",
    name: "RedstonePayloadMustHaveAtLeastOneDataPackage",
    inputs: [],
  },
  {
    type: "error",
    name: "SignerNotAuthorised",
    inputs: [
      {
        name: "receivedSigner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "TimestampFromTooLongFuture",
    inputs: [
      {
        name: "receivedTimestampSeconds",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "blockTimestamp",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "TimestampIsTooOld",
    inputs: [
      {
        name: "receivedTimestampSeconds",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "blockTimestamp",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
];
async function getPrice() {
  const address = "0x4D92F10A23E28AB11d2d39325B9db0Fd0504520d";
  const mockClient = new ethers.Contract(
    address,
    abis,
    new ethers.providers.JsonRpcProvider(
      "https://blast-sepolia.blockpi.network/v1/rpc/public"
    )
  );
  const wrappedContract = WrapperBuilder.wrap(
    mockClient
  ).usingSimpleNumericMock({
    mockSignersCount: 10,
    dataPoints: [{ dataFeedId: "ETH", value: 1000 }],
  });

  const price = await wrappedContract.getLatestValueForDataFeed(
    ethers.utils.formatBytes32String("ETH")
  );
  console.log("eth", price);
}

getPrice();
