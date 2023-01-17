import { Card, CardGroup, Button, Container } from "react-bootstrap";
export default function WideCard({ click, title, explanation, imgSrc }) {
  return (
    <>
      <CardGroup>
        <Card style={{ width: "18rem", padding: "10px" }}>
          <Card.Img variant="top" src={imgSrc} style={{width: "250px"}} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              {explanation}
            </Card.Text>
            <Button variant="primary" onClick={ click }>
              Go to collection
            </Button>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
}
