import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useState, useEffect } from "react";
import Web3 from "web3";
import LibrartNavbar from "../components/librart-navbar";

export default function services() {
  const ipfsLinks = [
    "ipfs://bafkreifwitxipij5mcyk5rrixpqbuhedt7ougltpad443l5fjm64qdxaui",
    "ipfs://bafkreigb73kjn3v4crwt3qvafwy3ob5mg32qaug3lsy5z22sfg2un3me4m",
    "ipfs://bafkreidgx4jixwqhc4kpxbk4mrvozn6nnmfukepbu4inis6dxfpybjwmpy",
    "ipfs://bafkreicyualchaiy4sfyhn3zty3txt6pbq3qu7uctplpzwge3petldqrnq",
    "ipfs://bafkreif6senqko3opjaw4xhsyossyzdmm4lekp2ntl7hfg4aftdb2kifmi",
    "ipfs://bafkreidmrijsp275c4hpeqewxov4ykrb2xxuqte7s6hu5povisqb4lbzqe",
  ];
  // our metamask addresses
  const allContentCreator = ['0x3293c6e7D51c723f73D840dFE44E69F1d6958a9B', '0xca0EeCdD27B5fC165DcC4e48118bDCFCb431E372']
  const user1Collections = ['0xfd9aef1a16cce143a6f12d8608d2633e261e9078', '0xf82d8c8843ec2AB7C70b8c1928c00409d02083c6']
  const user2Collections = ['0x6a40341347BB800b0EB25e77222A00513489A10C', '0x7f7B5BCbCfCAaE022E480b6452AB4cd11eCD5e59'] // thats me
  const maxCollectionVal = 6 // max nft num
  const [selectedAccount, setSelectedAccount] = useState("");
  const [dexContract, setDexContract] = useState("");
  const [nftContract, setNftContract] = useState("");
  const [tokenContract, setTokenContract] = useState("");
  const abiPathDex = require("../public/dex.json");
  const abiPathNft = require("../public/TestNFT.json");
  const abiPathToken = require("../public/TestToken.json");
  const contractAddressDex = "0x795035d544D999307e53B8ef1821b2B621e7A795";
  const contractAddressNFT = "0xfD9AEf1a16CcE143A6F12D8608D2633E261e9078";
  const contractAddressToken = "";
  // 0xfD9AEf1a16CcE143A6F12D8608D2633E261e9078 7 nft var
  useEffect(() => {
    initWallet();
    initContract();
  }, []);

  const mint = async (event) => {
    event.preventDefault();
    console.log(event.target.address.value);
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abiPathNft["abi"],
      event.target.address.value
    );
    await ipfsLinks.forEach((link) => {
      contract.methods
        .safeMint(selectedAccount, link)
        .send({ from: selectedAccount })
        .catch((err) => {
          alert(err);
        });
    })
  };

  const initWallet = async () => {
    if (window.ethereum) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setSelectedAccount(accounts[0]);
        });
      return true;
    }
    return false;
  };
  const initContract = async () => {
    if (window.ethereum) {
      let provider = window.ethereum;
      const web3 = new Web3(provider);
      try {
        let cont = new web3.eth.Contract(abiPathDex["abi"], contractAddressDex);
        setDexContract(cont);
        cont = new web3.eth.Contract(abiPathNft["abi"], contractAddressNFT);
        setNftContract(cont);
        cont = new web3.eth.Contract(abiPathToken["abi"], contractAddressToken);
        setTokenContract(cont);
      } catch (err) {
        alert(err);
        return;
      }
    }
  };

  const getName = async (event) => {
    event.preventDefault();
    console.log(event.target.address.value);
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abiPathNft["abi"],
      event.target.address.value
    );
    console.log(await contract.methods.name().call());
    console.log(await contract.methods.symbol().call());
    console.log(await contract.methods.tokenURI(0).call());
  };

  const createDex = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abiPathDex["abi"]);
    contract
      .deploy({ data: abiPathDex["bytecode"] })
      .send({ from: selectedAccount })
      .on("receipt", (receipt) => {
        console.log("Dex address : ", receipt.contractAddress);
        alert(receipt.contractAddress);
      });
  };
  const createNFTcollection = async (event) => {
    event.preventDefault();
    let name = event.target.name.value;
    let symbol = event.target.symbol.value;
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(abiPathNft["abi"]);
    contract
      .deploy({ data: abiPathNft["bytecode"], arguments: [name, symbol] })
      .send({ from: selectedAccount })
      .on("receipt", (receipt) => {
        console.log("nft collection address : ", receipt.contractAddress);
        alert(receipt.contractAddress);
      });
  };
  const createToken = async (event) => {
    event.preventDefault();
    let name = event.target.name.value;
    let symbol = event.target.symbol.value;
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abiPathToken["abi"]);
    contract
      .deploy({ data: abiPathToken["bytecode"], arguments: [name, symbol] })
      .send({ from: selectedAccount })
      .on("receipt", (receipt) => {
        console.log("Token address : ", receipt.contractAddress);
        alert(receipt.contractAddress);
      });
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LibrartNavbar />
      <main>
        <div>
          <button onClick={createDex}>CreateDex</button>
          <form onSubmit={createToken}>
            <input type="text" name="name" />
            <input type="text" name="symbol" />
            <button type="submit">Create Token</button>
          </form>
          <form onSubmit={createNFTcollection}>
            <input type="text" name="name" />
            <input type="text" name="symbol" />
            <button type="submit">Create Nft</button>
          </form>
          <form onSubmit={getName}>
            <input type="text" name="address" />
            <button type="submit">Get Name</button>
          </form>
          <form onSubmit={mint}>
            <input type="text" name="address" />
            <button type="submit">Mint</button>
          </form>

        </div>
        <div>{selectedAccount}</div>
      </main>
    </>
  );
}
