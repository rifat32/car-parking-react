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
	{
		path: "/admin/parchase/create",
		exact: false,
		component: AddParchasePage,
	},
	{
		path: "/admin/parchases",
		exact: true,
		component: ListParchasePage,
	},
];
