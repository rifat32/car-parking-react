import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	sending_wing_id: string;
	sending_account_number: string;
	recieving_wing_id: string;
	recieving_account_number: string;
	amount: string;
}
const TransferBalanceFrom: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		sending_wing_id: "",
		sending_account_number: "",
		recieving_wing_id: "",
		recieving_account_number: "",
		amount: "",
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

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (e.target.name === "recieving_wing_id") {
		}
		if (e.target.name === "sending_wing_id") {
		}
	};

	const resetFunction = () => {
		setFormData({
			sending_wing_id: "",
			sending_account_number: "",
			recieving_wing_id: "",
			recieving_account_number: "",
			amount: "",
		});
	};
	// handle submit Function
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formData);

		apiClient()
			.patch(`${BACKENDAPI}/v1.0/balance/transfer`, { ...formData })
			.then((response) => {
				console.log(response);

				toast.success("Balanced transfered successfully");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
				if (
					error.response.status === 404 ||
					error.response.status === 400
				) {
					toast.error(error.response.data.message);
				}
			});
	};

	return (
		<form className="row g-3">
			<div className="col-md-6">
				<label htmlFor="sending_wing_id" className="form-label">
					Sending Wing
				</label>
				<select
					className="form-select"
					id="sending_wing_id"
					name="sending_wing_id"
					onChange={handleSelect}
					value={formData.sending_wing_id}>
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
				<label htmlFor="sending_account_number" className="form-label">
					Sending Account
				</label>
				<input
					type="text"
					className="form-control"
					id="sending_account_number"
					name="sending_account_number"
					onChange={handleChange}
					value={formData.sending_account_number}
				/>
			</div>
			<div className="col-md-6">
				<label htmlFor="recieving_wing_id" className="form-label">
					Recieving Wing
				</label>
				<select
					className="form-select"
					id="recieving_wing_id"
					name="recieving_wing_id"
					onChange={handleSelect}
					value={formData.recieving_wing_id}>
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
				<label htmlFor="recieving_account_number" className="form-label">
					Recieving Account
				</label>
				<input
					type="text"
					className="form-control"
					id="recieving_account_number"
					name="recieving_account_number"
					onChange={handleChange}
					value={formData.recieving_account_number}
				/>
			</div>

			<div className="col-md-6">
				<label htmlFor="amount" className="form-label">
					Amount
				</label>
				<input
					type="number"
					className="form-control"
					id="amount"
					name="amount"
					onChange={handleChange}
					value={formData.amount}
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

export default TransferBalanceFrom;
