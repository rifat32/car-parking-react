import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const UsersPageComponent: React.FC = () => {
	const [users, setUsers] = useState([]);
	const [currentLink, setCurrentLink] = useState(`${BACKENDAPI}/v1.0/users`);
	useEffect(() => {
		loadUsers();
	}, []);
	// pagination required
	const loadUsers = () => {
		apiClient()
			.get(currentLink)
			.then((response: any) => {
				console.log(response);
				setUsers(response.data.users.data);
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
						<th scope="col">email</th>
					</tr>
				</thead>
				{users.length ? (
					<tbody>
						{users.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.id}</td>
									<td>{el.name}</td>
									<td>{el.email}</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
		</>
	);
};

export default UsersPageComponent;