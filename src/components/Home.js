import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReservationForm from './ReservationForm';
import ViewSchedule from './ViewSchedule';
import moment from "moment";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [schedId, setSchedId] = useState("");
  const [events, setEvents] = useState([]);
  const navigateTo = useNavigate();
  const [showViewModal, setShowViewModal] = useState(false);
  const openViewModal = () => {setShowViewModal(true);}
  const hideViewModal = () => {setShowViewModal(false);}

  const [showReserveModal, setShowReserveModal] = useState(false);
  const openReserveModal = () => {setShowReserveModal(true)};
  const hideReserveModal = () => {
    getEvents();
    setShowReserveModal(false)
  };

  const getEvents = () => {
    const url = sessionStorage.getItem("url") + "schedule.php";
    const formData = new FormData();
    formData.append("operation", "getSchedule");
    axios({ url: url, data: formData, method: "post" })
      .then((res) => {
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
  useEffect(()=>{
    sessionStorage.setItem("url", "http://localhost/reservation/api/");
    sessionStorage.getItem("isAdminLoggedIn") === "1" ? navigateTo("/admin/dashboard") : getEvents();
    
  }, [navigateTo]);

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  return (
    <>
      <Container className="mt-3">
        <Container className="d-flex justify-content-between align-items-center">
          <h1>To-Do List</h1>
          <Button onClick={openReserveModal}>Add Reservation</Button>
        </Container>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          events={events}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
        />
      </Container>
      <ReservationForm show={showReserveModal} onHide={hideReserveModal} />
      <ViewSchedule show={showViewModal} onHide={hideViewModal} schedId={schedId} />
    </>
  );
}
export default Home;