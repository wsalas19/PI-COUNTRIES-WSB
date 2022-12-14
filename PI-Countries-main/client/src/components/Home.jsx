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
import Pagination from "./Pagination";
import Card from "./Card";

function Home() {
	const dispatch = useDispatch();
	const allCountries = useSelector((state) => state.countries);
	const activities = useSelector((state) => state.allActivities);

	const [currentPage, setCurrentPage] = useState(1);
	const countriesPerPage = 10;

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

	const handleSort = (e) => {
		dispatch(orderByName(e.target.value));
		setCurrentPage(1);
	};
	const handleSortPop = (e) => {
		dispatch(orderByPop(e.target.value));
		setCurrentPage(1);
	};

	function handleFilteredCountrie(e) {
		dispatch(filterByContinent(e.target.value));
	}

	function handleFilterByActivity(e) {
		e.preventDefault();
		e.target.value === "none"
			? dispatch(getCountries())
			: dispatch(filterByActivity(e.target.value));
		setCurrentPage(1);
	}

	return (
		<div>
			<Nav />

			<Filter
				onSearch={handleSearch}
				handleChange={handleChange}
				handleKeyDown={handleKeyDown}
				searchClick={searchClick}
				handleFilteredCountrie={handleFilteredCountrie}
				handleSort={handleSort}
				handleSortPop={handleSortPop}
				handleFilterByActivity={handleFilterByActivity}
				activities={activities}
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
									capital={e.capital}
									area={e.area}
									population={e.population}
								/>
							</div>
						);
					})
				) : (
					<img src={buffer} alt="buffer" />
				)}
			</div>
			<Pagination
				paginado={paginado}
				allCountries={allCountries.length}
				countriesPerPage={countriesPerPage}
			/>
			<Footer />
		</div>
	);
}

export default Home;
