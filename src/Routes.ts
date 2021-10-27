import HomePage from "./pages/HomePage/index";
import LoginPage from "./pages/LoginPage/index";
import RegisterPage from "./pages/RegisterPage/index";
import Admin from "./pages/AdminPages/DemoAdmin";

import { RouteInterface } from "./interfaces/RoutesInterface";
import EntryList from "./pages/EntryPage/EntryListPage";
import SetRate from "./pages/MasterSetupPage/SetRate";
import CarInPage from "./pages/EntryPage/CarInPage";
import CarInParkingPage from "./pages/EntryPage/CarInParkingPage";
import CarOutPage from "./pages/EntryPage/CarOutPage";
import IncomeReportPage from "./pages/ReportPage/IncomeReportPage";
import CarReportPage from "./pages/ReportPage/CarReportPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";

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
		path: "/dashboard",
		exact: false,
		component: DashboardPage,
	},

	{
		path: "/car-in",
		exact: false,
		component: CarInPage,
	},
	{
		path: "/car-in-parking",
		exact: false,
		component: CarInParkingPage,
	},
	{
		path: "/car-out",
		exact: false,
		component: CarOutPage,
	},
	{
		path: "/entries",
		exact: false,
		component: EntryList,
	},
	{
		path: "/rate",
		exact: false,
		component: SetRate,
	},
	{
		path: "/income-report",
		exact: false,
		component: IncomeReportPage,
	},
	{
		path: "/car-report",
		exact: false,
		component: CarReportPage,
	},
];
