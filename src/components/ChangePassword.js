import axios from "axios";
import { useState } from "react";
import { Card, Form, FloatingLabel, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [validated, setValidated] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigateTo = useNavigate();

  const changePassword = () =>{
    const url = sessionStorage.getItem("url") + "/users.php";
    const userId = localStorage.getItem("userId");
    const jsonData = {userId:userId, oldPassword:oldPassword, newPassword:newPassword};
    const formData = new FormData();
    formData.append("operation", "changePassword");
    formData.append("json", JSON.stringify(jsonData));
    axios({url: url, data: formData, method: "post"})
    .then((res)=>{
      if(res.data === -1){
        alert("Invalid current password");
        setOldPassword("");
      }else if(res.data !== 0){
        alert("success", "Success!");
        setTimeout(() => {navigateTo("/");}, 1000);
      }else{
        alert("invalid password")
      }
    })
    .catch((err)=>{
      alert("There was an error: " + err);
    })
  }
  const formValidation = (e) =>{
    const form = e.currentTarget;
    if(form.checkValidity() === false){
      e.preventDefault();
      e.stopPropagation();
    }else if(newPassword !== confirmPassword){
      alert("confirm password should be thesame");
      setConfirmPassword("");
    }else{
      e.preventDefault();
      e.stopPropagation();
      changePassword();
    }
    setValidated(true);
  }
  if (localStorage.getItem("isLoggedIn") !== "1") {
    navigateTo("/");
  }
  return ( 
    <>
      <Container fluid="md" className="mt-3" >
        <Card border="dark">
          <Card.Header><h3>Change password</h3></Card.Header>
          <Form validated={validated} noValidate onSubmit={formValidation}>
            <Card.Body>
                <FloatingLabel className="mb-4" label="Current password">
                  <Form.Control type="password" placeholder="Current password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} required/>
                </FloatingLabel>
                <FloatingLabel className="mb-4" label="New password">
                  <Form.Control type="password" placeholder="New password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required/>
                </FloatingLabel>
                <FloatingLabel className="mb-4" label="Confirm password">
                  <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                </FloatingLabel>
            </Card.Body>
            <Card.Footer>
              <Container className="text-center"><Button type="submit" variant="outline-primary">Update password</Button></Container>
            </Card.Footer>
          </Form>
        </Card>
      </Container>
    </>
   );
}
export default ChangePassword;