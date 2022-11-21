import React from "react";
import { Link } from "react-router-dom";
function Card(props) {
	const { flag, name, continent, id } = props;
	return (
		<div>
			<img src={flag} alt="flag" />
			<h2>{name}</h2>
			<p>{continent}</p>
			<Link to={`/countries/${id}`}>
				<button>Ver Más</button>
			</Link>
		</div>
	);
}

export default Card;
