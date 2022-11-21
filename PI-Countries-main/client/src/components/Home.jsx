import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Filter from "./Filter";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getCountries,
	filterByContinent,
	orderByName,
	orderByPop,
	filterByActivity,
	getActivities,
	getCountriesByName,
} from "../redux/actions";
import buffer from "../assets/buffer.gif";
import s from "../css/Home.module.css";

import Card from "./Card";

function Home() {
	const dispatch = useDispatch();
	const allCountries = useSelector((state) => state.countries);
	const activities = useSelector((state) => state.allActivities);

	const [orden, setOrden] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	let [countriesPerPage, setCountriesPerPage] = useState(10);

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

	const handleSearch = (e) => {
		dispatch(getCountriesByName(e.target.value));
	};
	const [city, setCity] = useState("");

	function handleChange(event) {
		setCity(event.target.value);
	}
	function searchClick() {
		if (city === "") {
			console.log("enter a city");
		}
		dispatch(getCountriesByName(city));
		setCity("");
	}
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			if (city === "") {
				console.log("enter a city");
			}
			searchClick(city);
			setCity("");
			event.target.value = "";
		}
	};

	return (
		<div>
			<Nav />

			<Filter
				onSearch={handleSearch}
				handleChange={handleChange}
				handleKeyDown={handleKeyDown}
				searchClick={searchClick}
			/>

			<div className={s.cards}>
				{currentCountries.length ? (
					currentCountries.map((e) => {
						return (
							<div key={e.id}>
								<Card
									key={e.id}
									flag={e.flag}
									name={e.name}
									continent={e.continent}
									id={e.id}
								/>
							</div>
						);
					})
				) : (
					<img src={buffer} alt="buffer" />
				)}
			</div>

			<Footer />
		</div>
	);
}

export default Home;
