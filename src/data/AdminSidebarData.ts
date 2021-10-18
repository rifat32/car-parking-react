import { NavInterface } from "../interfaces/AdminSideBarInterface";
export const adminSideBarData: NavInterface[] = [
	{
		name: "Master Setup",
		list: [
			{
				name: "Create Wing",
				link: "/admin/wings/create",
			},
			{
				name: "Wings",
				link: "/admin/wings",
			},
			{
				name: "Create Bank",
				link: "/admin/banks/create",
			},
			{
				name: "Banks",
				link: "/admin/banks",
			},
		],
	},
	{
		name: "User Management",
		list: [
			{
				name: "Create User",
				link: "/admin/users/create",
			},
			{
				name: "Users",
				link: "/admin/users",
			},
			{
				name: "Create Role",
				link: "/admin/roles/create",
			},
			{
				name: "Roles",
				link: "/admin/roles",
			},
		],
	},
	{
		name: "Product",
		list: [
			{
				name: "Add Product",
				link: "/admin/products/create",
			},
			{
				name: "List Products",
				link: "/admin/products",
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
				name: "Requisitions Create",
				link: "/admin/requisitions/create",
			},
			{
				name: "Requisitions",
				link: "/admin/requisitions",
			},
		],
	},
	{
		name: "Parchase",
		list: [
			{
				name: "Parchase Create",
				link: "/admin/parchases/create",
			},
			{
				name: "List Parchase",
				link: "/admin/parchases",
			},
		],
	},
	{
		name: "Income",
		list: [
			{
				name: "Revenue Create",
				link: "/admin/revenues/create",
			},
			{
				name: "List Revenue",
				link: "/admin/revenues",
			},
			{
				name: "Credit Note Create",
				link: "/admin/credits/create",
			},
			{
				name: "List Credit Note",
				link: "/admin/credits",
			},
		],
	},
	{
		name: "Expense",
		list: [
			{
				name: "Bill Create",
				link: "/admin/bills/create",
			},
			{
				name: "Bill",
				link: "/admin/bills",
			},

			{
				name: "Payment Create",
				link: "/admin/payments/create",
			},
			{
				name: "Payment",
				link: "/admin/payments",
			},
			{
				name: "Debit Note Create",
				link: "/admin/debitNotes/create",
			},
			{
				name: "Debit Note",
				link: "/admin/debitNotes",
			},
		],
	},
	{
		name: "Balance",
		list: [
			{
				name: "Bank Balance",
				link: "/admin/bank/balance",
			},
			{
				name: "Balance Transfer",
				link: "/admin/bank/transfer",
			},
		],
	},
];
