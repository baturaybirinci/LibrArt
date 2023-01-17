import LibrartNavbar from "../../../components/librart-navbar";
import { getIPFSjson, tokenURI,initDex,getOwnerOf,initWallet, sell } from "../../../helpers/web3Helpers";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


 function ID({ address, id }) {
  const [IPFSjson, setIPFSjson] = useState("");
  const [dexContract, setDexContract] = useState("");
  const [price, setPrice] = useState("");
  const [owner, setOwner] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");

  useEffect(() => {
    initWallet().then((res) => setSelectedAccount(res));

    if (address && id) {
      tokenURI(address, id).then((res) =>
        getIPFSjson(res.substring(res.lastIndexOf("/") + 1, res.length)).then(
          (res) => setIPFSjson(res)
        )
      );
    }
    initDex().then((res) => {
        setDexContract(res)
        res.methods.viewofferedNftPrice(address,id).call().then((res) => setPrice(res))
        console.log(price);
        if(price === "")
            getOwnerOf(address,id).then((res) => setOwner(res))
        else
            res.methods.viewofferedNftOwner(address,id).call().then((res) => setOwner(res))
    })
  }, []);
  const sellNft = async (event) => {
    event.preventDefault();
    console.log(event)
    await sell(address,id,event.target.price.value)
  }
  const buy = async (event) => {
    console.log('will do buy')
  }
  return (
    <>
      <LibrartNavbar />
      <img src={IPFSjson.image} />
      <div>DUMMY YAZI</div>
      <div>price : {price? 'doesnt sell':price}</div>
        <div>{owner === selectedAccount? 'IT IS YOU': owner}</div>
      <form onSubmit={sellNft}>
        <input type="text" name="price" />
        <button type="submit">sell</button>
      </form>
    </>
  );
}

export default ID;

ID.getInitialProps = async (ctx) => {
    return { ...ctx.query };
}



