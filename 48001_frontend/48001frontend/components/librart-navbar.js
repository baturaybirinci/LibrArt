import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useRouter } from 'next/router';

function LibrartNavbar() {
  const router = useRouter();
  return (
    <>
    <div style={{height:'4rem'}}></div>
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand onClick={() => router.push('/')} style={{cursor: "pointer"}}>Librart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => router.push('/content-creators')}>Content Creators</Nav.Link>
            <Nav.Link onClick={() => router.push('/services')}>Services</Nav.Link>
            <Nav.Link onClick={() => router.push('/collection-list')}>Collection List</Nav.Link>
            <Nav.Link onClick={() => router.push('/nft-list')}>Nft List</Nav.Link>

            {/* <Nav.Link onClick={() => router.push('/about')}>About</Nav.Link>
            <Nav.Link onClick={() => router.push('/profile')}>Profile</Nav.Link> */}
            {/* <Nav.Link onClick={() => router.push('/collections')}>Collections</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
    );
}

export default LibrartNavbar;