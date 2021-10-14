import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";

const ListProductsPageComponent: React.FC = () => {
	const [products, setProducts] = useState([]);
	const [currentLink, setCurrentLink] = useState(
		`${BACKENDAPI}/v1.0/products`
	);
	useEffect(() => {
		loadProducts();
	}, []);
	// pagination required
	const loadProducts = () => {
		apiClient()
			.get(currentLink)
			.then((response: any) => {
				console.log(response.data.products);
				setProducts(response.data.products.data);
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
						<th scope="col">Brand</th>
						<th scope="col">Category</th>
						<th scope="col">Sku</th>
						<th scope="col">Quantity</th>
						<th scope="col">Price</th>
					</tr>
				</thead>
				{products.length ? (
					<tbody>
						{products.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.pName}</td>
									<td>{el.pBrand}</td>
									<td>{el.pCategory}</td>
									<td>{el.pSku}</td>
									<td>{el.pQuantity}</td>
									<td>{el.pPrice}</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
		</>
	);
};

export default ListProductsPageComponent;
