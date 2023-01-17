import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { tokenURI, getIPFSjson } from "../helpers/web3Helpers";
import WideCard from "../components/wide-card";
import LibrartNavbar from "../components/librart-navbar";

export default function nftList() {
  const [list, setList] = useState([]);
  const [adr, setAdr] = useState([]);
  let isIterated = false;
  const router = useRouter();
  const dummyAddress = "0x7f7B5BCbCfCAaE022E480b6452AB4cd11eCD5e59";

  const iter = async () => {
    if (!isIterated)
      for (let i = 0; i < 5; i++)
        tokenURI(dummyAddress, i).then((res) => {
          getIPFSjson(res.substring(res.lastIndexOf("/") + 1, res.length)).then(
            (resp) => {
              setList(list => [...list, resp]);
            }
          )
        });
    isIterated = true;
  };

  useEffect(() => {
    setAdr(router.query.address);
    iter();
  }, []);

  return (
    <>
      <LibrartNavbar />
      <>
        {list.map((element) => (
          <div key={element["name"]}>
            <WideCard
              click={() =>
                router.push({
                  pathname: "/nft",
                  query: { address: dummyAddress, id: 0 },
                })
              }
              title={element["name"]}
              explanation={element["description"]}
              imgSrc={element["image"]}
              buttonText={"View NFT"}
            />
          </div>
        ))}
      </>
    </>
  );
}
