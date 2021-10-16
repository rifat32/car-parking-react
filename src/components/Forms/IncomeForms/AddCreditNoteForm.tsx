import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	date: string;
	amount: string;
	account: string;
	customer: string;
	description: string;
	category: string;
	reference: string;
	wing_id: string;
}

const AddCreditNoteForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		date: "",
		amount: "",
		account: "",
		customer: "",
		description: "",
		category: "",
		reference: "",
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

	// handle Change Function
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const resetFunction = () => {
		setFormData({
			date: "",
			amount: "",
			account: "",
			customer: "",
			description: "",
			category: "",
			reference: "",
			wing_id: "",
		});
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);

		apiClient()
			.post(`${BACKENDAPI}/v1.0/credit-notes`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("credit note saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
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
				<label htmlFor="customer" className="form-label">
					Customer
				</label>
				<input
					type="text"
					className="form-control"
					id="customer"
					name="customer"
					onChange={handleChange}
					value={formData.customer}
				/>
			</div>
			<div className="col-md-12">
				<label htmlFor="date" className="form-label">
					Description
				</label>
				<textarea
					className="form-control"
					id="description"
					name="description"
					onChange={handleTextArea}
					value={formData.description}></textarea>
			</div>
			<div className="col-md-6">
				<label htmlFor="category" className="form-label">
					Category
				</label>
				<input
					type="text"
					className="form-control"
					id="category"
					name="category"
					onChange={handleChange}
					value={formData.category}
				/>
			</div>
			<div className="col-md-6">
				<label htmlFor="category" className="form-label">
					Reference
				</label>
				<input
					type="text"
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

export default AddCreditNoteForm;
