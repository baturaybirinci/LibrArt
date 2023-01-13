import Head from 'next/head'
import Container from 'react-bootstrap/Container'

export default function ContentCreators({data, done}) {
  return (
    <>
      <Head>
        <title>Librart</title>
        <meta name="description" content="Librart v0.1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <div>
        <main>
          {data.map((element) => <div key = {element.slug}>
            <div>
              <p>Content creator: {element.name}</p>
              <p>Content id: {element.id}</p>
              <p>Content type: {element.creator_type}</p>
              <p>Slug: {element.slug}</p>
              <p>Created at: {element.created_at}</p>
            </div>
            <hr/>
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