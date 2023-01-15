import Web3 from "web3";
import LibrartNavbar from "../components/librart-navbar";
const abiPathNft = require("../public/TestNFT.json");
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function nftList() {
  const [list, setList] = useState([]);
  const [adr, setAdr] = useState([]);
  const Collections = require("../public/collections.json");
  let items = [];
  let isIterated = false
  const router = useRouter();

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(
    abiPathNft["abi"],
    "0x5f50e2a874b23fd3e3666975fcde6be20e2a52fa"
  );

  const iter = async () => {
    if(!isIterated){
    for (let i = 0; i < 5; i++) {
      contract.methods
        .tokenURI(i)
        .call()
        .then((res) => {
          console.log(res)
          setList((list) => [...list, res]);
        });
    }}
    contract.methods.exists(5).call().then((exists) => {
      if(exists){
          console.log("NFT ID exists in the contract");
      }else{
          console.log("NFT ID does not exist in the contract");
      }
  });
  
  
  
    isIterated = true
  };
  useEffect(() => {
    setAdr(router.query.address);
    iter();

  }, []);

  return (
    <>
      <LibrartNavbar />
      <div>
        <div>
          {list.length}
        </div>
        {list.map((element) => (
          <div>{element}</div>
        ))}
      </div>
    </>
  );
}
