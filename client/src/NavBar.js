import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "./UserContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Icon from "@mdi/react";
import { mdiSitemapOutline, mdiLogout } from "@mdi/js";
import Button from "react-bootstrap/esm/Button";

function NavBar() {
  const { userList, loggedInUser, handlerMap } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container>
        <Navbar.Brand>
          <Button style={brandStyle()} onClick={() => navigate("/")}>
            <Icon path={mdiSitemapOutline} size={1} color={"white"} />
            YIRA
          </Button>
        </Navbar.Brand>
        <Nav>
          <NavDropdown
            title={
              <span style={{color:"white"}}>
                {loggedInUser ? loggedInUser.name : "Přihlaš se"}
              </span>
            }
            drop={"start"}
          >
            {getUserMenuList({ userList, loggedInUser, handlerMap })}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return { backgroundColor: "blue" };
}

function brandStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "white",
  };
}

function getUserMenuList({ userList, loggedInUser, handlerMap }) {
  // temporary solution to enable login/logout
  const userMenuItemList = userList.map((user) => (
    <NavDropdown.Item key={user.id} onClick={() => handlerMap.login(user.id)}>
      {user.name}
    </NavDropdown.Item>
  ));

  if (loggedInUser) {
    userMenuItemList.push(<NavDropdown.Divider key={"divider"} />);
    userMenuItemList.push(
      <NavDropdown.Item
        key={"logout"}
        onClick={() => handlerMap.logout()}
        style={{ color: "red" }}
      >
        <Icon path={mdiLogout} size={0.8} color={"red"} /> {"Odhlas se"}
      </NavDropdown.Item>
    );
  }

  return userMenuItemList;
}

export default NavBar;