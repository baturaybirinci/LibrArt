import Head from "next/head";
import { Container } from "react-bootstrap";
import LibrartNavbar from "../components/librart-navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import WideCard from "../components/wide-card";
import { getAllUsers } from "../helpers/UserHelpers";
import { add } from "lodash";

export default function ContentCreators() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers(true).then((res) => {
      setUsers(res);
      console.log(res)
    });
  }, []);
  const router = useRouter();
  return (
    <>
      <LibrartNavbar />
      <Container>
        {users.map((element) => (
          <div key={element.address}>
            <WideCard
              title={element.name + " " + element.last_name}
              explanation={element.address}
              click={() =>
                router.push({ pathname: "/collection-list", query: element.address })
              }
            />
          </div>
        ))}
      </Container>
    </>
  );
}
