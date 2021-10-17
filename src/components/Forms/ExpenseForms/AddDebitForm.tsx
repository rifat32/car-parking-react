import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	bill_id: string;
	amount: string;
	account_number: string;
	date: string;
	description: string;
	wing_id: string;
}
const AddDebitForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		bill_id: "",
		amount: "",
		account_number: "",
		date: "",
		description: "",
		wing_id: "",
	});
	const [bills, setBills] = useState([]);
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

	// pagination required
	const loadBills = (wing_id: string) => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/bills/${wing_id}`)
			.then((response: any) => {
				console.log(response);
				setBills(response.data.bills);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	// handle Change Function
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (e.target.name === "wing_id") {
			loadBills(e.target.value);
		}
	};

	const resetFunction = () => {
		setFormData({
			bill_id: "",
			amount: "",
			date: "",
			description: "",
			wing_id: "",
			account_number: "",
		});
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
		apiClient()
			.post(`${BACKENDAPI}/v1.0/debit-notes`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("Debit Note saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
				if (error.response.status === 404) {
					toast.error(error.response.data.message);
				}
			});
	};

	return (
		<form className="row g-3">
			<div className="col-md-12">
				<label htmlFor="wing_id" className="form-label">
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
			<div className="col-md-12">
				<label htmlFor="bill_id" className="form-label">
					Bill
				</label>
				<select
					className="form-select"
					id="bill_id"
					name="bill_id"
					onChange={handleSelect}
					value={formData.bill_id}>
					<option value="">Please Select</option>
					{bills.map((el: any, index) => (
						<option
							key={index}
							value={el.id}
							style={{ textTransform: "uppercase" }}>
							{`#bill0000${el.id}`}
						</option>
					))}
				</select>
			</div>
			{/* <div className="col-md-12">
				<label htmlFor="bill" className="form-label">
					Bill
				</label>
				<input
					type="text"
					className="form-control"
					id="bill"
					name="bill"
					onChange={handleChange}
					value={formData.bill}
				/>
			</div> */}
			<div className="col-md-6">
				<label htmlFor="account_number" className="form-label">
					Account
				</label>
				<input
					type="text"
					className="form-control"
					id="account_number"
					name="account_number"
					onChange={handleChange}
					value={formData.account_number}
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

export default AddDebitForm;
