import React from "react";
import "./Navbar.css";

const Navbar = props => <ul className="navbar">{props.children}</ul>;

export default Navbar;