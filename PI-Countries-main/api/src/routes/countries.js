const { Router } = require("express");
const axios = require("axios");
const { Op, Country, Activity } = require("../db.js");

const router = Router();

const getInfo = async () => {
	const response = await axios.get("https://restcountries.com/v3/all");
	const allCountries = response.data.map((c) => {
		const country = {
			id: c.cca3,
			name: c.name.common,
			flag: c.flags[1],
			continent: c.continents[0],
			capital: c.capital != null ? c.capital[0] : "No data",
			subregion: c.subregion,
			area: c.area,
			population: c.population,
		};
		return country;
	});
	return allCountries;
};

const countriesToDb = async () => {
	try {
		const countries = await Country.findAll();
		if (countries.length === 0) {
			const array = await getInfo();
			await Country.bulkCreate(array);
		}
	} catch (error) {
		console.log(error.message);
	}
};

const loadCountries = async () => {
	await countriesToDb();
};
loadCountries();

//busca general de paises
router.get("/", async (req, res) => {
	const { name } = req.query;

	try {
		if (!name) {
			const countries = await Country.findAll({
				include: [
					{
						model: Activity,
						attributes: ["name", "dificulty", "duration", "season"],
						through: { attributes: [] },
					},
				],
			});
			if (countries) {
				return res.status(200).send(countries);
			} else {
				return res.status(404).send("No se encontró paises");
			}
		} else {
			const country = await Country.findAll({
				where: {
					name: { [Op.substring]: name },
				},
				include: [
					{
						model: Activity,
						attributes: ["name", "dificulty", "duration", "season"],
						through: { attributes: [] },
					},
				],
			});
			if (country) {
				return res.status(200).send(country);
			} else {
				return res.status(404).send("No se encontró el pais");
			}
		}
	} catch (error) {
		console.log(error.message);
	}
});

//busca de paises segun id
router.get("/:idPais", async (req, res) => {
	const { idPais } = req.params;
	try {
		const country = await Country.findOne({
			where: {
				id: idPais.toUpperCase(),
			},
			include: [
				{
					model: Activity,
					attributes: ["name", "dificulty", "duration", "season"],
					through: { attributes: [] },
				},
			],
		});
		if (country) {
			return res.status(200).send(country);
		} else {
			return res.status(404).send("No se encontró el pais");
		}
	} catch (error) {
		console.log(error.message);
	}
});
console.log("hola");

module.exports = router;
