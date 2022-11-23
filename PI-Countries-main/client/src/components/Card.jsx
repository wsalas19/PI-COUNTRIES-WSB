import React from "react";
import { Link } from "react-router-dom";
import s from "../css/Card.module.css";
function Card(props) {
	const { flag, name, continent, id, capital, area, population } = props;
	return (
		<>
			<div className={s.card}>
				<img className={s.img} src={flag} alt="flag" />
				<div className={s.label}></div>
				<h2 className={s.name}>{name}</h2>
				<p className={s.tag}>{continent}</p>
				<button className={s.btn}>
					<Link to={`/countries/${id}`}> Learn More</Link>
				</button>
			</div>
		</>
	);
}

export default Card;
