import HomePage from "../pages/HomePage/index";
import LoginPage from "../pages/LoginPage/index";
import RegisterPage from "../pages/RegisterPage/index";
import Admin from "../pages/AdminPages/DemoAdmin";
import AddProductPage from "../pages/AdminPages/Product/AddProductPage";
import ListProductPage from "../pages/AdminPages/Product/ListProductPage";
import BrandPage from "../pages/AdminPages/Product/Brand/BrandPage";
import { RouteInterface } from "../interfaces/RoutesInterface";

import AddRequisition from "../pages/AdminPages/Requisition/AddRequisitionPage";
import RequisitionsPage from "../pages/AdminPages/Requisition/RequisitionsPage";
import AddParchasePage from "../pages/AdminPages/Parchase/AddParchasePage";
import ListParchasePage from "../pages/AdminPages/Parchase/ListParchase";
import AddRevenuePage from "../pages/AdminPages/Income/AddRevenuePage";
import ListRevenuePage from "../pages/AdminPages/Income/ListRevenuePage";
import AddCreditNotePage from "../pages/AdminPages/Income/AddCreditNotePage";
import ListCreditNotesPage from "../pages/AdminPages/Income/ListCreditNotesPage";
import CreateBillPage from "../pages/AdminPages/Expense/AddBillPage";
import ListBillsPage from "../pages/AdminPages/Expense/ListBillsPage";
import CreatePaymentPage from "../pages/AdminPages/Expense/AddPaymentPage";
import ListPaymentPage from "../pages/AdminPages/Expense/ListPaymentPage";
import CreateDebitNotePage from "../pages/AdminPages/Expense/AddDebitNotePage";
import ListDebitNotesPage from "../pages/AdminPages/Expense/ListDebitNotesPage";
import CreateWingPage from "../pages/AdminPages/MasterSetup/AddWingPage";
import ListWingsPage from "../pages/AdminPages/MasterSetup/ListWingsPage";

export const RouteData: RouteInterface[] = [
	{
		path: "/",
		exact: true,
		component: HomePage,
	},
	{
		path: "/login",
		exact: false,
		component: LoginPage,
	},
	{
		path: "/register",
		exact: false,
		component: RegisterPage,
	},
	{
		path: "/register",
		exact: false,
		component: RegisterPage,
	},
	{
		path: "/admin",
		exact: true,
		component: Admin,
	},
	// wings
	{
		path: "/admin/wings/create",
		exact: false,
		component: CreateWingPage,
	},
	{
		path: "/admin/wings",
		exact: true,
		component: ListWingsPage,
	},
	// products
	{
		path: "/admin/products/create",
		exact: false,
		component: AddProductPage,
	},
	{
		path: "/admin/products",
		exact: true,
		component: ListProductPage,
	},
	{
		path: "/admin/brands",
		exact: false,
		component: BrandPage,
	},
	// Requisitions
	{
		path: "/admin/requisitions/create",
		exact: false,
		component: AddRequisition,
	},
	{
		path: "/admin/requisitions",
		exact: true,
		component: RequisitionsPage,
	},
	// Parchases
	{
		path: "/admin/parchases/create",
		exact: false,
		component: AddParchasePage,
	},
	{
		path: "/admin/parchases",
		exact: true,
		component: ListParchasePage,
	},
	// Incomes
	{
		path: "/admin/revenues/create",
		exact: false,
		component: AddRevenuePage,
	},
	{
		path: "/admin/revenues",
		exact: true,
		component: ListRevenuePage,
	},
	{
		path: "/admin/credits/create",
		exact: false,
		component: AddCreditNotePage,
	},
	{
		path: "/admin/credits",
		exact: true,
		component: ListCreditNotesPage,
	},
	// expense
	{
		path: "/admin/bills/create",
		exact: false,
		component: CreateBillPage,
	},
	{
		path: "/admin/bills",
		exact: true,
		component: ListBillsPage,
	},
	{
		path: "/admin/payments/create",
		exact: false,
		component: CreatePaymentPage,
	},
	{
		path: "/admin/payments",
		exact: true,
		component: ListPaymentPage,
	},
	{
		path: "/admin/debitNotes/create",
		exact: false,
		component: CreateDebitNotePage,
	},
	{
		path: "/admin/debitNotes",
		exact: true,
		component: ListDebitNotesPage,
	},
];
