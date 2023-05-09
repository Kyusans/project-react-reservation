import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import AlertScript from "./AlertScript";

const AdminDashboard = () => {
  const [employee, setEmployee] = useState([]);
  const [hasEmployee, setHasEmployee] = useState(false);
  //for alert
	const [showAlert, setShowAlert] = useState(false);
	const [alertVariant, setAlertVariant] = useState("");
	const [alertMessage, setAlertMessage] = useState("");

	function getAlert(variantAlert, messageAlert){
		setShowAlert(true);
		setAlertVariant(variantAlert);
		setAlertMessage(messageAlert);
	}

  const setStatus = (id) => {
    const url = sessionStorage.getItem("url") + "users.php";
    const jsonData = { userId: id, userStatus: 1 };
    const formData = new FormData();
    formData.append("json", JSON.stringify(jsonData));
    formData.append("operation", "setUserStatus");
    axios({ url: url, data: formData, method: "post"})
      .then((res) => {
        if (res.data === 1) {
          getAlert("success","Success!");
          setEmployee((prevEmployee) => prevEmployee.filter((emp) => emp.usr_id !== id));
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  useEffect(() => {
    const getEmployee = () => {
      const url = sessionStorage.getItem("url") + "users.php";
      const formData = new FormData();
      formData.append("operation", "getEmployee");
      axios({ url: url, data: formData, method: "post" })
        .then((res) => {
          if (res.data !== 0) {
            setEmployee(res.data);
            setShowAlert(false);
            setHasEmployee(true);
          }else{
            setHasEmployee(false);
            getAlert("danger", "No employee found");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    };
    getEmployee();
    const intervalId = setInterval(() => {getEmployee();}, 20000);
    return () => clearInterval(intervalId);
  }, [])

  return ( 
    <>
      <Container className="mt-3 text-center">
        <div>
          <Table bordered striped hover>
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Employee Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {hasEmployee && Array.isArray(employee) && employee.map((employees, index) => (
                <tr key={index}>
                  <td>{employees.usr_employeeId}</td>
                  <td>{employees.usr_name}</td>
                  <td>{employees.usr_active}</td>
                  <td>
                    <Button onClick={() => setStatus(employees.usr_id, employees.usr_active)}>Activate</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <AlertScript show={showAlert} variant={alertVariant} message={alertMessage} />
        </div>
      </Container>
    </>
  );
}
export default AdminDashboard;