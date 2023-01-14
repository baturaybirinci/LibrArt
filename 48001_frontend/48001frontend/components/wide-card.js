import { Card, CardGroup, Button, Container } from "react-bootstrap";
export default function WideCard({ element, click,name,symbol,isCollection }) {
  return (
    <>
      <CardGroup>
        <Card style={{ width: "18rem", padding: "10px" }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>{element}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary" onClick={ click }>
              Go somewhere
            </Button>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
}
