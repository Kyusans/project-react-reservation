import { NavLink, Navbar} from "react-bootstrap";
import "./../index.css";
import { useState } from "react";
import Login from "./Login";

function NavBar() {
  console.log("nav now Local Storage: " + localStorage.getItem("isLoggedIn"));
  const [showLoginModal, setShowLoginModal] = useState(false);
  const openLoginModal = () =>{setShowLoginModal(true);}
  const closeLoginModal = () =>{setShowLoginModal(false);}
  const handleLogOut = () => {
    localStorage.setItem("isLoggedIn", 0);
    setTimeout(() => {window.location.reload();}, 800);
  }
  return (
    <>
      <Navbar className="nav-background" expand="lg" text="light">
          <Navbar.Brand className="brand">Reservation</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav "/>
          <Navbar.Collapse className="brand" id="basic-navbar-nav">
          <NavLink className="link-text" href="/">Home</NavLink>
          {localStorage.getItem("isLoggedIn") !== "1" ? (<NavLink className="link-text ms-auto" onClick={openLoginModal}>Login</NavLink>) 
            :(<NavLink className="link-text ms-auto" onClick={handleLogOut}>Logout</NavLink>)
          }

          </Navbar.Collapse>
      </Navbar>
      <Login show={showLoginModal} onHide={closeLoginModal} />
    </>
  );
}

export default NavBar;
