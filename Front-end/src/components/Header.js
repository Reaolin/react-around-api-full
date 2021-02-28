import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.svg";

function Header(props) {
	return (
		<header className="header">
			<img src={Logo} className="logo" alt="Around US Logo" />
			<div className="header__nav">
			<p className="header__email">{props.userEmail}</p>
			<Link className="header__link link" to={props.link} onClick={props.onClick}>{props.text}</Link>
			</div>
		</header>
	);
}
export default Header;
