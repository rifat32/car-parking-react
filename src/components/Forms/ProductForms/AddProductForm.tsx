import React, { useState } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";
import { toast } from "react-toastify";

interface FormData {
	pName: string;
	pBrand: string;
	pUnit: string;
	pCategory: string;
	pSku: string;
	pQuantity: string;
	pType: string;
	pTax: string;
	pTaxType: string;
	pSubCategory: string;
	pPrice: string;
}
const AddProductForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		pName: "",
		pBrand: "",
		pUnit: "",
		pCategory: "",
		pSubCategory: "",
		pSku: "",
		pQuantity: "0",
		pType: "",
		pTax: "",
		pTaxType: "",
		pPrice: "",
	});
	// const data: any = {
	// 	brands: {
	// 		16: "brand 1",
	// 		17: "brand 2",
	// 	},
	// 	categories: {
	// 		16: "category 1",
	// 		17: "category 2",
	// 	},
	// 	subcategories: {
	// 		16: "sub category 1",
	// 		17: "sub category 2",
	// 	},
	// 	units: {
	// 		16: "kg",
	// 		17: "Ps",
	// 	},
	// };
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	// const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	setFormData({ ...formData, [e.target.name]: e.target.value });
	// };
	const resetFunction = () => {
		setFormData({
			pName: "",
			pBrand: "",
			pUnit: "",
			pCategory: "",
			pSubCategory: "",
			pSku: "",
			pQuantity: "0",
			pType: "",
			pTax: "",
			pTaxType: "",
			pPrice: "",
		});
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		apiClient()
			.post(`${BACKENDAPI}/v1.0/products`, { ...formData })
			.then((response) => {
				console.log(response);
				toast("product saved");
				resetFunction();
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<form className="row g-3" onSubmit={handleSubmit}>
			<div className="col-md-4">
				<label htmlFor="pName" className="form-label">
					Product Name
				</label>
				<input
					type="text"
					className="form-control"
					id="pName"
					name="pName"
					onChange={handleChange}
					value={formData.pName}
				/>
			</div>
			<div className="col-md-4">
				<label htmlFor="pBrands" className="form-label">
					Brand
				</label>
				<input
					type="text"
					className="form-control"
					id="pBrand"
					name="pBrand"
					onChange={handleChange}
					value={formData.pBrand}
				/>
			</div>
			<div className="col-md-4">
				<label htmlFor="pCategory" className="form-label">
					Category
				</label>
				<input
					type="text"
					className="form-control"
					id="pCategory"
					name="pCategory"
					onChange={handleChange}
					value={formData.pCategory}
				/>
			</div>
			<div className="col-md-4">
				<label htmlFor="pSku" className="form-label">
					SKU
				</label>
				<input
					type="text"
					className="form-control"
					id="pSku"
					name="pSku"
					onChange={handleChange}
					value={formData.pSku}
				/>
			</div>
			<div className="col-md-4">
				<label htmlFor="pName" className="form-label">
					Alert quantity
				</label>
				<input
					type="text"
					className="form-control"
					id="pQuantity"
					name="pQuantity"
					onChange={handleChange}
					value={formData.pQuantity}
				/>
			</div>
			<div className="col-md-4">
				<label htmlFor="pPrice" className="form-label">
					Price
				</label>
				<input
					type="text"
					className="form-control"
					id="pPrice"
					name="pPrice"
					onChange={handleChange}
					value={formData.pPrice}
				/>
			</div>

			{/* <div className="col-md-4">
				<label htmlFor="pName" className="form-label">
					Product image:
				</label>
				<input
					type="file"
					className="form-control"
					id="pImage"
					name="pImage"
					// onChange={handleChange}
					// value={formData.pName}
				/>
			</div> */}

			{/* <div className="col-md-4">
				<label htmlFor="pName" className="form-label">
					Brand:
				</label>
				<select
					className="form-select"
					id="pBrand"
					name="pBrand"
					onChange={handleSelect}
					value={formData.pBrand}>
					<option value="">Choose Brand</option>
					{Object.keys(data.brands).map((key) => (
						<option key={key} value={key}>
							{data.brands[key]}
						</option>
					))}
				</select>
			</div> */}
			{/* <div className="col-md-4">
				<label htmlFor="pName" className="form-label">
					Unit:
				</label>
				<select
					className="form-select"
					id="pUnit"
					name="pUnit"
					onChange={handleSelect}
					value={formData.pUnit}>
					<option value="">Choose Unit</option>
					{Object.keys(data.units).map((key) => (
						<option key={key} value={key}>
							{data.units[key]}
						</option>
					))}
				</select>
			</div> */}
			{/* <div className="col-md-4">
				<label htmlFor="pName" className="form-label">
					Category:
				</label>
				<select
					className="form-select"
					id="pCategory"
					name="pCategory"
					onChange={handleSelect}
					value={formData.pCategory}>
					<option value="">Choose Category</option>
					{Object.keys(data.categories).map((key) => (
						<option key={key} value={key}>
							{data.categories[key]}
						</option>
					))}
				</select>
			</div> */}
			{/* <div className="col-md-4">
				<label htmlFor="pName" className="form-label">
					Sub category:
				</label>
				<select
					className="form-select"
					id="pSubCategory"
					name="pSubCategory"
					onChange={handleSelect}
					value={formData.pSubCategory}>
					<option value="">Choose Sub Category</option>
					{Object.keys(data.subcategories).map((key) => (
						<option key={key} value={key}>
							{data.subcategories[key]}
						</option>
					))}
				</select>
			</div> */}
			{/* <div className="col-md-4">
				<label htmlFor="pName" className="form-label">
					Product Type:
				</label>
				<select
					className="form-select"
					id="pType"
					name="pType"
					onChange={handleSelect}
					value={formData.pType}>
					<option value="single">Single</option>
					<option value="variable">Variable</option>
				</select>
			</div> */}

			{/* <div className="col-md-4">
				<label htmlFor="pName" className="form-label">
					Applicable Tax:
				</label>
				<select
					className="form-select"
					id="pTax"
					name="pTax"
					onChange={handleSelect}
					value={formData.pTax}>
					<option value="">Select </option>
					<option value="none">None</option>
				</select>
			</div> */}
			{/* <div className="col-md-4">
				<label htmlFor="pName" className="form-label">
					Selling Price Tax Type:*
				</label>
				<select
					className="form-select"
					id="pTaxType"
					name="pTaxType"
					onChange={handleSelect}
					value={formData.pTaxType}>
					<option value="inclusive">Inclusive</option>
					<option value="exclusive">Exclusive</option>
				</select>
			</div> */}

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
