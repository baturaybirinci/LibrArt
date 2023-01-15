import Web3 from "web3";
import LibrartNavbar from "../components/librart-navbar";
const abiPathNft = require("../public/TestNFT.json");
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { times } from "lodash";

export default function nftList() {
  const [list, setList] = useState([]);
  const [adr, setAdr] = useState([]);
  const Collections = require("../public/collections.json");
  let items = [];

  const router = useRouter();
  
  const web3 =  new Web3(window.ethereum);
  const contract =  new web3.eth.Contract(abiPathNft["abi"], '0x5f50e2a874b23fd3e3666975fcde6be20e2a52fa');

  const iter = async (i) => {

    const res = await contract.methods.tokenURI(i).call()
    console.log(res)
    return res;
  };
   useEffect(() => {
    setAdr(router.query.address)
    for(let i = 0; i < 5; i++){
      iter(i).then((res) => setList([...list,res])
      );
    }
  });
  iter();
  return (
    <>
      <LibrartNavbar />
      <div>{list.map((element) => (
        <div>{element}</div>
      ))}</div>
    </>
  );
}
