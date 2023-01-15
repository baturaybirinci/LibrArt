import LibrartNavbar from "../components/librart-navbar";
import { getIPFSjson, tokenURI } from "../helpers/web3Helpers";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
export default function nft() {
  const router = useRouter();
  const [adr, setAdr] = useState([]);
  const [id, setId] = useState([]);
  const [IPFSjson, setIPFSjson] = useState('')
  const dummyAddress = '0x5f50e2a874b23fd3e3666975fcde6be20e2a52fa'

  useEffect(() => {
    setAdr(router.query.address);
    setId(router.query.id);
    if(adr && id ){
        tokenURI(dummyAddress, 0).then((res) => getIPFSjson(res.substring(res.lastIndexOf('/')+1,res.length)).then((res) => setIPFSjson(res)));
    }
  }, [adr,id]);

  return (
    <>
      <LibrartNavbar />
      <img src={IPFSjson.image}/>
      <div>DUMMY YAZI</div>
    </>
  );
}
