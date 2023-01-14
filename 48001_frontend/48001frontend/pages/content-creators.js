import Head from 'next/head'
import {Container, Pagination} from 'react-bootstrap'
import LibrartNavbar from '../components/librart-navbar';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import WideCard from '../components/wide-card';
import { getAllUsers } from '../helpers/UserHelpers';

export default function ContentCreators() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    getAllUsers(true).then((res) => {
      setUsers(res);
    })
  }, [])

  let items = [];
  if(users){
    console.log(users)
  }
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
            {users.map((element) => (
                <div key={element}>
                  <WideCard element={element} click={() => router.push({pathname:'/collection-list',query:element})} />
                </div>
              ))}
            <Pagination>{items}</Pagination>
          </Container>

    </>
  )
}
