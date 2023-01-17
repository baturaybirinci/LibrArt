import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import LibrartNavbar from "../../components/librart-navbar";
import WideCard from "../../components/wide-card";
import { useRouter } from "next/router";
import { getAllCollections } from "../../helpers/CollectionHelpers";
import { getNameAndSymbol } from "../../helpers/web3Helpers";


 function Address({address, collections}) {
  const router = useRouter();
  const [collectionData, setCollectionData] = useState([]);

  useEffect(() => {
      getCollectionData().then((data) => setCollectionData((data)));
  }, []);

  const getCollectionData = async () => {
      let data = [];
      for (let collection of collections) {
          await getNameAndSymbol(collection.address).then((res) => data.push({...res, address}));
      }
      return data;
  }

  return (
    <>
      <LibrartNavbar />
      <Container>
          {collectionData.map(({ name, symbol, address }) => (
              <div key={`${address}-${name}-${symbol}`}>
                  <WideCard
                      explanation={name}
                      title={symbol}
                      click={() =>
                          router.push(`/nft-list/${address}`)
                      }
                  />
              </div>
          ))}
      </Container>
    </>
  );
}


export default Address;


export async function getServerSideProps(context) {
    const {address} = context.query;
    const collections = await getAllCollections({ address });
    return {
        props: { address, collections }, // will be passed to the page component as props
    }
}
