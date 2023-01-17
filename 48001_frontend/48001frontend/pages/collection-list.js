import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import LibrartNavbar from "../components/librart-navbar";
import WideCard from "../components/wide-card";
import { useRouter } from "next/router";
import { getAllCollections } from "../helpers/CollectionHelpers";
import { getNameAndSymbol } from "../helpers/web3Helpers";
export default function collectionList() {
  // component yaratırken parametre ola
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      getAllCollections({ address: router.query.address }).then((res) => {
        console.log(router.query.address)
        setCollections(res);
        listCollections(res);
      });
    }
  }, [router.isReady]);

  const listCollections = async (collections) => {
    let cardList = [];
    const promises = collections.map((element) => {
      return getNameAndSymbol(element.address).then(res => {
        const { name, symbol } = res;
        console.log("yeasda", name, symbol);
        cardList.push(
          <div key={element.address}>
            <WideCard
              explanation={name}
              title={symbol}
              click={() =>
                router.push({ pathname: "/nft-list", query: { 'address': element.address } })
              }
              buttonText={"Browse collection"}
            />
          </div>
        );
      });
    });
    await Promise.all(promises);
    setItems(cardList);
  }

  return (
    <>
      <LibrartNavbar />
      <Container>
        <div>{items}</div>
      </Container>
    </>
  );
}
