import {Nav,Navbar,Container} from 'react-bootstrap';

function LibrartNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">librart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/link">collections</Nav.Link>
            <Nav.Link href="/link">nfts</Nav.Link> */}
            <Nav.Link href="/content-creators">Content Creators</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/services">Services</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LibrartNavbar;