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
  shadows: {
    textShadow: "0px 0px 9px rgba(0, 0, 0, 0.66)",
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
      <Container fluid>
        <LibrartNavbar />
        <Carousel style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", margin: "auto" }}>
          {
            getImages().map((image) =>
              <Carousel.Item key={image.src}>
                <img
                  className="d-block"
                  src={image.src}
                  alt="First slide"
                  width="100%"
                />
                <Carousel.Caption>
                  <h3 style={styles.shadows}>Experience digital ownership like never before with our NFT marketplace</h3>
                  <p style={styles.shadows}>Join the NFT revolution and own a piece of the digital future</p>
                  {/*<Button onClick={alertBrowser} href='https://i.kym-cdn.com/entries/icons/original/000/036/076/Ride_Wife__Life_Good._0-0_screenshot.jpg'>Buy stupid monkey pictures here</Button>*/}
                </Carousel.Caption>
              </Carousel.Item>
            )
          }
        </Carousel>
      </Container>
    </>
  )
}