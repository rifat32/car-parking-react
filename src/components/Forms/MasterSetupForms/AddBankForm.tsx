import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	name: string;
	account_number: string;
	wing_id: string;
}
const AddBankForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		account_number: "",
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
	const resetFunction = () => {
		setFormData({
			name: "",
			account_number: "",
			wing_id: "",
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
	};

	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
		apiClient()
			.post(`${BACKENDAPI}/v1.0/banks`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("Bank saved");
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
				<label htmlFor="name" className="form-label">
					Bank Name
				</label>
				<input
					type="text"
					className="form-control"
					id="name"
					name="name"
					onChange={handleChange}
					value={formData.name}
				/>
			</div>
			<div className="col-md-6">
				<label htmlFor="account_number" className="form-label">
					Account Number
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

export default AddBankForm;
