import { Container, Pagination, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import LibrartNavbar from "../components/librart-navbar";
import WideCard from "../components/wide-card";
import { useRouter } from 'next/router';
import { getAllCollections } from "../helpers/CollectionHelpers";

export default function collectionList() {
  // component yaratırken parametre ola
  const [collections, setCollections] = useState([]);
  const [page, setPage] = useState(1);
  let items = [];
  const router = useRouter();

  useEffect(() => {
    getAllCollections({creator: router.query.address}).then((res) => {
      setCollections(res);
    });
  }, []);
  
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={() => {
          setPage(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <>
    {console.log(collections)}
      <LibrartNavbar />
          <Container>
            {collections
              .slice(5 * (page - 1), 5 * page)
              .map((element) => (
                <div key={element}>
                  <WideCard element={element} click={() => router.push({pathname:'/nft-list',query:element})} />
                </div>
              ))}
            <Pagination>{items}</Pagination>
          </Container>
    </>
  );
}
