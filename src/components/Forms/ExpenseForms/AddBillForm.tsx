import React, { useState, useEffect } from "react";
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
	wing_id: string;
}
const AddBillForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		vendor: "",
		billDate: "",
		dueDate: "",
		category: "",
		orderNumber: "",
		discountApply: false,
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
	const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.checked });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetFunction = () => {
		setFormData({
			vendor: "",
			billDate: "",
			dueDate: "",
			category: "",
			orderNumber: "",
			discountApply: false,
			wing_id: "",
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
