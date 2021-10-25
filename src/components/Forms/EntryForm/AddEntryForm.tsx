import React, { useState, useEffect, useRef } from "react";
import { BACKENDAPI } from "../../../data/config";
import { toast } from "react-toastify";
import { UpdateFormInterface } from "../../../interfaces/UpdateFormInterfaced";
import { apiClient } from "../../../utils/apiClient";
import { ErrMessage } from "../../../utils/ErrorMessage";
import { printInvoice } from "../../../utils/PrintInvoice";

interface FormData {
	name: string;
	phone_number: string;
	car_number: string;
}
const AddEntryForm: React.FC<UpdateFormInterface> = (props) => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		phone_number: "",
		car_number: "",
	});
	const [errors, setErrors] = useState<any>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const resetFunction = () => {
		setFormData({
			name: "",
			phone_number: "",
			car_number: "",
		});
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		setErrors(null);
		if (props.type === "update") {
			updateData();
		} else {
			createData();
		}
	};

	const createData = () => {
		apiClient()
			.post(`${BACKENDAPI}/entries`, { ...formData })
			.then((response: any) => {
				console.log(response.data);
				toast.success("data saved");
				printInvoice(response.data.invoice);

				// props.upsertDataStates(response.data);
				// props.showModal(false);
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
				ErrMessage(error.response.status, error.response.data.message);
				if (error.response.status === 422) {
					toast.error("invalid input");
					setErrors(error.response.data.errors);
				}
			});
	};
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	// edit data section
	useEffect(() => {
		if (props.type == "update") {
			setFormData(props.value);
		}
	}, []);
	const updateData = () => {
		apiClient()
			.put(`${BACKENDAPI}/entries`, { ...formData })
			.then((response: any) => {
				console.log(response);
				toast.success("Data Updated");

				props.upsertDataStates(response.data);
				props.showModal(false);
			})
			.catch((error) => {
				console.log(error);
				console.log(error.response);
				if (
					error.response.status === 404 ||
					error.response.status === 400
				) {
					toast.error(error.response.data.message);
				}
				if (error.response.status === 422) {
					toast.error("invalid input");
					setErrors(error.response.data.errors);
				}
			});
	};
	// end edit Data section
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	return (
		<form className="row g-3" onSubmit={handleSubmit}>
			<div className="col-md-8">
				<label htmlFor="name" className="form-label">
					Name
				</label>
				<input
					type="text"
					className={
						errors
							? errors.name
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control border  border-dark"
					}
					id="name"
					name="name"
					onChange={handleChange}
					value={formData.name}
					autoComplete="off"
				/>
				{errors?.name && (
					<div className="invalid-feedback">{errors.name[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-8">
				<label htmlFor="phone_number" className="form-label">
					Phone Number
				</label>
				<input
					type="text"
					className={
						errors
							? errors.phone_number
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control border  border-dark"
					}
					id="phone_number"
					name="phone_number"
					onChange={handleChange}
					value={formData.phone_number}
					autoComplete="off"
				/>
				{errors?.phone_number && (
					<div className="invalid-feedback">{errors.phone_number[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>
			<div className="col-md-8">
				<label htmlFor="car_number" className="form-label">
					Car Number
				</label>
				<input
					type="text"
					className={
						errors
							? errors.car_number
								? `form-control is-invalid`
								: `form-control is-valid`
							: "form-control border  border-dark"
					}
					id="car_number"
					name="car_number"
					onChange={handleChange}
					value={formData.car_number}
					autoComplete="off"
				/>
				{errors?.car_number && (
					<div className="invalid-feedback">{errors.car_number[0]}</div>
				)}
				{errors && <div className="valid-feedback">Looks good!</div>}
			</div>

			<div className="text-center">
				<button type="submit" className="btn btn-primary me-2">
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

export default AddEntryForm;
