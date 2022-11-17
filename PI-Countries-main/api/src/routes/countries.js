const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
	const { name } = req.query;
	if (name) {
		try {
			const data = await axios.get(
				`https://restcountries.com/v3.1/name/${name}`
			);
			let country = {
				name: data.name.common,
			};
		} catch (error) {}
	}
});

module.exports = router;
