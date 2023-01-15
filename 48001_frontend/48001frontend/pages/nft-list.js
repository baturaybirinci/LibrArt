import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { tokenURI } from "../helpers/web3Helpers";
import WideCard from "../components/wide-card";
import LibrartNavbar from "../components/librart-navbar";

export default function nftList() {
  const [list, setList] = useState([]);
  const [adr, setAdr] = useState([]);
  let isIterated = false;
  const router = useRouter();
  const dummyAddress = "0x5f50e2a874b23fd3e3666975fcde6be20e2a52fa";

  const iter = async () => {
    if (!isIterated)
      for (let i = 0; i < 5; i++)
        tokenURI(dummyAddress, i).then((res) => setList(list => [...list, res]));
    isIterated = true;
  };

  useEffect(() => {
    setAdr(router.query.address);
    console.log(router);

    iter();
  }, []);

  return (
    <>
      <LibrartNavbar />
      {console.log(list)}
      <div>
        {list.map((element) => (
          <>
            <WideCard
              click={() =>
                router.push({
                  pathname: "/nft",
                  query: { address: dummyAddress, id: 0 },
                })
              }
              title={"dummy"}
              explanation={"dummy"}
            />
          </>
        ))}
      </div>
    </>
  );
}
