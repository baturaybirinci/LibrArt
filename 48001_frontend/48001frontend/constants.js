import Web3 from "web3";

export const API_PATH = "http://localhost:8000/api";
export const IPFS_LINKS = [
  "ipfs://bafkreifwitxipij5mcyk5rrixpqbuhedt7ougltpad443l5fjm64qdxaui",
  "ipfs://bafkreigb73kjn3v4crwt3qvafwy3ob5mg32qaug3lsy5z22sfg2un3me4m",
  "ipfs://bafkreidgx4jixwqhc4kpxbk4mrvozn6nnmfukepbu4inis6dxfpybjwmpy",
  "ipfs://bafkreicyualchaiy4sfyhn3zty3txt6pbq3qu7uctplpzwge3petldqrnq",
  "ipfs://bafkreif6senqko3opjaw4xhsyossyzdmm4lekp2ntl7hfg4aftdb2kifmi",
  "ipfs://bafkreidmrijsp275c4hpeqewxov4ykrb2xxuqte7s6hu5povisqb4lbzqe",
];
export const NFT_JSON = require("./public/TestNFT.json");
export const DEX_JSON = require("./public/dex.json");
export const TOKEN_JSON = require("./public/TestToken.json");
export const NAME_ABI = {
  inputs: [],
  name: "name",
  outputs: [
    {
      internalType: "string",
      name: "",
      type: "string",
    },
  ],
  stateMutability: "view",
  type: "function",
};
export const SYMBOL_ABI = {
  inputs: [],
  name: "symbol",
  outputs: [
    {
      internalType: "string",
      name: "",
      type: "string",
    },
  ],
  stateMutability: "view",
  type: "function",
};
export const TOKEN_URI_ABI = {
  inputs: [
    {
      internalType: "uint256",
      name: "tokenId",
      type: "uint256",
    },
  ],
  name: "tokenURI",
  outputs: [
    {
      internalType: "string",
      name: "",
      type: "string",
    },
  ],
  stateMutability: "view",
  type: "function",
};
export const OWNER_OF_ABI = {
  inputs: [
    {
      internalType: "uint256",
      name: "tokenId",
      type: "uint256",
    },
  ],
  name: "ownerOf",
  outputs: [
    {
      internalType: "address",
      name: "",
      type: "address",
    },
  ],
  stateMutability: "view",
  type: "function",
};
export const SELL_NFT_ABI = {
  inputs: [
    {
      internalType: "address",
      name: "adr",
      type: "address",
    },
    {
      internalType: "uint256",
      name: "id",
      type: "uint256",
    },
    {
      internalType: "uint256",
      name: "price",
      type: "uint256",
    },
  ],
  name: "offer",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
};
export const BUY_NFT_ABI = {
  inputs: [
    {
      internalType: "address",
      name: "adr",
      type: "address",
    },
    {
      internalType: "uint256",
      name: "id",
      type: "uint256",
    },
  ],
  name: "buy",
  outputs: [],
  stateMutability: "payable",
  type: "function",
};
export const DEX_ADDRESS = "0x1C341D201E5F29Af0752BD9De68a1d3A46341Fc5";
