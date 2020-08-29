import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../Styles/NavBar.css";
import { Auth } from "aws-amplify";

const NavBar = (props) => {
  const [name, setName] = useState({ username: "USER" });
  const [login, setLogin] = useState({ isLogin: false });

  const handleLogout = () => {
    Auth.signOut()
      .then(() => {
        setName({ ...name, username: "USER" });
        setLogin({ isLogin: false });
        props.history.push("/");
      })
      .catch((err) => console.log("SignOut Error: " + err.message));
  };

  // This function will be called first when the page loads.
  // Function is called once.
  useEffect(() => {
    const showUsername = () => {
      Auth.currentAuthenticatedUser()
        .then((response) => {
          console.log(response);
          if (response === null) {
            setName({ ...name, username: "USER" });
          } else {
            setName({
              ...name,
              username: response.attributes["custom:firstName"],
            });
            setLogin({ isLogin: true });
          }
        })
        .catch((err) => console.log("This: " + err.message));
    };

    showUsername();
  }, []);

  // This function is used to determine the items to be displayed in the NavDropdown
  // item. When user is not logged in, login and sign up dispalyed. If the user is
  // logged in, logout is shown.
  const showNavDropdownItem = () => {
    if (login.isLogin === true) {
      return (
        <NavDropdown
          title={name.username.toUpperCase()}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item onClick={handleLogout}>LOGOUT</NavDropdown.Item>
        </NavDropdown>
      );
    } else {
      return (
        <NavDropdown
          title={name.username.toUpperCase()}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item href="/Login">LOGIN</NavDropdown.Item>
          <NavDropdown.Item href="/SignUp">SIGN UP</NavDropdown.Item>
        </NavDropdown>
      );
    }
  };

  return (
    <Navbar bg="white" expand="lg" fixed="top" className="Navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="nav">
          <Nav.Link href="/">HOME</Nav.Link>
          {showNavDropdownItem()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
