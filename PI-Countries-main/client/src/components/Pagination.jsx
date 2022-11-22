import React from "react";
import s from "../css/Pagination.module.css";
function Pagination({ countriesPerPage, allCountries, paginado }) {
	const pageNumbers = [];
	for (let i = 1; i < Math.ceil(allCountries / countriesPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div className={s.pages}>
			<nav>
				<ul>
					{pageNumbers &&
						pageNumbers.map((number) => (
							<button
								className={s.button}
								key={number}
								onClick={() => paginado(number)}
							>
								{number}
							</button>
						))}
				</ul>
			</nav>
		</div>
	);
}

export default Pagination;
