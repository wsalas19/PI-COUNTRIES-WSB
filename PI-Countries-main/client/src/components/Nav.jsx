import React from "react";
import s from "../css/Nav.module.css";
import { NavLink } from "react-router-dom";
import logo from "../assets/globe.png";
function Nav() {
	return (
		<div className={s.bar}>
			<div className={s.left}>
				<img className={s.cloud} src={logo} alt="globe" />
				<h1 className={s.title}>Country Finder</h1>
			</div>
			<div className={s.right}>
				<NavLink className={s.links} to="/">
					Home
				</NavLink>
				<NavLink className={s.links} to="/about">
					About
				</NavLink>
			</div>
		</div>
	);
}

export default Nav;
