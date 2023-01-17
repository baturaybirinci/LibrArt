import LibrartNavbar from "../components/librart-navbar";
import { Form, Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser, signUp} from "../helpers/UserHelpers";
import {useRouter} from "next/router";
import {login} from "../slices/authSlice";


 function Register() {
    const router = useRouter();


    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }


    const dispatch = useDispatch();
    const address = useSelector(state => state.address);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        getUser(address).then((user) => {
            if (user) {
                dispatch(login(user));
                router.push("/profile");
            }
    })


     const getFormData = async () => {
         const user = await signUp({name, last_name: surname, address, user_type: 'IN', username});
         if (!user) {
             alert("Register error! Please try again.");
         }
         else {
             dispatch(login(user));
             await router.push("/profile");
         }
     }


    return (
        <div className={"d-flex flex-column justify-content-center align-items-center"}>
            <LibrartNavbar />
            <h1 className={"my-2"}>Register</h1>
            <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem'}}>
                <Form style={{ width: "25%", }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Please enter your username" onChange={handleUsernameChange}/>
                    </Form.Group>
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
                        Register
                    </Button>
                </Form>
            </Container>
        </div>
    );
}


export default Register;
