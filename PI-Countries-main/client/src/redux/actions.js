import {
	FILTER_COUNTRIES,
	GET_COUNTRIES,
	GET_COUNTRIES_BY_NAME,
	ORDER_COUNTRIES_ALF,
	ORDER_COUNTRIES_POP,
	GET_TOURIST_ACTIVITIES,
	GET_COUNTRY_DETAIL,
	GET_COUNTRIES_QUERY,
	FILTER_BY_ACTIVITIES,
} from "./types";
import axios from "axios";
//Getters for country
export const getCountries = () => async (dispatch) => {
	try {
		let info = await axios.get("http://localhost:3001/countries");
		return dispatch({
			type: GET_COUNTRIES,
			payload: info.data,
		});
	} catch (error) {
		console.log(error.message);
	}
};
export const getCountryDetail = (id) => async (dispatch) => {
	try {
		let detail = await axios.get(`http://localhost:3001/countries/${id}`);
		return dispatch({
			type: GET_COUNTRY_DETAIL,
			payload: detail.data,
		});
	} catch (error) {
		console.log(`${error.name}:${error.message}`);
	}
};
export const getCountrySearch = (name) => async (dispatch) => {
	try {
		let search = await axios.get(
			`http://localhost:3001/countries/?name=${
				name.charAt(0).toUpperCase() + name.slice(1)
			}`
		);
		return dispatch({
			type: GET_COUNTRIES_QUERY,
			payload: search.data,
		});
	} catch (error) {
		console.log(`${error.name}:${error.message}`);
	}
};
export const getCountriesByName = (name) => {
	return {
		type: GET_COUNTRIES_BY_NAME,
		payload: name,
	};
};
//Get and post for activity db.
export const getActivities = () => async (dispatch) => {
	try {
		let activities = await axios.get("http://localhost:3001/activities");
		return dispatch({
			type: GET_TOURIST_ACTIVITIES,
			payload: activities.data,
		});
	} catch (error) {
		console.log(`${error.name}:${error.message}`);
	}
};

export const postActivity = (activityInfo) => async (dispatch) => {
	const response = await axios.post(
		"http://localhost:3001/activities",
		activityInfo
	);
	return response;
};
//filters and order
export const filterByActivity = (activity) => {
	return {
		type: FILTER_BY_ACTIVITIES,
		payload: activity,
	};
};

export const filterByContinent = (continent) => {
	return {
		type: FILTER_COUNTRIES,
		payload: continent,
	};
};

export const orderByName = (name) => {
	return {
		type: ORDER_COUNTRIES_ALF,
		payload: name,
	};
};
export const orderByPop = (payload) => {
	return {
		type: ORDER_COUNTRIES_POP,
		payload,
	};
};
