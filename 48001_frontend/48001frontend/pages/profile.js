import LibrartNavbar from "../components/librart-navbar";
import { Form, Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";


export default function ProfilePage() {

    const [address, setAddress] = useState();
    useEffect(() => {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then((addresses) => {
            setAddress(addresses[0]);
        })
    }, [])


  return (
    <>
      <LibrartNavbar />
      <div>Your Profile</div>
      <Container>
        <Form style={{ width: "25%" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Please enter your name"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" placeholder="Please enter your surname"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder={address} disabled/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
