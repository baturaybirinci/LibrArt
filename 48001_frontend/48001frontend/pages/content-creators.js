import Head from "next/head";
import { Container } from "react-bootstrap";
import LibrartNavbar from "../components/librart-navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import WideCard from "../components/wide-card";
import { getAllUsers } from "../helpers/UserHelpers";

export default function ContentCreators({users}) {

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
                router.push(`/collection-list/${element.address}`)
              }
              buttonText={"Browse Collections"}
            />
          </div>
        ))}
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
    const users = await getAllUsers({ is_creator: true });
    return {
        props: {
            users,
        }
    }
}
