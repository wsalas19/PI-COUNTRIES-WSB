import React from "react";
function Filter({
	onSearch,
	handleChange,
	handleKeyDown,
	searchClick,
	handleSort,
	handleSortPop,
	handleFilteredCountrie,
	handleFilterByActivity,
	activities,
}) {
	return (
		<div>
			<div>
				<input
					type="search"
					onKeyDown={(e) => handleKeyDown(e)}
					onChange={(e) => handleChange(e)}
				/>
				<button onClick={(e) => searchClick(e)}>Find</button>
			</div>
			<div>
				<div>
					Order by name
					<select onChange={(e) => handleSort(e)}>
						<option></option>
						<option value="A-Z">A-Z</option>
						<option value="Z-A">Z-A</option>
					</select>
				</div>
				<div>
					Order by population
					<select onChange={(e) => handleSortPop(e)}>
						<option></option>
						<option value="+population"> - TO +</option>
						<option value="-population"> + TO -</option>
					</select>
				</div>
				<div>
					Filter by continent
					<select onChange={(e) => handleFilteredCountrie(e)}>
						<option value={"All"}>All </option>
						<option value={"South America"}>South America</option>
						<option value={"North America"}>North America</option>
						<option value={"Africa"}>Africa</option>
						<option value={"Asia"}>Asia</option>
						<option value={"Europe"}>Europe</option>
						<option value={"Oceania"}>Oceanía</option>
						<option value={"Antarctica"}>Antarctica</option>
					</select>
					<div>
						Search by activity
						{!activities ? (
							<p>No se han creado actividades</p>
						) : (
							<select onChange={(e) => handleFilterByActivity(e)}>
								<option value="none"></option>
								{activities.map((e) => (
									<option value={e.name} key={e.id}>
										{e.name}
									</option>
								))}
							</select>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Filter;
