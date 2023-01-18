import axios from "axios";
import Web3 from "web3";
import BigNumber from "big-number";
import {
  NFT_JSON,
  DEX_JSON,
  TOKEN_JSON,
  TOKEN_URI_ABI,
  NAME_ABI,
  SYMBOL_ABI,
  API_PATH,
  DEX_ADDRESS,
  OWNER_OF_ABI,
  SELL_NFT_ABI,
  BUY_NFT_ABI,
} from "../constants";
import bigNumber from "big-number";

async function initDex() {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      let cont = new web3.eth.Contract(DEX_JSON["abi"], DEX_ADDRESS);
      return cont;
    } catch (err) {
      alert(err);
      return;
    }
  }
}

async function getIPFSjson(link) {
  try {
    const res = await axios.get("https://ipfs.io/ipfs/" + link);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getOwnerOf(address, id) {
  const WEB3 = new Web3(window.ethereum);
  const contract = new WEB3.eth.Contract([OWNER_OF_ABI], address);
  let owner;
  await contract.methods
    .ownerOf(id)
    .call()
    .then((res) => (owner = res));
  return owner;
}

async function approve(collectionAddress, nftID) {
  const WEB3 = new Web3(window.ethereum);
  const contract = new WEB3.eth.Contract(NFT_JSON["abi"], collectionAddress);
  console.log('aproving')
  await contract.methods
    .approve(DEX_ADDRESS, nftID)
    .send({ from: "0x3293c6e7D51c723f73D840dFE44E69F1d6958a9B" });
}
// async function lock(address, id, price) {
//   console.log(address, id, price);
//   await aprove(address, 0);
//   const WEB3 = new Web3(window.ethereum);
//   const contract = new WEB3.eth.Contract([SELL_NFT_ABI], DEX_ADDRESS);
//   await contract.methods
//     .lock(address, id, price)
//     .send({ from: "0x3293c6e7D51c723f73D840dFE44E69F1d6958a9B" })
//     .then((res) => console.log(res));

// }
async function sell(userAddress, collectionAddress, nftID, price) {
  await approve(collectionAddress, nftID);
  const WEB3 = new Web3(window.ethereum);
  const contract = new WEB3.eth.Contract([SELL_NFT_ABI], DEX_ADDRESS);
  await contract.methods
    .offer(collectionAddress, id, price)
    .send({ from: userAddress })
    .then((res) => console.log(res));
}

async function buy(userAddress, collectionAddress, nftID, price) {
  await approve(collectionAddress, nftID);
  const WEB3 = new Web3(window.ethereum);
  const contract = new WEB3.eth.Contract([BUY_NFT_ABI], DEX_ADDRESS);
  await contract.methods
    .buy(collectionAddress, nftID)
    .send({ from: userAddress, value: price })
    .then((res) => console.log(res));
}

async function getNameAndSymbol(address) {
  const WEB3 = new Web3(window.ethereum);
  const contract = new WEB3.eth.Contract([NAME_ABI, SYMBOL_ABI], address);
  let name, symbol;
  console.log(contract.methods);
  await contract.methods
    .name()
    .call()
    .then((res) => (name = res));
  await contract.methods
    .symbol()
    .call()
    .then((res) => (symbol = res));
  console.log(symbol, name);
  return { name, symbol };
}
async function initWallet() {
  let ret;
  if (window.ethereum) {
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        console.log(accounts);
        ret = accounts[0];
      });
  }
  return ret;
}
async function tokenURI(address, id) {
  console.log(address, id);
  const WEB3 = new Web3(window.ethereum);
  const contract = new WEB3.eth.Contract(NFT_JSON['abi'], address);
  console.log(contract);
  let ret;
  await contract.methods
    .tokenURI(id).call().then((res) => {
      console.log(res);
      ret = res;
    });
  console.log(ret);
  return ret;
}

// returns run out of gas error, if we can fix it, profile is ready
async function getAccountNFTS(address) {
  const WEB3 = new Web3(window.ethereum);
  const contract = new WEB3.eth.Contract(NFT_JSON['abi'], address);
  console.log(contract);
  let ret;
  await contract.methods
    .balanceOf(address).call().then((res) => {
      ret = res;
    });
  console.log(ret);
  return ret;
}

async function mint(userAddress, collectionAddress, nftID, tokenAddress) {
  const web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(DEX_JSON["abi"], DEX_ADDRESS);
  return await contract.methods.mint(collectionAddress, nftID, tokenAddress).send({ from: userAddress });
}

async function unlock(userAddress, collectionAddress, nftID) {
  const web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(DEX_JSON["abi"], DEX_ADDRESS);
  return await contract.methods.unlock(collectionAddress, nftID).send({ from: userAddress });
}

async function lock(userAddress, collectionAddress, nftID, amount) {
  const web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(DEX_JSON["abi"], DEX_ADDRESS);
  return await contract.methods.lock(collectionAddress, nftID, amount).send({ from: userAddress });
}




export {
  tokenURI,
  getNameAndSymbol,
  initWallet,
  getIPFSjson,
  initDex,
  getOwnerOf,
  sell,
  approve,
  getAccountNFTS,
  mint,
  unlock,
  lock
};
