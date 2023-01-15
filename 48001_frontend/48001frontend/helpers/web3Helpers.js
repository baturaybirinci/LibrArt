import axios from "axios";
import Web3 from "web3";
import {
  NFT_JSON,
  DEX_JSON,
  TOKEN_JSON,
  TOKEN_URI_ABI,
  NAME_ABI,
  SYMBOL_ABI,
  API_PATH,
} from "../constants";

async function initDex() {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      let cont = new web3.eth.Contract(DEX_JSON["abi"], contractAddressDex);
      return cont;
    } catch (err) {
      alert(err);
      return;
    }
  }
}

async function getIPFSjson(link) {
  try {
    console.log(link);
    const res = await axios.get("https://ipfs.io/ipfs/" + link);
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getNameAndSymbol(address) {
  const WEB3 = new Web3(window.ethereum);
  const contract = new WEB3.eth.Contract([NAME_ABI, SYMBOL_ABI], address);
  let name, symbol;
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
  const WEB3 = new Web3(window.ethereum);
  const contract = new WEB3.eth.Contract([TOKEN_URI_ABI], address);
  let ret;
  await contract.methods
    .tokenURI(id)
    .call()
    .then((res) => {
      ret = res;
    });
    console.log(ret)
  return ret;
}

export { tokenURI, getNameAndSymbol, initWallet, getIPFSjson, initDex };
