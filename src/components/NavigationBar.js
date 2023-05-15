import { NavLink, Navbar, NavDropdown } from "react-bootstrap";
import "./../index.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  useEffect(() => {
    checkUser();
  }, [])
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigateTo = useNavigate();

  const handleLogOut = () => {
    setTimeout(() => {
      setIsUserLoggedIn(false);
      localStorage.setItem("isLoggedIn", "0");
      localStorage.setItem("userId", "");
      localStorage.setItem("isAdminLoggedIn", "0");
      localStorage.setItem("name", "");
      navigateTo("/");
      window.location.reload();
    }, 800);
  }

  const checkUser = () =>{
    if (localStorage.getItem("isLoggedIn") === "1" || localStorage.getItem("isAdminLoggedIn") === "1") {
      setIsUserLoggedIn(true);
    }else{
      setIsUserLoggedIn(false);
    }
  }

  return (
    <>
      <Navbar className="nav-background" expand="lg" text="light">
        <Navbar.Brand className="brand">Reservation</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="brand" id="basic-navbar-nav">
          <NavLink className="link-text" href="/">Home</NavLink>
          {localStorage.getItem("isAdminLoggedIn") === "1" && <NavLink className="link-text" href="/admin/dashboard">dashboard</NavLink>}
          <NavDropdown title="User" id="basic-nav-dropdown" className="link-text">
            {!isUserLoggedIn ? (
              <NavDropdown.Item onClick={() => navigateTo("/login")}>Login</NavDropdown.Item>) : (
              <>
                {localStorage.getItem("isLoggedIn") === "1" && <><NavDropdown.Item href="/changepassword">Change password</NavDropdown.Item><hr /></> }
                <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
export default NavBar;