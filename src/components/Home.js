import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Button, Container, Dropdown } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReservationForm from './ReservationForm';
import ViewSchedule from './ViewSchedule';
import moment from "moment";
import AlertScript from './AlertScript';

function Home() {
  const [reserveType, setReserveType] = useState("");
  const [reserveTypeName, setReserveTypeName] = useState("Select Reservation");  
  const [schedId, setSchedId] = useState("");
  const [events, setEvents] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const openViewModal = () => {setShowViewModal(true);}
  const hideViewModal = () => {setShowViewModal(false);}
  const [showReserveModal, setShowReserveModal] = useState(false);
  const handleOpenReserveModal = () =>{
    if(localStorage.getItem("name") !== "") {
      setShowReserveModal(true);
    }else{
      alert("You need to login first");
    }
  }

  const hideReserveModal = () => {
    getEvents();
    setShowReserveModal(false)
  };

  const getEvents = () => {
    const url = sessionStorage.getItem("url") + "schedule.php";
    const jsonData = {reserveType : reserveType};
    console.log("jsonData: ", JSON.stringify(jsonData));
    const formData = new FormData();
    formData.append("operation", "getReservation");
    formData.append("json", JSON.stringify(jsonData));
    axios({ url: url, data: formData, method: "post" })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        reserveType === "vehicle" ? setReserveTypeName("Vehicle reservation") : setReserveTypeName("Room reservation"); 
        if (res.data !== 0) {
          const eventsData = res.data.map((items) => ({
            id: items.sched_id,
            title: items.sched_title,
            start: items.sched_startDate,
            end: moment(items.sched_endDate).add(1, "days").format("YYYY-MM-DD"),
            color: items.sched_color,
          }));
          setEvents(eventsData);
        }
      })
      .catch((err) => {
        alert("There was an unexpected error: " + err);
      });
  };

  const reserveTypeSet = (type) =>{
    console.log("ang type: " + type);
    setReserveType(type);
    console.log("Reserve type: " + reserveType);
  }

  function handleEventClick(info) {
    setSchedId(info.event.id);
    openViewModal();
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }  

  useEffect(()=>{
    sessionStorage.setItem("url", "http://localhost/reservation/api/");
  }, []);
  return (
    <>
      <Container className="mt-3">
        <Dropdown className="text-center">
          <Dropdown.Toggle>{reserveTypeName}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => reserveTypeSet("vehicle")}>Vehicle Reservation</Dropdown.Item>
            <Dropdown.Item onClick={() => reserveTypeSet("room")}>Room Reservation</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      {reserveType !== "Select Reservation" ?  
      <>
        <Container className="d-flex justify-content-between align-items-center">
          <h1>To-Do List</h1>
          <Button onClick={handleOpenReserveModal}>Add Reservation</Button>
        </Container>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          events={events}
          eventContent={renderEventContent}
          eventClick={handleEventClick} 
        />
      </>: <h5 className="text-center mt-3"><AlertScript show={true} variant={"danger"} message={"Select type of reservation"} /></h5>
      }
      </Container>
      <ReservationForm show={showReserveModal} onHide={hideReserveModal} />
      <ViewSchedule show={showViewModal} onHide={hideViewModal} schedId={schedId} /> 
    </>
  );
}
export default Home;