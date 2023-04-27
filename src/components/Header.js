import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { authActions } from "../store/auth";
import ToggleSwitch from "./ToggleSwitch";
import { expenseActions } from "../store/expenses";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.expenses.isPremium);
  const darkMode = useSelector((state) => state.expenses.darkMode);

  const handleChange = () => {
    dispatch(expenseActions.setMode());
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    dispatch(authActions.logout());
    dispatch(expenseActions.hidePremium());
    navigate("/");
  };

  return (
    <Navbar color={darkMode ? "dark" : "light"} expand='md'>
      <NavbarBrand>
        Welcome to Expense Tracker!!!{" "}
        {isPremium && (
          <h3>
            <i>Premium</i>
          </h3>
        )}
      </NavbarBrand>
      {isPremium && (
        <ToggleSwitch handleChange={handleChange} checked={darkMode} />
      )}
      <NavbarToggler />
      <div className='float-right'>
        <Collapse navbar>
          <Nav className='ml-auto' navbar>
            <NavItem className='float-right'>
              Your Profile is Incomplete
              <Button color='primary' className='m-2'>
                <NavLink to='/home/complete-profile' className='text-white'>
                  Complete Now
                </NavLink>
              </Button>
            </NavItem>
            <Button color='danger' className='m-2' onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
