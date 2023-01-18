import { ListGroup, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import LibrartNavbar from "../components/librart-navbar";
import { getAccountNFTS } from "../helpers/web3Helpers";

function Profile() {
    const userAddress = useSelector(state => state.address);
    const user = useSelector(state => state.user);
    getAccountNFTS(userAddress).then(res => {
        console.log(res, "compomnent")
    })

    return (
        <>
            <LibrartNavbar />
            <Container>

                <h1>Welcome {user.data.username}</h1>
                <ListGroup horizontal>
                    <ListGroup>
                        <img src="https://picsum.photos/150" />
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item style={{ height: "50px" }}>Name: {user.data.name}</ListGroup.Item>
                        <ListGroup.Item style={{ height: "50px" }}>Surname: {user.data.last_name}</ListGroup.Item>
                        <ListGroup.Item style={{ height: "50px" }} variant="info">Your address: {user.data.address}</ListGroup.Item>
                    </ListGroup>
                </ListGroup>
            </Container>
        </>
    )
}

export default Profile;
