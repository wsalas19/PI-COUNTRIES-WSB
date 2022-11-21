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

function rootReducer(state = initialState, action) {
	switch (action.type) {
		// country getters
		case GET_COUNTRIES:
			return {
				...state,
				countries: action.payload,
				allCountries: action.payload,
			};
		case GET_COUNTRIES_BY_NAME: {
			let nombre =
				action.payload === ""
					? state.allCountries
					: state.countries.filter((e) =>
							e.name.toLowerCase().includes(action.payload.toLowerCase())
					  );
			console.log(action.payload);
			return {
				...state,
				countries: nombre,
			};
		}
		case GET_COUNTRIES_QUERY:
			return {
				...state,
				countries: action.payload,
			};
		case GET_COUNTRY_DETAIL:
			return {
				...state,
				detail: action.payload,
			};
		//activities actions
		case ADD_TOURIST_ACTIVITIES:
			return {
				...state,
			};
		case GET_TOURIST_ACTIVITIES:
			return {
				...state,
				allActivities: action.payload,
			};
		//order and filters
		case FILTER_COUNTRIES:
			const totalCountries = state.allCountries;
			const countriesFiltered =
				action.payload === "All"
					? totalCountries
					: totalCountries.filter((c) => c.continent === action.payload);
			return {
				...state,
				countries: countriesFiltered,
			};
		case FILTER_BY_ACTIVITIES:
			const allCountries2 = state.allCountries;

			const solo = allCountries2.filter((pais) => {
				return pais.Activities.length > 0;
			});

			let array = [];

			for (let i = 0; i < solo.length; i++) {
				for (let j = 0; j < solo[i].Activities.length; j++) {
					if (solo[i].Activities[j].name === action.payload) {
						array.push(solo[i]);
					}
				}
			}

			const filtro = action.payload === "Todos" ? allCountries2 : array;

			return {
				...state,
				countries: filtro,
			};

		case ORDER_COUNTRIES_ALF:
			const orderedAlf =
				action.payload === "A-Z"
					? state.countries.sort((a, b) => {
							if (a.name > b.name) {
								return 1;
							}
							if (a.name < b.name) {
								return -1;
							}
							return 0;
					  })
					: state.countries.sort((a, b) => {
							if (a.name > b.name) {
								return -1;
							}
							if (a.name < b.name) {
								return 1;
							}
							return 0;
					  });
			return {
				...state,
				countries: orderedAlf,
			};
		case ORDER_COUNTRIES_POP:
			const orderPop =
				action.payload === "+Population"
					? state.countries.sort((a, b) => {
							return a.population - b.population;
					  })
					: state.countries.sort((a, b) => {
							return a.population - b.population;
					  });

			return {
				state,
				countries: orderPop,
			};

		default:
			return state;
	}
}

export default rootReducer;
