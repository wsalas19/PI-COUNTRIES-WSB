import {
	FILTER_COUNTRIES,
	FILTER_BY_ACTIVITIES,
	GET_COUNTRIES,
	GET_COUNTRIES_BY_NAME,
	GET_COUNTRIES_QUERY,
	GET_COUNTRY_DETAIL,
	GET_TOURIST_ACTIVITIES,
	ORDER_COUNTRIES_ALF,
	ORDER_COUNTRIES_POP,
	ADD_TOURIST_ACTIVITIES,
} from "./types";

const initialState = {
	countries: [],
	allCountries: [],
	allActivities: [],
	activities: [],
	detail: {},
};

function rootReducer(state = initialState, action) {}

export default rootReducer;
