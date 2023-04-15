import { useState } from "react";
import { Card, Container, FloatingLabel, Form, Button } from "react-bootstrap";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  return ( 
    <>
      <Container fluid="md" className="centered">
        <Form>
          <Card className="card-thin border-dark">
            <Card.Body>
              <h2 className="text-center mt-4">Login</h2>
              <Form.Group className="mt-3 mb-3">
                <FloatingLabel label="User Id">
                  <Form.Control type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User Id" autoFocus required/>
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel label="Password">
                  <Form.Control type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                </FloatingLabel>
              </Form.Group>
              
              <Button className="button-large mt-3 big-height" variant="outline-success">Login</Button>
            </Card.Body>
          </Card>
        </Form>
      </Container>
    </>
  );
}
 
export default Login;