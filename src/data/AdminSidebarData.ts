import { NavInterface } from "../interfaces/AdminSideBarInterface";
export const adminSideBarData: NavInterface[] = [
	{
		name: "Dashboard",
		list: [
			{
				name: "Dashboard",
				link: "/dashboard",
			},
		],
	},
	{
		name: "Welcome",
		list: [
			{
				name: "Car In",
				link: "/car-in",
			},
			{
				name: "Car In Parking",
				link: "/car-in-parking",
			},
			{
				name: "Car Out",
				link: "/car-out",
			},
		],
	},
	{
		name: "Report",
		list: [
			{
				name: "Income Report",
				link: "/income-report",
			},
			{
				name: "Car Report",
				link: "/car-report",
			},
		],
	},
	{
		name: "Master Setup",
		list: [
			{
				name: "Set rate",
				link: "/rate",
			},
		],
	},
];
