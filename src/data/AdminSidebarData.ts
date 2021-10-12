import { NavInterface } from "../interfaces/AdminSideBarInterface";
export const adminSideBarData: NavInterface[] = [
	{
		name: "Product",
		list: [
			{
				name: "List Products",
				link: "/admin/products",
			},
			{
				name: "Add Product",
				link: "/admin/products/create",
			},
			{
				name: "Brands",
				link: "/admin/brands",
			},
		],
	},
	{
		name: "Requisition",
		list: [
			{
				name: "Requisitions",
				link: "/admin/requisitions",
			},
			{
				name: "Requisitions Create",
				link: "/admin/requisitions/create",
			},
		],
	},
	{
		name: "Parchase",
		list: [
			{
				name: "List Parchase",
				link: "/admin/parchases",
			},
			{
				name: "Parchase Create",
				link: "/admin/parchase/create",
			},
		],
	},
];
