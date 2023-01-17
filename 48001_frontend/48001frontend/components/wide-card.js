import { Card, CardGroup, Button, Container } from "react-bootstrap";
export default function WideCard({ click, title, explanation, imgSrc, buttonText="Go to collection" }) {
  return (
    <>
      <CardGroup>
        <Card style={{ width: "18rem", padding: "10px", margin: "1rem 0" }}>
          <Card.Img variant="top" src={imgSrc} style={{width: "250px"}} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              {explanation}
            </Card.Text>
            <Button variant="primary" onClick={ click }>
              {buttonText}
            </Button>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
}
