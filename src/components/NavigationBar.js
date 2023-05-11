import { NavLink, Navbar, NavDropdown } from "react-bootstrap";
import "./../index.css";
import { useEffect, useState } from "react";
import Login from "./Login";

function NavBar() {
  useEffect(() => {
    checkUser();
  },[])
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const openLoginModal = () =>{setShowLoginModal(true);}
  const closeLoginModal = () =>{setShowLoginModal(false);}

  const handleLogOut = () => {
    setIsUserLoggedIn(false);
    localStorage.setItem("isLoggedIn", "0");
    localStorage.setItem("userId", "");
    sessionStorage.setItem("isAdminLoggedIn", "0");
    setTimeout(() => {window.location.reload();}, 800);
  }

  const checkUser = () =>{
    if (localStorage.getItem("isLoggedIn") === "1" || sessionStorage.getItem("isAdminLoggedIn") === "1") {
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
          <NavDropdown title="User" id="basic-nav-dropdown" className="link-text">
            {!isUserLoggedIn ? (
              <NavDropdown.Item onClick={openLoginModal}>Login</NavDropdown.Item>) : (
              <>
                <NavDropdown.Item href="/changepassword">Change password</NavDropdown.Item><hr />
                <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
      <Login show={showLoginModal} onHide={closeLoginModal} />
    </>
  );
}

export default NavBar;
