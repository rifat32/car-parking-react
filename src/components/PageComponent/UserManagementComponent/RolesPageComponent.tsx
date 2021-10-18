import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const RolesPageComponent: React.FC = () => {
	const [roles, setRoles] = useState([]);
	const [currentLink, setCurrentLink] = useState(`${BACKENDAPI}/v1.0/roles`);
	useEffect(() => {
		loadRoles();
	}, []);
	// pagination required
	const loadRoles = () => {
		apiClient()
			.get(currentLink)
			.then((response: any) => {
				console.log(response);
				setRoles(response.data.roles.data);
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
						<th scope="col">Id</th>
						<th scope="col">Name</th>
					</tr>
				</thead>
				{roles.length ? (
					<tbody>
						{roles.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.id}</td>
									<td>{el.name}</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
		</>
	);
};

export default RolesPageComponent;
