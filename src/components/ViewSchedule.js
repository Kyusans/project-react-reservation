import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Modal, Container } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function ViewSchedule(props) {
  const [schedule, setSchedule] = useState([]);
  const {show, onHide, schedId} = props;

  useEffect(() => {
    if(show){
      const getSelectedSchedule = () =>{
        const url = sessionStorage.getItem("url") + "schedule.php";
        const jsonData = {schedId: schedId}
        const formData = new FormData();
        formData.append("json", JSON.stringify(jsonData));
        formData.append("operation", "getSelectedSchedule");
        axios({url: url, data: formData, method: "post"})
          .then((res) =>{
            if(res.data !== 0){
              setSchedule(res.data);
            }else{
              console.log("Selected Schedule res: " + res.data);
            }
          })
          .catch((err)=>{
            alert("There was an unexpected error: " + err);
          })
      }
      getSelectedSchedule();
    }
  }, [schedId, show])
  
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header><h3>{schedule.sched_title}</h3></Modal.Header>
        <Modal.Body>
          <Container className="d-flex justify-content-between align-items-center w-75 mb-3">
            <div>{schedule.sched_startDate}</div>
            <FontAwesomeIcon icon={faArrowRight} size="lg" color="#000" />
            <div>{schedule.sched_endDate}</div>
          </Container>
          <Card border="dark">
            <Card.Body>
              {schedule.sched_description}
            </Card.Body>
          </Card>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="outline-secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewSchedule