import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	name: string;
}
const AddRoleForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
	});
	const [errors, setErrors] = useState<any>(null);
	useEffect(() => {
		// loadWings();
	}, []);
	// const loadWings = () => {
	// 	apiClient()
	// 		.get(`${BACKENDAPI}/v1.0/wings/all`)
	// 		.then((response: any) => {
	// 			console.log(response);
	// 			setWings(response.data.wings);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error.response);
	// 		});
	// };

	// handle Change Function
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		// if (e.target.name === "wing_id") {
		// 	loadBills(e.target.value);
		// }
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
		setErrors(null);
		apiClient()
			.post(`${BACKENDAPI}/v1.0/roles`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("Role saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
				if (error.response.status === 404) {
					toast.error(error.response.data.message);
				}
				if (error.response.status === 422) {
					toast.error("invalid input");
					setErrors(error.response.data.errors);
				}
			});
	};

	return (
		<form className="row g-3">
			<div className="col-12">
				<label htmlFor="yourPassword" className="form-label">
					Name
				</label>
				<input
					type="text"
					name="name"
					className={
						errors
							? errors.name
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="yourPassword"
					required
					onChange={handleChange}
					value={formData.name}
				/>
				{errors?.name && (
					<div className="invalid-feedback">{errors.name[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
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

export default AddRoleForm;
