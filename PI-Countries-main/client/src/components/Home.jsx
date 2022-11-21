import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getCountries,
	filterByContinent,
	orderByName,
	orderByPop,
	filterByActivity,
	getActivities,
} from "../redux/actions";

import Card from "./Card";

function Home() {
	const dispatch = useDispatch();
	const allCountries = useSelector((state) => state.countries);
	const activities = useSelector((state) => state.allActivities);

	const [orden, setOrden] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	let [countriesPerPage, setCountriesPerPage] = useState(12);

	const indexOfLastCountrie = currentPage * countriesPerPage;
	const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage;
	const currentCountries = allCountries.slice(
		indexOfFirstCountrie,
		indexOfLastCountrie
	);

	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		dispatch(getCountries());
		dispatch(getActivities());
	}, [dispatch]);

	return (
		<div>
			<Nav />

			<div>
				{currentCountries.length ? (
					currentCountries.map((e) => {
						return (
							<div>
								<Card
									flag={e.flag}
									name={e.name}
									continent={e.continent}
									key={e.id}
									id={e.id}
								/>
							</div>
						);
					})
				) : (
					<h1>no hay paises</h1>
				)}
			</div>

			<Footer />
		</div>
	);
}

export default Home;
