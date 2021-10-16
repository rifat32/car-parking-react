import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";

const BanksPageComponent: React.FC = () => {
	const [banks, setBanks] = useState([]);
	const [currentLink, setCurrentLink] = useState(`${BACKENDAPI}/v1.0/banks`);
	useEffect(() => {
		loadBanks();
	}, []);
	// pagination required
	const loadBanks = () => {
		apiClient()
			.get(currentLink)
			.then((response: any) => {
				console.log(response);
				setBanks(response.data.banks.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Wing</th>
						<th scope="col">Bank Name</th>
						<th scope="col">Account Number</th>
					</tr>
				</thead>
				{/* 
		// {
            $table->string("name");
            $table->string("account_number");
            $table->string("wing_id");
            // }
		*/}
				{banks.length ? (
					<tbody>
						{banks.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.wing.name}</td>
									<td>{el.name}</td>
									<td>{el.account_number}</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
		</>
	);
};

export default BanksPageComponent;
