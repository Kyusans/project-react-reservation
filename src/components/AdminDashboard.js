import { Card } from "react-bootstrap";
import AdminEmpTable from "./AdminEmpTable";

const AdminDashboard = () => {
  return ( 
    <>
      <Card className="w-75 mx-auto mt-3 mb-3" border="dark">
        <Card.Header className="text-center"><h4>Set employee active</h4></Card.Header>
        <Card.Body>
          <AdminEmpTable />
        </Card.Body>
      </Card>

      <Card className="w-75 mx-auto mt-5" border="dark">
        <Card.Header className="text-center"><h4>Set reservation active</h4></Card.Header>
        <Card.Body>
          <AdminEmpTable />
        </Card.Body>
      </Card>
    </>
  );
}
export default AdminDashboard;