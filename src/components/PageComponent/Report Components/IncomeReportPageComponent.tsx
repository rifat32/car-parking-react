import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../config";
import { toast } from "react-toastify";
import { apiClient } from "../../../utils/apiClient";
import { ErrMessage } from "../../../utils/ErrorMessage";

const IncomeReportComponent: React.FC = () => {
	const [totalIncome, setTotalIncome] = useState("0");
	const [todayIncome, setTodayIncome] = useState("0");
	const [errors, setErrors] = useState<any>(null);
	const [result, setResult] = useState<any>(null);
	const date = new Date();
	const today = `${date.getFullYear()}-${
		date.getMonth() + 1
	}-${date.getDate()}`;
	const [formData, setFormData] = useState({
		from_date: today,
		to_date: today,
	});
	useEffect(() => {
		apiClient()
			.get(`${BACKENDAPI}/reports/income/total`)
			.then((response: any) => {
				console.log(response.data);
				setTotalIncome(response.data.total);
				setTodayIncome(response.data.today_income);
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, []);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);
		setErrors(null);
		setResult(null);

		apiClient()
			.get(
				`${BACKENDAPI}/report/income/${formData.from_date}/${formData.to_date}`
			)
			.then((response: any) => {
				console.log(response);
				setResult(response.data);
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
		<div>
			<h6 className="text-center">
				Total Income {parseInt(totalIncome)} Taka
			</h6>
			<h6 className="text-center">
				Today Income {parseInt(todayIncome)} Taka
			</h6>
			<div className="row mt-5">
				<div className="col-2 align-self-center">
					<strong>search: </strong>
				</div>

				<div className="col-10">
					<form className="row g-3" onSubmit={handleSubmit}>
						<div className="col-6">
							<label htmlFor="from_date" className="form-label">
								From Date
							</label>
							<input
								type="date"
								className={
									errors
										? errors.from_date
											? `form-control is-invalid`
											: `form-control is-valid`
										: "form-control border  border-dark"
								}
								id="from_date"
								name="from_date"
								onChange={handleChange}
								value={formData.from_date}
							/>
							{errors?.from_date && (
								<div className="invalid-feedback">
									{errors.from_date[0]}
								</div>
							)}
							{errors && (
								<div className="valid-feedback">Looks good!</div>
							)}
						</div>

						<div className="col-6">
							<label htmlFor="to_date" className="form-label">
								To Date
							</label>
							<input
								type="date"
								className={
									errors
										? errors.to_date
											? `form-control is-invalid`
											: `form-control is-valid`
										: "form-control border  border-dark"
								}
								id="to_date"
								name="to_date"
								onChange={handleChange}
								value={formData.to_date}
								autoComplete="off"
							/>
							{errors?.to_date && (
								<div className="invalid-feedback">
									{errors.to_date[0]}
								</div>
							)}
							{errors && (
								<div className="valid-feedback">Looks good!</div>
							)}
						</div>
						<div className="text-center">
							<button type="submit" className="btn btn-primary me-2">
								Search
							</button>
						</div>
					</form>
				</div>
			</div>
			<div className="row mt-5">
				{result && (
					<>
						<div className="col-12 row">
							<div className="col-3">query</div>
							<div className="col-9">{result.query}</div>
						</div>
						<div className="col-12 row">
							<div className="col-3">Total Income</div>
							<div className="col-9">{result.total_income} taka</div>
						</div>
						<div className="col-12 row">
							<div className="col-3">Total Entry</div>
							<div className="col-9">
								{result.total_entry}{" "}
								{result.total_entry > 1 ? "cars" : "car"}{" "}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default IncomeReportComponent;
