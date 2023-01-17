import LibrartNavbar from "../components/librart-navbar";
import { getIPFSjson, tokenURI,initDex,getOwnerOf,initWallet, sell } from "../helpers/web3Helpers";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
export default function nft() {
  const router = useRouter();
  const [adr, setAdr] = useState([]);
  const [id, setId] = useState([]);
  const [IPFSjson, setIPFSjson] = useState("");
  const [dexContract, setDexContract] = useState("");
  const [price, setPrice] = useState("");
  const [owner, setOwner] = useState("");
  const dummyAddress = "0x3293c6e7D51c723f73D840dFE44E69F1d6958a9B";
  const [selectedAccount, setSelectedAccount] = useState("");

  useEffect(() => {
    initWallet().then((res) => setSelectedAccount(res));
    setAdr(router.query.address);
    setId(router.query.id);
    if (adr && id) {
      tokenURI(dummyAddress, 0).then((res) =>
        getIPFSjson(res.substring(res.lastIndexOf("/") + 1, res.length)).then(
          (res) => setIPFSjson(res)
        )
      );
    }
    initDex().then((res) => {
        setDexContract(res)
        res.methods.viewofferedNftPrice(dummyAddress,0).call().then((res) => setPrice(res))
        console.log(price);
        if(price == 0)
            getOwnerOf(dummyAddress,0).then((res) => setOwner(res))
        else 
            res.methods.viewofferedNftOwner(dummyAddress,0).call().then((res) => setOwner(res))
    })
  }, []);
  const sellNft = async (event) => {
    event.preventDefault();
    console.log(event)
    await sell(dummyAddress,0,event.target.price.value)
  }
  const buy = async (event) => {
    console.log('will do buy')
  }
  // const lockNft = async (event) => {
  //   event.preventDefault();
  //   console.log(event)
  //   await lock(dummyAddress,0,event.target.amount.value)
  // }
  return (
    <>
      <LibrartNavbar />
      <img src={IPFSjson.image} />
      <div>DUMMY YAZI</div>
      <div>price : {price? 'doesnt sell':price}</div>
        <div>{owner === selectedAccount? 'IT IS YOU':owner}</div>
      <form onSubmit={sellNft}>
        <input type="text" name="price" />
        <button type="submit">sell</button>
      </form>
      {/* <form onSubmit={lock}>
        <input type="text" name="amount" />
        <button type="submit">lock</button>
      </form> */}
      
    </>
  );
}
