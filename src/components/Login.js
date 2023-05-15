import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, FloatingLabel, Form, Button } from "react-bootstrap";
import AlertScript from "./AlertScript";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [showInvalid, setShowInvalid] = useState(false);
  const navigateTo = useNavigate();
  //for alert
	const [showAlert, setShowAlert] = useState(false);
	const [alertVariant, setAlertVariant] = useState("");
	const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if(localStorage.getItem("isAdminLoggedIn") === "1"){
      navigateTo("/admin/dashboard");
    }else if(localStorage.getItem("isLoggedIn") === "1"){
      navigateTo("/");
    }
  },[navigateTo])

	function getAlert(variantAlert, messageAlert){
		setShowAlert(true);
		setAlertVariant(variantAlert);
		setAlertMessage(messageAlert);
	}
  const login = () =>{
    const url = sessionStorage.getItem("url") + "/users.php";
    const jsonData = {empId:empId, password:password};
    const formData = new FormData();
    formData.append("operation", "login");
    formData.append("json", JSON.stringify(jsonData));
    axios({url: url, data: formData, method: "post"})
    .then((res)=>{
      setShowInvalid(false);
      if(res.data === 0){
        setTimeout(() => {setShowInvalid(true);}, 300);
      }else if(res.data[0].usr_level === "100"){
        getAlert("success", "Welcome back Admin!");
        localStorage.setItem("isAdminLoggedIn", "1");
        localStorage.setItem("userId", res.data[0].usr_id);
        localStorage.setItem("name", res.data[0].usr_name);
        setTimeout(()=>{window.location.reload();}, 1250);
 
      }else{
        getAlert("success", "Success!");
        localStorage.setItem("isLoggedIn", "1");
        localStorage.setItem("userId", res.data[0].usr_id);
        localStorage.setItem("name", res.data[0].usr_name);
        setTimeout(()=>{window.location.reload();}, 1250);
      }

    })
    .catch((err)=>{
      getAlert("There was an error: " + err);
    })
  }
  return (
    <>
      <Container className="w-50 mt-2 text-center">
        <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
      </Container>
      <Container fluid="md" className="centered">
        <Form className="text-center">
          <Card className="card-thin border-dark">
            <Card.Body>
              <h2 className="text-center mt-5">Login</h2>
              <Form.Group className="mt-3 mb-3">
                <FloatingLabel label="User Id">
                  <Form.Control type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} placeholder="User Id" autoFocus required/>
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel label="Password">
                  <Form.Control type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                </FloatingLabel>
                {showInvalid && <Form.Text className="text-danger">Invalid login credentials</Form.Text>}
              </Form.Group><hr />
              <Button className="button-large mt-2 big-height" variant="outline-success" onClick={login}>Login</Button>
            </Card.Body>
          </Card>
        </Form>
      </Container>
    </>
  );
}
 
export default Login;