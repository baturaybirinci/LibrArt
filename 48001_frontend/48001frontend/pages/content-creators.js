import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import LibrartNavbar from '../components/librart-navbar';

export default function ContentCreators({data, done}) {
  const Collections = require("../public/collections.json");
  console.log(Collections, Collections["user1Collections"]);
  return (
    <>
    
      <Head>
        <title>Librart</title>
        <meta name="description" content="Librart v0.1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <LibrartNavbar/>
      <div>
        <main>
          {Collections["allContentCreator"].map((addr) => <div key = {addr} >
          <div>{addr}</div>
          </div>)}
        </main>
      </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch("http://127.0.0.1:8000/api/content-creators")
  const data = await response.json()

  return {
    props: {
      data: data,
      done: true,
    }
  }
}