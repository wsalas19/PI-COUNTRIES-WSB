import React from "react";
import { NavLink } from "react-router-dom";
import globe from "../assets/spinning.gif";
function Landing() {
	return (
		<div>
			<div>
				<h3>
					Welcome to the country finder app! explore any country you want and
					it's popular activities.
				</h3>
				<button>
					<NavLink to="/home"> Let's Go!</NavLink>
				</button>
			</div>
			<div>
				<img src={globe} alt="spinning globe" />
			</div>
		</div>
	);
}

export default Landing;
