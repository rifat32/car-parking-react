import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";

const DebitNotesPageComponent: React.FC = () => {
	const [debitNotes, setDebitNotes] = useState([]);
	const [currentLink, setCurrentLink] = useState(
		`${BACKENDAPI}/v1.0/debit-notes`
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
				setDebitNotes(response.data.debitNotes.data);
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
						<th scope="col">bill</th>
						<th scope="col">amount</th>
						<th scope="col">date</th>
						<th scope="col">description</th>
					</tr>
				</thead>
				{/* 
		// {
            //     "bill": "dgefagarfe",
            //     "amount": "100",
            //     "date": "2021-10-14",
            //     "description": "dfghdfg dfgh gfh gf sgjgfr rtgh rfgh strgtrfgh srgjsrf j rstjrstj yyghj"
            // }
		*/}
				{debitNotes.length ? (
					<tbody>
						{debitNotes.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{`#bill0000${el.id}`}</td>
									<td>{el.amount}</td>
									<td>{el.date}</td>
									<td>{el.description}</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
		</>
	);
};

export default DebitNotesPageComponent;
