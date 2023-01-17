import Head from "next/head";
import { useState, useEffect } from "react";
import Web3 from "web3";
import LibrartNavbar from "../components/librart-navbar";
import { getNameAndSymbol,initWallet,approve } from "../helpers/web3Helpers";
import { DEX_JSON,NFT_JSON,TOKEN_JSON } from "../constants";
export default function services() {
  // our metamask addresses
  const [selectedAccount, setSelectedAccount] = useState("");
  const [dexContract, setDexContract] = useState("");
  const [nftContract, setNftContract] = useState("");
  const [tokenContract, setTokenContract] = useState("");

  useEffect(() => {
    initWallet().then((res) => setSelectedAccount(res));
    console.log(selectedAccount)
  }, []);

  const mint = async (event) => {
    event.preventDefault();
    console.log(event.target.address.value);
    const contract = new web3.eth.Contract(
      NFT_JSON["abi"],
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


  const initContract = async () => {
    if (window.ethereum) {
      let provider = window.ethereum;
      const web3 = new Web3(provider);
      try {
        let cont = new web3.eth.Contract(abiPathDex["abi"], contractAddressDex);
        setDexContract(cont);
        cont = new web3.eth.Contract(NFT_JSON["abi"], contractAddressNFT);
        setNftContract(cont);
        cont = new web3.eth.Contract(TOKEN_JSON["abi"], contractAddressToken);
        setTokenContract(cont);
      } catch (err) {
        alert(err);
        return;
      }
    }
  };

  const getName = async (event) => {
    event.preventDefault();
    console.log(getNameAndSymbol(event.target.address.value))
  };

  const createDex = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(DEX_JSON["abi"]);
    contract
      .deploy({ data: DEX_JSON["bytecode"] })
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

    const contract = new web3.eth.Contract(NFT_JSON["abi"]);
    contract
      .deploy({ data: NFT_JSON["bytecode"], arguments: [name, symbol] })
      .send({ from: selectedAccount })
      .on("receipt", (receipt) => {
        console.log("id collection address : ", receipt.contractAddress);
        alert(receipt.contractAddress);
      });
  };
  const mintToken = async(event) => {
    event.preventDefault();
    let toAddress = event.target.toaddress.value;
    let address = event.target.address.value;
    let amount = event.target.amount.value;
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(TOKEN_JSON["abi"],address);
    console.log(contract.methods)
    await contract.methods
    .mint(toAddress,amount)
    .send({ from: selectedAccount })
  }
  const createToken = async (event) => {
    event.preventDefault();
    let name = event.target.name.value;
    let symbol = event.target.symbol.value;
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(TOKEN_JSON["abi"]);
    contract
      .deploy({ data: TOKEN_JSON["bytecode"], arguments: [name, symbol] })
      .send({ from: selectedAccount })
      .on("receipt", (receipt) => {
        console.log("Token address : ", receipt.contractAddress);
        alert(receipt.contractAddress);
      });
  };
  const approveNft = async (event) => {
    event.preventDefault()
    console.log(event)
      await approve(event.target.address.value,0)
  }
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
          <form onSubmit={approveNft}>
            <input type="text" name="address" />
            <button type="submit">approve</button>
          </form>
          <form onSubmit={mintToken}>
          <input type="text" name="toaddress" />
          <input type="text" name="address" />
            <input type="number" name="amount" />
            <button type="submit">approve</button>
          </form>

        </div>
        <div>{selectedAccount}</div>
      </main>
    </>
  );
}
