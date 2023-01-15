import { Container, Pagination, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import LibrartNavbar from "../components/librart-navbar";
import WideCard from "../components/wide-card";
import { useRouter } from "next/router";
import { getAllCollections } from "../helpers/CollectionHelpers";
import Web3 from "web3";

export default function collectionList() {
  // component yaratırken parametre ola
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState([]);
  const router = useRouter();
  const abiPathNft = require("../public/TestNFT.json");

  useEffect(() => {
    getAllCollections({ creator: router.query.address }).then((res) => {
      setCollections(res);
      listCollections(res);
    });
  }, []);

  const getNameAndSymbol = async (address) => {
    console.log(address);
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abiPathNft["abi"], address
    );
    let name, symbol;
    await contract.methods.name().call().then((res) => name = res)
    await contract.methods.symbol().call().then((res) => symbol = res)
    // console.log(name, symbol, "zortr")
    return { name, symbol };
  };

  const listCollections = async (collections) => {
    console.log(collections, "sadjbasja");
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
                router.push({ pathname: "/nft-list", query: {address:element.address} })
              }
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
