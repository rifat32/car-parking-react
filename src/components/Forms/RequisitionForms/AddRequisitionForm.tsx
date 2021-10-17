import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	supplier: string;
	reference_no: string;
	purchase_date: string;
	purchase_status: string;
	product_id: string;
	// amount: string;
	payment_method: string;
	quantity: number;
	account_number: string;
	wing_id: string;
}
const AddRequisitionForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		supplier: "",
		reference_no: "",
		purchase_date: "",
		purchase_status: "",
		product_id: "",
		// amount: "",
		payment_method: "",
		quantity: 1,
		account_number: "",
		wing_id: "",
	});
	const [search, setSearch] = useState("");
	const [product, setproduct] = useState(null);
	const [wings, setWings] = useState([]);
	const [showAccountField, setShowAccountField] = useState<boolean>(false);
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// bank transfer
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (
			e.target.name === "payment_method" &&
			e.target.value === "bank transfer"
		) {
			setShowAccountField(true);
		} else {
			setShowAccountField(false);
		}
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const resetFunction = () => {
		setFormData({
			supplier: "",
			reference_no: "",
			purchase_date: "",
			purchase_status: "",
			product_id: "",
			// amount: "",
			payment_method: "",
			quantity: 1,
			account_number: "",
			wing_id: "",
		});
		setproduct(null);
		setSearch("");
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		apiClient()
			.post(`${BACKENDAPI}/v1.0/requisitions`, { ...formData })
			.then((response) => {
				console.log(response);
				toast("requisition saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
				if (error.response.status === 404) {
					toast.error(error.response.data.message);
				}
			});
	};
	// get search string Function
	const searchFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	// search on enter
	const searchOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === "Enter") {
			searchProduct();
		}
	};
	// search on focus change
	const searchOnBlur = () => {
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
				setFormData({ ...formData, product_id: product.id });
			})
			.catch((error) => {
				console.log(error.response);
				setproduct(null);
				setFormData({ ...formData, product_id: "" });
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
				<label htmlFor="reference_no" className="form-label">
					Reference No
				</label>
				<input
					type="text"
					className="form-control"
					id="reference_no"
					name="reference_no"
					onChange={handleChange}
					value={formData.reference_no}
				/>
			</div>
			<div className="col-md-3">
				<label htmlFor="purchase_date" className="form-label">
					Purchase Date:*
				</label>
				<input
					type="date"
					className="form-control"
					id="purchase_date"
					name="purchase_date"
					onChange={handleChange}
					value={formData.purchase_date}
				/>
			</div>
			<div className="col-md-3">
				<label htmlFor="purchase_status" className="form-label">
					Purchase Status
				</label>
				<select
					className="form-select"
					id="purchase_status"
					name="purchase_status"
					onChange={handleSelect}
					value={formData.purchase_status}>
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
				<p>Search Product</p>
				<div className="input-group mb-3">
					<span className="input-group-text">
						<i className="bi bi-search" />
					</span>
					<input
						type="text"
						className="form-control"
						aria-label="search"
						onChange={searchFunc}
						value={search}
						onKeyDown={searchOnKeyDown}
						onBlur={searchOnBlur}
						placeholder="search product by name"
					/>
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
				<label htmlFor="payment_method" className="form-label">
					Payment Method
				</label>
				<select
					className="form-select"
					id="payment_method"
					name="payment_method"
					onChange={handleSelect}
					value={formData.payment_method}>
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
			{showAccountField && (
				<div className="col-md-6">
					<label htmlFor="account_number" className="form-label">
						Bank Account Number
					</label>
					<input
						type="string"
						className="form-control"
						id="account_number"
						name="account_number"
						value={formData.account_number}
						onChange={handleChange}
					/>
				</div>
			)}

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

export default AddRequisitionForm;
