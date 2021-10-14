import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";

const WingsPageComponent: React.FC = () => {
	const [wings, setWings] = useState([]);
	const [currentLink, setCurrentLink] = useState(`${BACKENDAPI}/v1.0/wings`);
	useEffect(() => {
		loadWings();
	}, []);
	// pagination required
	const loadWings = () => {
		apiClient()
			.get(currentLink)
			.then((response: any) => {
				console.log(response);
				setWings(response.data.wings.data);
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
						<th scope="col">Name</th>
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
				{wings.length ? (
					<tbody>
						{wings.map((el: any) => {
							return (
								<tr key={el.id}>
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

export default WingsPageComponent;
