import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Button, Container, Dropdown } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReservationForm from './ReservationForm';
import ViewSchedule from './ViewSchedule';
import moment from "moment";

function Home() {
  const [reserveNum, setReserveNum] = useState(0);
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
    const jsonData = {reserveNum};
    const formData = new FormData();
    formData.append("operation", "getSchedule");
    formData.append("json", JSON.stringify(jsonData));
    axios({ url: url, data: formData, method: "post" })
      .then((res) => {
        console.log(JSON.stringify(res.data)); 
        const eventsData = res.data.map((items) => ({
          id: items.sched_id,
          title: items.sched_title,
          start: items.sched_startDate,
          end: moment(items.sched_endDate).add(1, "days").format("YYYY-MM-DD"),
          color: items.sched_color,
        }));
        setEvents(eventsData);
      })
      .catch((err) => {
        alert("There was an unexpected error: " + err);
      });
  };
  
  function handleEventClick(info) {
    setSchedId(info.event.id);
    openViewModal();
  };
  
  function handleReservationView(num){
    setReserveNum(num);
    getEvents();
  }

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
          <Dropdown.Toggle>Reservations</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleReservationView(1)}>Vehicle Reservation</Dropdown.Item>
            <Dropdown.Item onClick={() => handleReservationView(2)}>Room Reservation</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {reserveNum === 0 ? <h1>Pick a reservation first</h1>:
        (<>
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
        </>)
        } 
      </Container>
      <ReservationForm show={showReserveModal} onHide={hideReserveModal} />
      <ViewSchedule show={showViewModal} onHide={hideViewModal} schedId={schedId} />
    </>
  );
}
export default Home;