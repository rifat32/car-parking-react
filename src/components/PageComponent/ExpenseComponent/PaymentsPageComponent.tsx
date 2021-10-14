import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

const PaymentsPageComponent: React.FC = () => {
	const [payments, setPayments] = useState([]);
	const [currentLink, setCurrentLink] = useState(
		`${BACKENDAPI}/v1.0/payments`
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
				setPayments(response.data.payments.data);
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
						<th scope="col">Date</th>
						<th scope="col">Amount</th>
						<th scope="col">Account</th>
						<th scope="col">Description</th>
						<th scope="col">Category</th>
						<th scope="col">Reference</th>
					</tr>
				</thead>
				{/* 
		
	// $table->date("date");
    // $table->integer("amount");
    // $table->string("account");
    // $table->text("description");
    // $table->string("category");
    // $table->string("reference");
		*/}
				{payments.length ? (
					<tbody>
						{payments.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.date}</td>
									<td>{el.amount}</td>
									<td>{el.account}</td>
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

export default PaymentsPageComponent;
