import LibrartNavbar from "../components/librart-navbar";
import { Form, Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";


 function Register() {

    const getFormData = () => {
        console.log(address, name, surname);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleSurnameChange = (event) => {
        setName(event.target.value);
    }

    const [address, setAddress] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    useEffect(() => {
        window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((addresses) => {
                setAddress(addresses[0]);
            });

    }, []);

    return (
        <>
            <LibrartNavbar />
            <div>Your Profile</div>
            <Container>
                <Form style={{ width: "25%" }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Please enter your name" onChange={handleNameChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type="text" placeholder="Please enter your surname" onChange={handleSurnameChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder={address} disabled />
                    </Form.Group>

                    <Button variant="primary" onClick={getFormData}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
}


export default Register;
