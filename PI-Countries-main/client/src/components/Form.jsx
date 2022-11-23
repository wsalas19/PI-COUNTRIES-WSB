import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../redux/actions";
import Nav from "./Nav";
import Footer from "./Footer";
import s from "../css/Form.module.css";
import arrow from "../assets/arrow.png";

const validate = (input) => {
	let errors = {};
	let dif = Number(input.dificulty);
	let dur = Number(input.duration);

	if (!input.name) errors.name = "Campo Necesario";
	else if (/[^A-Za-z0-9 ]+/g.test(input.name))
		errors.name = "Nombre no puede tener caracteres especiales o tildes";

	if (!input.dificulty) errors.dificulty = "Campo Necesario";
	else if (dif <= 0 || dif > 5) errors.dificulty = "Debe ser entre 1 y 5";

	if (!input.duration) errors.duration = "Campo Necesario";
	else if (dur <= 0 || dur > 24) errors.duration = "Debe ser entre 1 y 24";

	if (!input.season || input.season === "vacio")
		errors.season = "Campo Necesario";
	/* 
	if (!input.countries || input.countries.length === 0)
		errors.countries = "Campo Necesario"; */

	return errors;
};
function Form() {
	const dispatch = useDispatch();

	const countries = useSelector((state) => state.countries);
	const countryDetail = useSelector((state) => state.detail);
	const [errors, setErrors] = useState({});

	const [input, setInput] = useState({
		name: "",
		dificulty: "",
		duration: "",
		season: "",
		countries: "",
	});
	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	const handleChange = (e) => {
		console.log(e.target.value);
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
		console.log(input);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			!input.name ||
			!input.dificulty ||
			!input.duration ||
			!input.season ||
			!input.countries
		) {
			return alert("There are some fields missing or wrong, please review");
		}
		dispatch(postActivity(input));
		alert("Activity Created");
		setInput({
			name: "",
			dificulty: "",
			duration: "",
			season: "",
			countries: [],
		});
	};
	const handleSelect = (e) => {
		setInput((estado) => {
			if (e.target.name === "countries") {
				return {
					...estado,
					countries: [...estado.countries, e.target.value],
				};
			} else {
				return {
					...estado,
					[e.target.name]: e.target.value,
				};
			}
		});
	};
	/* 	useEffect(() => {
        dispatch(getCountries())
    }, []) */

	return (
		<div>
			<Nav />
			<div className={s.form}>
				<div className={s.formContainer}>
					<form onSubmit={(e) => handleSubmit(e)}>
						<div>
							<label>Name: </label>
							<input
								type="text"
								value={input.name}
								name="name"
								onChange={(e) => handleChange(e)}
							/>
							{errors.name && <p className={s.error}>{errors.name}</p>}
						</div>
						<div>
							<p>Country select:</p>
							<select name="countries" onChange={handleChange}>
								<option value="-">-</option>
								{countries.map((c) => {
									return (
										<option
											value={c.id}
											key={c.id}
											selected={c.id === countryDetail.id ? true : false}
										>
											{c.name}
										</option>
									);
								})}
							</select>
							{/* {errors ? <p>{errors.countries}</p> : null} */}
						</div>
						<div>
							<label>Season: </label>
							<select
								name="season"
								id="season"
								onChange={(e) => handleSelect(e)}
							>
								<option value="vacio"> </option>
								<option value={"Verano"}>Summer </option>
								<option value={"Invierno"}>Winter </option>
								<option value={"Primavera"}>Spring </option>
								<option value={"Otoño"}>Autum </option>
							</select>
							{errors.season && <p className={s.error}>{errors.season}</p>}
						</div>
						<div>
							<label>Dificulty: </label>
							<input
								type="number"
								value={input.difficulty}
								name="dificulty"
								onChange={(e) => handleChange(e)}
							/>
							{errors.dificulty && (
								<p className={s.error}>{errors.dificulty}</p>
							)}
						</div>
						<div>
							<label>Duration: </label>
							<input
								type="number"
								value={input.duration}
								name="duration"
								onChange={(e) => handleChange(e)}
							/>
							<label> hrs</label>
							{errors.duration && <p className={s.error}>{errors.duration}</p>}
						</div>
						<div>
							<button
								className={s.btn}
								type="submit"
								disabled={Object.keys(errors).length === 0 ? false : true}
							>
								Add Activity
							</button>
						</div>
					</form>
					<button className={s.btnhome}>
						<img className={s.arrow} src={arrow} alt="arrow" />
						<Link to="/home">Home</Link>
					</button>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default Form;
