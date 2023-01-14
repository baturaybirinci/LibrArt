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
  let items = [];
  const router = useRouter();
  const abiPathNft = require("../public/TestNFT.json");

  useEffect(() => {
    getAllCollections({ creator: router.query.address }).then((res) => {
      setCollections(res);
    });
  }, []);
  const getNameAndSymbol = async (address) => {
    console.log(address);
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      abiPathNft["abi"],address
    );
    let name,symbol;
    await contract.methods.name().call().then((res) => name = res)
    await contract.methods.symbol().call().then((res) => symbol = res)
    return [name,symbol];
  };


  return (
    <>
      <LibrartNavbar />
      <Container>
        {collections.map((element) => (
          <div key={element.address}>
            <WideCard
              element={element.address}
              isCollection = {true}
              name = {getNameAndSymbol(element.address)[0]}
              symbol = {getNameAndSymbol(element.address)[1]}
              click={() =>
                router.push({ pathname: "/nft-list", query: element.address })
              }
            />
          </div>
        ))}
      </Container>
    </>
  );
}
