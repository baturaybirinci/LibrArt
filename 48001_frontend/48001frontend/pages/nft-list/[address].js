import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { tokenURI, getIPFSjson } from "../../helpers/web3Helpers";
import WideCard from "../../components/wide-card";
import LibrartNavbar from "../../components/librart-navbar";

export default function address() {
  const [list, setList] = useState([]);
  const [adr, setAdr] = useState([]);
  let isIterated = false;
  const router = useRouter();

  const dummyAddress = "0x7f7B5BCbCfCAaE022E480b6452AB4cd11eCD5e59";

  const iter = async () => {
    if (!isIterated)
      for (let i = 0; i < 5; i++)
        tokenURI(dummyAddress, i).then((res) => {
          console.log(res);
          getIPFSjson(res.substring(res.lastIndexOf("/") + 1, res.length)).then(
            (resp) => {
              console.log(resp)
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
      {console.log(list)}
      <div>
        {list.map((element, index) => {
          console.log(element);
          return (
              <>
                <WideCard
                    buttonText={"View NFT"}
                    click={() =>
                        router.push(`/nft/${router.query.address}/${index}`)
                    }
                    title={element["name"]}
                    explanation={element["description"]}
                    imgSrc={element["image"]}
                />
              </>
          )
        })}
      </div>
    </>
  );
}
