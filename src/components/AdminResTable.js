import axios from "axios";
import { useState } from "react";
import { Table } from "react-bootstrap";

const AdminResTable = () => {
  const [reservation, setReservation] = useState([]);

  const getReservation = (reserveType) => {
    const url = sessionStorage.getItem("url");
    const jsonData = {reserveType: reserveType};
    const formData = new FormData();
    formData.append("operation", "getReservation");
    formData.append("json", JSON.stringify(jsonData));
    axios({url: url, data: formData, method: "post"})
    .then((res)=>{res.data !== 0 ? setReservation(res.data) : alert("There is no reservation");})
    .catch((error)=>{alert("There was an unexpected error occured: " + error);})
  }
  return ( 
    <>
      <Table>
        <tr>
          <th>Purpose</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </Table>
    </>
  );
}
 
export default AdminResTable;