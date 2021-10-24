import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../data/config";
import { toast } from "react-toastify";
import { apiClient } from "../../utils/apiClient";
import AdminPageComponent from "../../components/PageComponent/AdminPageComponent";

const SetRate: React.FC = () => {
	const [formData, setFormData] = useState({
		rate: "",
	});
	const [errors, setErrors] = useState<any>(null);
	useEffect(() => {
		apiClient()
			.get(`${BACKENDAPI}/rate`)
			.then((response: any) => {
				console.log(response);
				setFormData({
					rate: response.data.rate.rate,
				});
			})
			.catch((err) => {
				setFormData({
					rate: "0",
				});
				console.log(err.response);
			});
	}, []);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setErrors(null);
		apiClient()
			.post(`${BACKENDAPI}/rate`, { ...formData })
			.then((response: any) => {
				console.log(response);
				toast.success("data updated successfully");
			})
			.catch((err) => {
				setFormData({
					rate: "0",
				});
				setErrors(err.response.data.errors);
				console.log(err.response);
			});
		return;
	};

	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>List Entry</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Master Setup</li>
							<li className="breadcrumb-item active">Set Rate</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Set Rate</h5>
									<form className="row g-3" onSubmit={handleSubmit}>
										<div className="col-md-6">
											<label htmlFor="rate" className="form-label">
												Rate
											</label>
											<input
												type="number"
												className={
													errors
														? errors.rate
															? `form-control is-invalid`
															: `form-control is-valid`
														: "form-control border  border-dark"
												}
												id="rate"
												name="rate"
												onChange={handleChange}
												value={formData.rate}
												autoComplete="off"
											/>
											{errors?.rate && (
												<div className="invalid-feedback">
													{errors.rate[0]}
												</div>
											)}
											{errors && (
												<div className="valid-feedback">
													Looks good!
												</div>
											)}
										</div>

										<div>
											<button
												type="submit"
												className="btn btn-primary me-2">
												Submit
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default SetRate;
