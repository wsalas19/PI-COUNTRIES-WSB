import React, { useState } from "react";
function Filter({
	onSearch,
	handleChange,
	handleKeyDown,
	searchClick,
	handleSort,
	handleSortPop,
}) {
	return (
		<div>
			<div>
				<input
					type="search"
					onKeyDown={handleKeyDown}
					onChange={handleChange}
				/>
				<button onClick={searchClick}>Find</button>
			</div>
			<div>
				<div>
					Orden Alfabético
					<select onChange={(e) => handleSort(e)}>
						<option></option>
						<option value="A-Z">Ascendente</option>
						<option value="Z-A">Descendente</option>
					</select>
				</div>
				<div>
					Número de Habitantes
					<select onChange={(e) => handleSortPop(e)}>
						<option></option>
						<option value="+population">Menor a Mayor</option>
						<option value="-population">Mayor a Menor</option>
					</select>
				</div>
			</div>
		</div>
	);
}

export default Filter;
