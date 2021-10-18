import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
	role_id: string;
}
const AddUserForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
		role_id: "",
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
	const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
			email: "",
			password: "",
			password_confirmation: "",
			role_id: "",
		});
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
		setErrors(null);
		apiClient()
			.post(`${BACKENDAPI}/v1.0/users`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("User saved");
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
			{/* <div className="col-md-12">
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
			</div> */}
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
			<div className="col-12">
				<label htmlFor="yourEmail" className="form-label">
					Email
				</label>
				<div className="input-group has-validation">
					<span className="input-group-text" id="inputGroupPrepend">
						@
					</span>
					<input
						type="text"
						name="email"
						className={
							errors
								? errors.email
									? `form-control is-invalid`
									: `form-control is-valid`
								: "form-control"
						}
						id="email"
						required
						onChange={handleChange}
						value={formData.email}
					/>
					{errors?.email && (
						<div className="invalid-feedback">{errors.email[0]}</div>
					)}
					{errors && <div className="valid-feedback">Looks good!</div>}
				</div>
			</div>
			<div className="col-12">
				<label htmlFor="password" className="form-label">
					Password
				</label>
				<input
					type="password"
					name="password"
					className={
						errors
							? errors.password
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="password"
					required
					onChange={handleChange}
					value={formData.password}
				/>
				{errors?.password && (
					<div className="invalid-feedback">{errors.password[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-12">
				<label htmlFor="password_confirmation" className="form-label">
					Confirm Password
				</label>
				<input
					type="password"
					name="password_confirmation"
					className={
						errors
							? errors.password_confirmation
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control"
					}
					id="yourPassword"
					required
					onChange={handleChange}
					value={formData.password_confirmation}
				/>
				{errors?.password_confirmation && (
					<div className="invalid-feedback">
						{errors.password_confirmation[0]}
					</div>
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

export default AddUserForm;
