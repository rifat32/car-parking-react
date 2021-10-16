import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	supplier: string;
	referenceNo: string;
	purchaseDate: string;
	purchaseStatus: string;
	productId: string;
	// amount: string;
	paymentMethod: string;
	quantity: number;
	wing_id: string;
}
const AddParchaseForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		supplier: "",
		referenceNo: "",
		purchaseDate: "",
		purchaseStatus: "",
		productId: "",
		// amount: "",
		paymentMethod: "",
		quantity: 1,
		wing_id: "",
	});
	const [wings, setWings] = useState([]);
	useEffect(() => {
		loadWings();
	}, []);

	const loadWings = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/wings/all`)
			.then((response: any) => {
				console.log(response);
				setWings(response.data.wings);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const [search, setSearch] = useState("");
	const [product, setproduct] = useState(null);

	const parchaseStatus = [
		{
			status: "recieved",
		},
		{
			status: "pending",
		},
		{
			status: "ordered",
		},
	];
	const paymentMethods = [
		{
			method: "cash",
		},
		{
			method: "card",
		},
		{
			method: "cheque",
		},
		{
			method: "bank transfer",
		},
		{
			method: "other",
		},
		{
			method: "from advance",
		},
		{
			method: "recieved",
		},
	];
	// handle Change Function
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const resetFunction = () => {
		setFormData({
			supplier: "",
			referenceNo: "",
			purchaseDate: "",
			purchaseStatus: "",
			productId: "",
			// amount: "",
			paymentMethod: "",
			quantity: 1,
			wing_id: "",
		});
		setproduct(null);
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		apiClient()
			.post(`${BACKENDAPI}/v1.0/parchases`, { ...formData })
			.then((response) => {
				console.log(response);
				toast("parchase saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	// get search string Function
	const searchFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	// search on enter
	const seachonKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === "Enter") {
			searchProduct();
		}
	};
	// search on focus change
	const seachOnBlur = () => {
		searchProduct();
	};
	// product search logic
	const searchProduct = () => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/products/search/${search}`)
			.then((response: any) => {
				console.log(response);
				const { product } = response.data;
				setproduct(product);
				setFormData({ ...formData, productId: product.id });
			})
			.catch((error) => {
				console.log(error.response);
				setproduct(null);
				setFormData({ ...formData, productId: "" });
				if (error.response.status === 404) {
					toast("np product found");
				}
			});
	};

	return (
		<form className="row g-3">
			<div className="col-md-12">
				<label htmlFor="bill" className="form-label">
					Wing
				</label>
				<select
					className="form-select"
					id="wing_id"
					name="wing_id"
					onChange={handleSelect}
					value={formData.wing_id}>
					<option value="">Please Select</option>
					{wings.map((el: any, index) => (
						<option
							key={index}
							value={el.id}
							style={{ textTransform: "uppercase" }}>
							{el.name}
						</option>
					))}
				</select>
			</div>

			<div className="col-md-3">
				<label htmlFor="supplier" className="form-label">
					Supplier
				</label>
				<input
					type="text"
					className="form-control"
					id="supplier"
					name="supplier"
					onChange={handleChange}
					value={formData.supplier}
				/>
			</div>
			<div className="col-md-3">
				<label htmlFor="referenceNo" className="form-label">
					Reference No
				</label>
				<input
					type="text"
					className="form-control"
					id="referenceNo"
					name="referenceNo"
					onChange={handleChange}
					value={formData.referenceNo}
				/>
			</div>
			<div className="col-md-3">
				<label htmlFor="purchaseDate" className="form-label">
					Purchase Date:*
				</label>
				<input
					type="date"
					className="form-control"
					id="purchaseDate"
					name="purchaseDate"
					onChange={handleChange}
					value={formData.purchaseDate}
				/>
			</div>
			<div className="col-md-3">
				<label htmlFor="purchaseStatus" className="form-label">
					Purchase Status
				</label>
				<select
					className="form-select"
					id="purchaseStatus"
					name="purchaseStatus"
					onChange={handleSelect}
					value={formData.purchaseStatus}>
					<option value="">Please Select</option>
					{parchaseStatus.map((el, index) => (
						<option
							key={index}
							value={el.status}
							style={{ textTransform: "capitalize" }}>
							{el.status}
						</option>
					))}
				</select>
			</div>
			<div className="col-md-12">
				<div className="input-group mb-3">
					<p>Search Product</p>
					<span className="input-group-text">
						{" "}
						<i className="bi bi-search" />
					</span>
					<input
						type="text"
						className="form-control"
						aria-label="search"
						onChange={searchFunc}
						value={search}
						onKeyDown={seachonKeyDown}
						onBlur={seachOnBlur}
						placeholder="search product by name"
					/>
					{/* <button
						type="button"
						className="btn btn-primary"
						onClick={seachProduct}>
						search
					</button> */}
				</div>
			</div>
			<div className="col-md-12">
				<table className="table table-striped table-hover table-dark">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Brand</th>
							<th scope="col">Category</th>
							<th scope="col">Sku</th>
							{/* <th scope="col">Quantity</th> */}
							<th scope="col">Price</th>
						</tr>
					</thead>
					{product ? (
						<tbody>
							<tr key={product["id"]}>
								<td>{product["name"]}</td>
								<td>{product["brand"]}</td>
								<td>{product["category"]}</td>
								<td>{product["sku"]}</td>
								{/* <td>{product["quantity"]}</td> */}
								<td>{product["price"]}</td>
							</tr>
						</tbody>
					) : null}
				</table>
			</div>

			<div className="col-md-3">
				<label htmlFor="amount" className="form-label">
					Amount
				</label>
				<input
					type="number"
					className="form-control"
					id="amount"
					name="amount"
					readOnly
					value={
						product ? parseInt(product["price"]) * formData.quantity : 0
					}
				/>
			</div>
			<div className="col-md-3">
				<label htmlFor="quantity" className="form-label">
					Quantity
				</label>
				<input
					type="number"
					className="form-control"
					id="quantity"
					name="quantity"
					value={formData.quantity}
					onChange={handleChange}
				/>
			</div>

			<div className="col-md-3">
				<label htmlFor="paymentMethod" className="form-label">
					Payment Method
				</label>
				<select
					className="form-select"
					id="paymentMethod"
					name="paymentMethod"
					onChange={handleSelect}
					value={formData.paymentMethod}>
					<option value="">Please Select</option>
					{paymentMethods.map((el, index) => (
						<option
							key={index}
							value={el.method}
							style={{ textTransform: "capitalize" }}>
							{el.method}
						</option>
					))}
				</select>
			</div>

			<div className="text-center">
				<button
					onClick={handleSubmit}
					type="button"
					className="btn btn-primary me-2">
					Submit
				</button>
				<button
					type="button"
					onClick={resetFunction}
					className="btn btn-secondary">
					Reset
				</button>
			</div>
		</form>
	);
};

export default AddParchaseForm;
