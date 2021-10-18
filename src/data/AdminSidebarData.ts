import { NavInterface } from "../interfaces/AdminSideBarInterface";
export const adminSideBarData: NavInterface[] = [
	{
		name: "Master Setup",
		list: [
			{
				name: "Wing",
				link: "/admin/wings",
			},
			{
				name: "Create Wings",
				link: "/admin/wings/create",
			},
			{
				name: "Bank",
				link: "/admin/banks",
			},
			{
				name: "Create Bank",
				link: "/admin/banks/create",
			},
		],
	},
	{
		name: "User Management",
		list: [
			{
				name: "Users",
				link: "/admin/users",
			},
			{
				name: "Create User",
				link: "/admin/users/create",
			},
			{
				name: "Roles",
				link: "/admin/roles",
			},
			{
				name: "Create Role",
				link: "/admin/roles/create",
			},
		],
	},
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
				link: "/admin/parchases/create",
			},
		],
	},
	{
		name: "Income",
		list: [
			{
				name: "List Revenue",
				link: "/admin/revenues",
			},
			{
				name: "Revenue Create",
				link: "/admin/revenues/create",
			},
			{
				name: "List Credit Note",
				link: "/admin/credits",
			},
			{
				name: "Credit Note Create",
				link: "/admin/credits/create",
			},
		],
	},
	{
		name: "Expense",
		list: [
			{
				name: "Bill",
				link: "/admin/bills",
			},
			{
				name: "Bill Create",
				link: "/admin/bills/create",
			},
			{
				name: "Payment",
				link: "/admin/payments",
			},
			{
				name: "Payment Create",
				link: "/admin/payments/create",
			},
			{
				name: "Debit Note",
				link: "/admin/debitNotes",
			},
			{
				name: "Debit Note Create",
				link: "/admin/debitNotes/create",
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
