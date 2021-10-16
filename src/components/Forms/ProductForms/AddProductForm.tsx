import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	name: string;
	brand: string;
	unit: string;
	category: string;
	sku: string;
	// quantity: string;
	type: string;
	tax: string;
	taxType: string;
	subCategory: string;
	price: string;
	wing_id: string;
}
const AddProductForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		brand: "",
		unit: "",
		category: "",
		subCategory: "",
		sku: "",
		// quantity: "0",
		type: "",
		tax: "",
		taxType: "",
		price: "",
		wing_id: "",
	});
	const [wings, setWings] = useState([]);
	useEffect(() => {
		loadWings();
	}, []);
	// pagination required
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
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const resetFunction = () => {
		setFormData({
			name: "",
			brand: "",
			unit: "",
			category: "",
			subCategory: "",
			sku: "",
			// quantity: "0",
			type: "",
			tax: "",
			taxType: "",
			price: "",
			wing_id: "",
		});
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		apiClient()
			.post(`${BACKENDAPI}/v1.0/products`, { ...formData })
			.then((response) => {
				console.log(response);
				toast.success("product saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<form className="row g-3" onSubmit={handleSubmit}>
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
				<label htmlFor="name" className="form-label">
					Product Name
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
			<div className="col-md-4">
				<label htmlFor="brand" className="form-label">
					Brand
				</label>
				<input
					type="text"
					className="form-control"
					id="brand"
					name="brand"
					onChange={handleChange}
					value={formData.brand}
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
				<label htmlFor="sku" className="form-label">
					SKU
				</label>
				<input
					type="text"
					className="form-control"
					id="sku"
					name="sku"
					onChange={handleChange}
					value={formData.sku}
				/>
			</div>
			{/* <div className="col-md-4">
				<label htmlFor="quantity" className="form-label">
					Alert quantity
				</label>
				<input
					type="number"
					className="form-control"
					id="quantity"
					name="quantity"
					onChange={handleChange}
					value={formData.quantity}
				/>
			</div> */}
			<div className="col-md-4">
				<label htmlFor="price" className="form-label">
					Price
				</label>
				<input
					type="number"
					className="form-control"
					id="price"
					name="price"
					onChange={handleChange}
					value={formData.price}
				/>
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

export default AddProductForm;
