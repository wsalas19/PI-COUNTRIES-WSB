import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Form from "./components/Form";
import Detail from "./components/Detail";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Landing />} />
				<Route path="/home" element={<Home />} />
				<Route path="/about" element={<Landing />} />
				<Route path="/activities" element={<Form />} />
				<Route path="/countries/:id" element={<Detail />} />
			</Routes>
		</div>
	);
}

export default App;
