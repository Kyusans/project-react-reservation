import axios from "axios";
import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AlertScript from "./AlertScript";

const ScheduleForm = (props) => {
  const {show, onHide} = props;
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [color, setColor] = useState('blue');
  const [validated, setValidated] = useState(false);
  
  //for alert
	const [showAlert, setShowAlert] = useState(false);
	const [alertVariant, setAlertVariant] = useState("");
	const [alertMessage, setAlertMessage] = useState("");
  function getAlert(variantAlert, messageAlert){
		setShowAlert(true);
		setAlertVariant(variantAlert);
		setAlertMessage(messageAlert);
	}

  const formValidation = (e) =>{
    const form = e.currentTarget;

    if(form.checkValidity() === false){
      e.preventDefault();
      e.stopPropagation();
    }else if(startDate === null || endDate === null){
      e.preventDefault();
      e.stopPropagation();
      getAlert("danger", "Please fill in start and end date")
    }else{
      e.preventDefault();
      e.stopPropagation();
      addSchedule();
    }
    setValidated(true);
  }

  const addSchedule = () =>{
    const url = sessionStorage.getItem("url") + "schedule.php";
    const jsonData = {name: name, description: description, startDate: startDate, endDate: endDate, title: title, color: color}
    const formData = new FormData();
    formData.append("json", JSON.stringify(jsonData));
    formData.append("operation", "addSchedule");
    axios({url: url, data: formData, method: "post"})
    .then((res) =>{
      if(res.data === 1){
        getAlert("success", "Schedule saved!");
        setTimeout(() => {
          handleOnHide();
        }, 500);
      }else{
        getAlert("danger", "The selected dates conflict with an existing schedule.");
      }
    })
    .catch((err)=>{
      getAlert("danger", "There was an unexpected error: " + err);
    })
  }

  function handleOnHide(){
    setShowAlert(false);
    setTitle("");
    setName("");
    setDescription("");
    setValidated(false);
    onHide();
  }
  
  return ( 
    <>
      <Modal show={show} onHide={handleOnHide}>
        <Modal.Header>
          <h3>Add Reservation</h3>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={formValidation}>

        <Modal.Body>
        <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
        <Form.Group className="mt-1 mb-3">
            <FloatingLabel label="Schedule Title">
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Schedule Title" autoFocus required/>
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mt-1 mb-3">
            <FloatingLabel label="Name">
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel label="Description">
              <Form.Control 
                className="form-control textarea" 
                as="textarea" 
                type="text" 
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                maxLength={2000}
                style={{ height: '100px' }}
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="color-dropdown">
              <Form.Select aria-label="Default select example" value={color} onChange={(event) => setColor(event.target.value)} required defaultValue="" >
                <option value="">Select a color</option>
                <option value="#000000">Black</option>
                <option value="#ff0000">Red</option>
                <option value="#00ff00">Green</option>
                <option value="#0000ff">Blue</option>
                <option value="#ffff00">Yellow</option>
                <option value="#ffa500">Orange</option>
                <option value="#800080">Purple</option>
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group>
            <Row>
              <Col>
                <Form.Label>Start date:</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  dateFormat="yyyy/MM/dd"
                />
              </Col>
              <Col>
                <Form.Label>End date:</Form.Label>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  dateFormat="yyyy/MM/dd"
                />
              </Col>
            </Row>     
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer>
          <Button onClick={handleOnHide} variant="outline-secondary">Close</Button>
          <Button type="submit" variant="outline-primary">Submit</Button>
        </Modal.Footer>

        </Form>
      </Modal>
    </>
  );
}
 
export default ScheduleForm;