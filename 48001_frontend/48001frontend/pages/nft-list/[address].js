import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { tokenURI, getIPFSjson } from "../../helpers/web3Helpers";
import WideCard from "../../components/wide-card";
import LibrartNavbar from "../../components/librart-navbar";

export default function address({ contractAddress }) {
  const [list, setList] = useState([]);
  const [adr, setAdr] = useState([]);
  let isIterated = false;
  const router = useRouter();



  const iter = async () => {
    if (!isIterated)
      for (let i = 0; i < 5; i++)
        try {
          tokenURI(contractAddress, i).then((res) => {
            console.log(res);
            getIPFSjson(res.substring(res.lastIndexOf("/") + 1, res.length)).then(
              (resp) => {
                console.log(resp)
                setList(list => [...list, resp]);
              }
            )
          });
        } catch {
          console.log("error");
        }
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

address.getInitialProps = async (ctx) => {
  return {
    contractAddress: ctx.query.address,
  };
}
