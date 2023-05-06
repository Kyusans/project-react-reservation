import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

const AdminDashboard = () => {
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    getEmployee();
  },[])
  const getEmployee = () => {
    const url = sessionStorage.getItem("url") + "users.php";
    const formData = new FormData();
    formData.append("operation", "getEmployee");
    axios({url: url, data: formData, method: "post"})
    .then((res) => {
      if(res.data !== 1){
        setEmployee(res.data);
      }
    })
    .catch((err) => {alert(err.message);});
  }
  return ( 
    <>
      <Container className="mt-3">
        <Table bordered striped hover>
            <thead className="text-center">
              <tr>
                <th>Employee Id</th>
                <th>Employee Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {employee.map((employees, index) => (
                <tr key={index}>
                  <td>{employees.usr_employeeId}</td>
                  <td>{employees.usr_name}</td>
                  <td>{employees.usr_active}</td>
                  <td>
                    {employees.usr_active !== "0" ? (<Button className="btn-danger">Deactivate</Button>) : (<Button>Activate</Button>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      </Container>
    </>
  );
}
 
export default AdminDashboard;