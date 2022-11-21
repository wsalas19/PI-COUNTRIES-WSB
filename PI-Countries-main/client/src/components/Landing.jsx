import React from "react";
import { NavLink } from "react-router-dom";
import globe from "../assets/spinning.gif";
import s from "../css/Landing.module.css";
function Landing() {
	return (
		<div className={s.container}>
			<div className={s.right}>
				<h3>
					Welcome to the country finder app! explore any country you want and
					it's popular activities.
				</h3>
				<button className={s.butn}>
					<NavLink to="/home"> Let's Go!</NavLink>
				</button>
			</div>

			<div className={s.left}>
				<img className={s.globe} src={globe} alt="spinning globe" />
			</div>
		</div>
	);
}

export default Landing;
