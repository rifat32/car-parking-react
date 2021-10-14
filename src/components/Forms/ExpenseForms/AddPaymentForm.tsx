import React, { useState } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	date: string;
	amount: string;
	account: string;
	vendor: string;
	description: string;
	category: string;
	reference: string;
}
const AddPaymentForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		date: "",
		amount: "",
		account: "",
		vendor: "",
		description: "",
		category: "",
		reference: "",
	});

	// handle Change Function
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetFunction = () => {
		setFormData({
			date: "",
			amount: "",
			account: "",
			vendor: "",
			description: "",
			category: "",
			reference: "",
		});
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);

		apiClient()
			.post(`${BACKENDAPI}/v1.0/payments`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("Payment saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<form className="row g-3">
			<div className="col-md-6">
				<label htmlFor="date" className="form-label">
					Date
				</label>
				<input
					type="date"
					className="form-control"
					id="date"
					name="date"
					onChange={handleChange}
					value={formData.date}
				/>
			</div>
			<div className="col-md-6">
				<label htmlFor="amount" className="form-label">
					Amount
				</label>
				<input
					type="number"
					className="form-control"
					id="amount"
					name="amount"
					onChange={handleChange}
					value={formData.amount}
				/>
			</div>
			<div className="col-md-6">
				<label htmlFor="account" className="form-label">
					Account
				</label>
				<input
					type="text"
					className="form-control"
					id="account"
					name="account"
					onChange={handleChange}
					value={formData.account}
				/>
			</div>
			<div className="col-md-6">
				<label htmlFor="vendor" className="form-label">
					Vendor
				</label>
				<input
					type="text"
					className="form-control"
					id="vendor"
					name="vendor"
					onChange={handleChange}
					value={formData.vendor}
				/>
			</div>
			<div className="col-md-12">
				<label htmlFor="description" className="form-label">
					Description
				</label>
				<textarea
					className="form-control"
					id="description"
					name="description"
					onChange={handleChangeTextArea}
					value={formData.description}></textarea>
			</div>
			<div className="col-md-6">
				<label htmlFor="category" className="form-label">
					Category
				</label>
				<input
					className="form-control"
					id="category"
					name="category"
					onChange={handleChange}
					value={formData.category}
				/>
			</div>
			<div className="col-md-6">
				<label htmlFor="reference" className="form-label">
					Reference
				</label>
				<input
					className="form-control"
					id="reference"
					name="reference"
					onChange={handleChange}
					value={formData.reference}
				/>
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

export default AddPaymentForm;
