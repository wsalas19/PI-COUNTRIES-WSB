import React from "react";
function Card(props) {
	const { img, name, continent } = props;
	return (
		<div>
			<img src={img} alt="flag" />
			<h2>{name}</h2>
			<p>{continent}</p>
		</div>
	);
}

export default Card;
