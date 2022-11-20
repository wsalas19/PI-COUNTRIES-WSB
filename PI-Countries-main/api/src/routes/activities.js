const { Router } = require("express");
const { Activity, Country } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
	try {
		const allActivities = await Activity.findAll({
			include: Country,
		});
		res.status(200).json(allActivities);
	} catch (error) {
		res.status(400).json({ error: "No se encontraron actividades" });
	}
});

router.post("/", async (req, res) => {
	const { name, dificulty, duration, season, countries } = req.body;
	try {
		const createActivity = await Activity.create({
			name,
			dificulty,
			duration,
			season,
		});

		const findActivity = await Country.findAll({
			where: {
				name: countries,
			},
		});

		createActivity.addCountries(findActivity);
		return res.status(200).send(`La actividad ${name} ha sido creada`);
	} catch (error) {
		res.status(400).json({ error: "Los datos son incorrectos" });
	}
});

module.exports = router;
