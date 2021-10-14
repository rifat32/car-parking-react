import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const RevenuesPageComponent: React.FC = () => {
	const [revenues, setRevenues] = useState([]);
	const [currentLink, setCurrentLink] = useState(
		`${BACKENDAPI}/v1.0/revenues`
	);
	useEffect(() => {
		loadProducts();
	}, []);
	// pagination required
	const loadProducts = () => {
		apiClient()
			.get(currentLink)
			.then((response: any) => {
				console.log(response);
				setRevenues(response.data.revenues.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<>
			{/* 
		
		   // {
            //     "date": "2021-10-14",
            //     "amount": "10",
            //     "account": "sadefaer aeraerg ",
            //     "customer": "erfgre gaerge",
            //     "description": "fttghr",
            //     "category": "eargeg",
            //     "reference": "1015"
            // }
		*/}
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Date</th>
						<th scope="col">Amount</th>
						<th scope="col">Account</th>
						<th scope="col">Customer</th>
						<th scope="col">description</th>
						<th scope="col">category</th>
						<th scope="col">reference</th>
					</tr>
				</thead>
				{revenues.length ? (
					<tbody>
						{revenues.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.date}</td>
									<td>{el.amount}</td>
									<td>{el.account}</td>
									<td>{el.customer}</td>
									<td>{el.description}</td>
									<td>{el.category}</td>
									<td>{el.reference}</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
		</>
	);
};

export default RevenuesPageComponent;
