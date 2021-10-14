import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	name: string;
}
const AddWingForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
	});

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

	const resetFunction = () => {
		setFormData({
			name: "",
		});
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
		apiClient()
			.post(`${BACKENDAPI}/v1.0/wings`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("Wing saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<form className="row g-3">
			<div className="col-md-6">
				<label htmlFor="name" className="form-label">
					Name
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

export default AddWingForm;
