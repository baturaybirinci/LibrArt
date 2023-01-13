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
