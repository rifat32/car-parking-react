import React, { useState } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	vendor: string;
	billDate: string;
	dueDate: string;
	category: string;
	orderNumber: string;
	discountApply: boolean;
}
const AddBillForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		vendor: "",
		billDate: "",
		dueDate: "",
		category: "",
		orderNumber: "",
		discountApply: false,
	});

	// handle Change Function
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.checked });
	};

	const resetFunction = () => {
		setFormData({
			vendor: "",
			billDate: "",
			dueDate: "",
			category: "",
			orderNumber: "",
			discountApply: false,
		});
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);

		apiClient()
			.post(`${BACKENDAPI}/v1.0/bills`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("Bill saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<form className="row g-3">
			<div className="col-md-4">
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
			<div className="col-md-4">
				<label htmlFor="billDate" className="form-label">
					Bill Date
				</label>
				<input
					type="date"
					className="form-control"
					id="billDate"
					name="billDate"
					onChange={handleChange}
					value={formData.billDate}
				/>
			</div>
			<div className="col-md-4">
				<label htmlFor="dueDate" className="form-label">
					Due Date
				</label>
				<input
					type="date"
					className="form-control"
					id="dueDate"
					name="dueDate"
					onChange={handleChange}
					value={formData.dueDate}
				/>
			</div>
			<div className="col-md-4">
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

			<div className="col-md-4">
				<label htmlFor="orderNumber" className="form-label">
					Order Number
				</label>
				<input
					type="number"
					className="form-control"
					id="orderNumber"
					name="orderNumber"
					onChange={handleChange}
					value={formData.orderNumber}
				/>
			</div>
			<div className="col-md-12">
				<div className="form-check">
					<input
						className="form-check-input"
						type="checkbox"
						id="discountApply"
						name="discountApply"
						onChange={handleChecked}
						checked={formData.discountApply}
					/>
					<label className="form-check-label" htmlFor="discountApply">
						Discount Apply
					</label>
				</div>
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

export default AddBillForm;
