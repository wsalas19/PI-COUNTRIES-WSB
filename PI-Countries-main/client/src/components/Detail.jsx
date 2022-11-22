import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountryDetail } from "../redux/actions";
import Nav from "./Nav";
import Footer from "./Footer";
import s from "../css/Detail.module.css";

function Detail(props) {
	const dispatch = useDispatch();
	const { id } = useParams();
	const country = useSelector((state) => state.detail);
	/* const history = useHistory(); */

	useEffect(() => {
		dispatch(getCountryDetail(id));
	}, [dispatch, id]);

	/* 	function handleClick(e) {
		e.preventDefault();
		history.push("/home");
	} */

	return (
		<div>
			<Nav />
			<div className={s.container}>
				<div>
					<h2 className={s.title}>Country details</h2>
					{country ? (
						<div>
							<div className={s.left}>
								<img
									className={s.flag}
									src={country.flag}
									alt="Imagen no disponible"
								/>
							</div>
							<div className={s.right}>
								<h2 className={s.name}>{country.name}</h2>
								<h4 className={s.tag}>{country.continent}</h4>
								<h4>Code: {country.id}</h4>
								<h4>Capital: {country.capital}</h4>
								<h4>Region: {country.subregion}</h4>
								<h4>Area: {country.area} km²</h4>
								<h4>Population: {country.population} Hab.</h4>
							</div>
						</div>
					) : (
						<p>Loading ...</p>
					)}
				</div>

				<div>
					<h3>Country's Activities</h3>
					{country.Activities && country.Activities.length ? (
						country.Activities.map((e) => {
							return (
								<div>
									<h4>{e.name}</h4>
									<p>Dificulty: {e.difficulty}</p>
									<p>Duration: {e.duration} hrs</p>
									<p>Season: {e.season}</p>
								</div>
							);
						})
					) : (
						<p>No Activities yet</p>
					)}
					<button className={s.btn}>
						<Link to="/activities"> Create Activity</Link>
					</button>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Detail;
