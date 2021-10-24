import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";

import { toast } from "react-toastify";

import { ErrMessage } from "../../../utils/ErrorMessage";

const EntryListTableComponent: React.FC = () => {
	const [data, setData] = useState<any>([]);
	const [errors, setErrors] = useState<any>(null);
	const [formData, setFormData] = useState({
		car_number: "",
	});
	const [count, setCount] = useState<any>(null);
	const [bills, setBills] = useState<any>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setErrors(null);
		setData([]);
		setCount(null);
		setBills(null);
		apiClient()
			.get(`${BACKENDAPI}/report/car/${formData.car_number}`)
			.then((response: any) => {
				console.log(response);

				const { records, count, bills } = response.data;
				setData(records);
				setCount(count);
				setBills(bills);
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

	return (
		<>
			<form className="row g-3" onSubmit={handleSubmit}>
				<div className="col-6 offset-3">
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
						Search
					</button>
				</div>
			</form>
			{count && bills ? (
				<div className="row my-5">
					<h6>total entry: {count} times</h6>
					<h6>total bill: {bills.toFixed(2)} taka</h6>
				</div>
			) : null}

			{data.length ? (
				<table className="table mt-5">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Phone number</th>

							<th scope="col">Car Number</th>
							<th scope="col">Entry</th>

							<th scope="col">Exit</th>
							<th scope="col">Bill</th>

							<th scope="col">Token</th>
						</tr>
					</thead>

					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.name}</td>
									<td>{el.phone_number}</td>
									<td>{el.car_number}</td>
									<td>
										{new Date(el.created_at).toLocaleTimeString()}{" "}
										{new Date(el.created_at).toLocaleDateString()}
									</td>

									{el.exit_time ? (
										<td>
											{new Date(el.exit_time).toLocaleTimeString()}{" "}
											{new Date(el.exit_time).toLocaleDateString()}
										</td>
									) : (
										<td></td>
									)}

									{el.bill && (
										<td> {parseFloat(el.bill).toFixed(2)} Taka</td>
									)}

									<td>{el.token}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : null}
		</>
	);
};

export default EntryListTableComponent;
