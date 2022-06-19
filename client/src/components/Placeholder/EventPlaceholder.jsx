import React from "react";
import { Card, Col, Placeholder, Row } from "react-bootstrap";

/**
 * This component renders the placeholders for event list
 */
class EventPlaceholder extends React.Component {
  render() {
    return [{}, {}, {}, {}].map((event, i) => (
      <Row key={i}>
        <Col>
          <Card className="text-left">
            <Placeholder as={Card.Header} animation="glow">
              <Placeholder xs={2} />
            </Placeholder>

            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={5} />
              </Placeholder>

              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>

              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={5} />
              </Placeholder>

              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={9} />
              </Placeholder>
            </Card.Body>

            <Placeholder as={Card.Footer} animation="glow">
              <Placeholder xs={7} />
            </Placeholder>
          </Card>
        </Col>
      </Row>
    ));
  }
}

export default EventPlaceholder;
