import Head from 'next/head'
import {Container, Pagination} from 'react-bootstrap'
import LibrartNavbar from '../components/librart-navbar';
import { useState } from "react";
import { useRouter } from 'next/router';
import WideCard from '../components/wide-card';

export default function ContentCreators() {
  const Collections = require("../public/collections.json");
  console.log(Collections, Collections["user1Collections"]);
  const [page, setPage] = useState(1);
  let items = [];
  const router = useRouter();
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
          <LibrartNavbar />
          <Container>
            {Collections["allContentCreator"]
              .slice(5 * (page - 1), 5 * page)
              .map((element) => (
                <div key={element}>
                  <WideCard element={element} click={() => router.push({pathname:'/collection-list',query:element})} />
                </div>
              ))}
            <Pagination>{items}</Pagination>
          </Container>

    </>
  )
}
