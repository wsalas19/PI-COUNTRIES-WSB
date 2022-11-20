import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import City from "./components/City";
import Home from "./components/Home";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Landing />} />
				<Route path="/home" element={<Home />} />
				<Route path="/about" element={<Landing />} />
				<Route path="/city/:idPais" element={<City />} />
				<Route path />
			</Routes>
		</div>
	);
}

export default App;
