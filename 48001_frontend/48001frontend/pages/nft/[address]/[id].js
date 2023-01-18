import LibrartNavbar from "../../../components/librart-navbar";
import {getIPFSjson, tokenURI, initDex, getOwnerOf, sell, getNameAndSymbol, getOfferedToken, getOfferedNFT, getLockedNft} from "../../../helpers/web3Helpers";
import { useState, useEffect } from "react";
import {useSelector} from "react-redux";


 function ID({ address, id }) {
  const userAddress = useSelector(state => state.address);
  const [IPFSjson, setIPFSjson] = useState("");
  const [dexContract, setDexContract] = useState("");
  const [price, setPrice] = useState("");
  const [owner, setOwner] = useState("");
  const [collection, setCollection] = useState({});

  useEffect(() => {
      getNameAndSymbol(address).then(res => setCollection(res));
      getLockedNft(address, id).then(res => console.log(res));
      getOfferedNFT(address, id).then(res => console.log(res));
      // getOfferedToken(address, id).then(res => console.log(res));
  }, [])

  useEffect(() => {

      tokenURI(address, id).then((res) => {
          getIPFSjson(res.substring(res.lastIndexOf("/") + 1, res.length)).then(
              (res) => setIPFSjson(res)
          )
      });

      initDex().then((dex) => {
        setDexContract(dex)
        dex.methods.viewofferedNftPrice(address,id).call().then((res) => setPrice(res))
        console.log(price);
        if(price === "") {
            getOwnerOf(address,id).then((res) => setOwner(res))
        }
        else {
            dex.methods.viewofferedNftOwner(address,id).call().then((res) => setOwner(res))
        }
    })
  }, []);

  const sellNft = async (event) => {
    event.preventDefault();
    await sell(userAddress, address,id,event.target.price.value)
  }
  const buy = async (event) => {
    console.log('will do buy')
  }
  return (
    <>
      <LibrartNavbar />
      <img src={IPFSjson.image} />
      <h5>{IPFSjson.name}</h5>
        <p>collection:{collection.name} ({collection.symbol})</p>
        <p>description:{IPFSjson.description}</p>
      <div>price : {price ? 'Not for sale.':price}</div>

        <div>{owner === userAddress? 'You are the owner.': owner}</div>
        {owner === userAddress &&
            <form onSubmit={sellNft}>
            <input type="text" name="price" />
            <button type="submit">sell</button>
        </form>
        }

    </>
  );
}

export default ID;

ID.getInitialProps = async (ctx) => {
    return { ...ctx.query };
}


