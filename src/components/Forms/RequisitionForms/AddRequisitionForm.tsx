import React, { useState } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	rSupplier: string;
	rReferenceNo: string;
	rPurchaseDate: string;
	rPurchaseStatus: string;
	rProductId: string;
	rAmount: string;
	rPaymentMethod: string;
}
const AddRequisitionForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		rSupplier: "",
		rReferenceNo: "",
		rPurchaseDate: "",
		rPurchaseStatus: "",
		rProductId: "",
		rAmount: "",
		rPaymentMethod: "",
	});
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const resetFunction = () => {
		setFormData({
			rSupplier: "",
			rReferenceNo: "",
			rPurchaseDate: "",
			rPurchaseStatus: "",
			rProductId: "",
			rAmount: "",
			rPaymentMethod: "",
		});
		setproduct(null);
	};
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
			});
	};
	const searchFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};
	const seachProduct = (e: React.KeyboardEvent<HTMLInputElement>) => {
		console.log(e.code);
		if (e.code === "Enter") {
			apiClient()
				.get(`${BACKENDAPI}/v1.0/products/search/${search}`)
				.then((response: any) => {
					console.log(response);
					const { product } = response.data;
					setproduct(product);
					setFormData({ ...formData, rProductId: product.id });
				})
				.catch((error) => {
					console.log(error.response);
					setproduct(null);
					setFormData({ ...formData, rProductId: "" });
					if (error.response.status === 404) {
						toast("np product found");
					}
				});
		}
	};

	return (
		<form className="row g-3">
			<div className="col-md-3">
				<label htmlFor="rSupplier" className="form-label">
					Supplier
				</label>
				<input
					type="text"
					className="form-control"
					id="rSupplier"
					name="rSupplier"
					onChange={handleChange}
					value={formData.rSupplier}
				/>
			</div>
			<div className="col-md-3">
				<label htmlFor="rReferenceNo" className="form-label">
					Reference No
				</label>
				<input
					type="text"
					className="form-control"
					id="rReferenceNo"
					name="rReferenceNo"
					onChange={handleChange}
					value={formData.rReferenceNo}
				/>
			</div>
			<div className="col-md-3">
				<label htmlFor="rPurchaseDate" className="form-label">
					Purchase Date:*
				</label>
				<input
					type="date"
					className="form-control"
					id="rPurchaseDate"
					name="rPurchaseDate"
					onChange={handleChange}
					value={formData.rPurchaseDate}
				/>
			</div>
			<div className="col-md-3">
				<label htmlFor="rPurchaseStatus" className="form-label">
					Purchase Status
				</label>
				<select
					className="form-select"
					id="rPurchaseStatus"
					name="rPurchaseStatus"
					onChange={handleSelect}
					value={formData.rPurchaseStatus}>
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
						onKeyDown={seachProduct}
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
							<th scope="col">Quantity</th>
							<th scope="col">Price</th>
						</tr>
					</thead>
					{product ? (
						<tbody>
							<tr key={product["id"]}>
								<td>{product["pName"]}</td>
								<td>{product["pBrand"]}</td>
								<td>{product["pCategory"]}</td>
								<td>{product["pSku"]}</td>
								<td>{product["pQuantity"]}</td>
								<td>{product["pPrice"]}</td>
							</tr>
						</tbody>
					) : null}
				</table>
			</div>

			<div className="col-md-3">
				<label htmlFor="rAmount" className="form-label">
					Amount
				</label>
				<input
					type="text"
					className="form-control"
					id="rAmount"
					name="rAmount"
					onChange={handleChange}
					value={formData.rAmount}
				/>
			</div>

			<div className="col-md-3">
				<label htmlFor="rPurchaseStatus" className="form-label">
					Payment Method
				</label>
				<select
					className="form-select"
					id="rPaymentMethod"
					name="rPaymentMethod"
					onChange={handleSelect}
					value={formData.rPaymentMethod}>
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

export default AddRequisitionForm;
