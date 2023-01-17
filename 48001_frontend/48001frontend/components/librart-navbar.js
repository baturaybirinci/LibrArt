import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { setUserAddress, logout, login } from '../slices/authSlice';
import { getUser } from '../helpers/UserHelpers';

function LibrartNavbar() {
  const router = useRouter();
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const dispatch = useDispatch();

  const handleAuthentication = async () => {
    if (isAuthenticated) {
      dispatch(logout());
    } else {
      if (window.ethereum) {

        await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            const address = accounts[0];
            dispatch(setUserAddress(address));
            getUser(address).then((user) => {
              if (user) {
                dispatch(login(user));
              }
              else {
                //  hata ekle
              }
            })
          });
      }
    }
  }



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
            <Nav.Link onClick={handleAuthentication}>{isAuthenticated ? "Logout" : "Login"}</Nav.Link>
            <Nav.Link onClick={() => router.push('/profile')}>Profile</Nav.Link>

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
