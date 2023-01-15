import Head from 'next/head'
import { Inter } from '@next/font/google'

import wp1 from "../public/wallpaper1.png";
import wp2 from "../public/wallpaper2.png";
import wp3 from "../public/wallpaper3.png";
import wp4 from "../public/wallpaper4.png";
import { Button, Carousel, Container } from 'react-bootstrap'
import LibrartNavbar from '../components/librart-navbar';


function getImages() {
  return [wp1, wp2, wp3, wp4];
}

/*function alertBrowser() {
  alert("Goril maymun resmi almak, goril zengin olmak");
}*/

const styles = {
  mainText: {
    textShadow: "0px 0px 9px rgba(0, 0, 0, 0.96)",
    bottom: "200px",
    position: "absolute", /* or absolute */
    top: "50%",
    left: "50%",
    /* bring your own prefixes */
    transform: "translate(-50%, -25%)",
    color: "white",
    textAlign: "center",
    fontWeight: "200",
    fontSize: "2.5rem",
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Librart</title>
        <meta name="description" content="Librart v0.1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className={"p-0"}>
        <LibrartNavbar />
        <Carousel className={"w-100 vh-100"} style={{ display: "flex", justifyContent: "center", margin: "auto", marginTop: "-56px" }}>
          {
            getImages().map((image) =>
              <Carousel.Item key={image.src}>
                <img
                  className="d-block overflow-hidden mh-100"
                  src={image.src}
                  alt="First slide"
                />

              </Carousel.Item>
            )
          }
        </Carousel>
        <h3 style={styles.mainText}>Experience digital ownership like never before with our NFT marketplace</h3>
      </Container>
    </>
  )
}