import React, { useEffect, useState } from "react";
import { apiClient } from "../../../utils/apiClient";
import { BACKENDAPI } from "../../../config";
import VerticalBarGraph from "@chartiful/react-vertical-bar-graph";
const DashboardPageComponent = () => {
	const [people, setPeople] = useState<any>([]);
	const [bill, setBill] = useState<any>([]);
	const [date, setDate] = useState<any>([]);
	const [totalIncome, setTotalIncome] = useState("0");
	const [todayIncome, setTodayIncome] = useState("0");
	const calculateData = (data: []) => {
		const tempPeople: any = [];
		const tempDate: any = [];
		const tempBill: any = [];
		data.reverse().map((el: any) => {
			// console.log(parseFloat(el.bill.toFixed(2)));

			tempBill.push(parseFloat(el.bill).toFixed(2));
			tempPeople.push(el.people);
			const date = new Date(el.date);
			tempDate.push(date.getDate());
		});

		setPeople(tempPeople);
		setBill(tempBill);
		setDate(tempDate);
	};
	const loadData = () => {
		apiClient()
			.get(`${BACKENDAPI}/report/monthly`)
			.then((response: any) => {
				console.log(response);
				calculateData(response.data);
			})
			.catch((err) => {
				console.log(err);
				console.log(err.response);
			});
	};
	const total = () => {
		apiClient()
			.get(`${BACKENDAPI}/reports/income/total`)
			.then((response: any) => {
				console.log(response.data);
				setTotalIncome(response.data.total);
				setTodayIncome(response.data.today_income);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
	useEffect(() => {
		loadData();
		total();
	}, []);

	return (
		<>
			{" "}
			<h6 className="">
				Total Income {parseInt(totalIncome)} Taka Today Income{" "}
				{parseInt(todayIncome)} Taka
			</h6>
			{bill.length && date.length ? (
				<>
					<VerticalBarGraph
						data={[...bill]}
						labels={[...date]}
						width={800}
						height={300}
						barRadius={5}
						barWidthPercentage={0.4}
						baseConfig={{
							hasXAxisBackgroundLines: false,
							xAxisLabelStyle: {
								position: "right",
								suffix: "৳",
							},
						}}
						style={{
							paddingVertical: 15,
						}}
					/>
					<h5>This month income</h5>
					<div
						className="bg-primary my-5"
						style={{ height: "1rem", width: "100%" }}></div>

					<VerticalBarGraph
						data={[...people]}
						labels={[...date]}
						width={800}
						height={300}
						barRadius={5}
						barWidthPercentage={0.4}
						baseConfig={{
							hasXAxisBackgroundLines: false,
							xAxisLabelStyle: {
								position: "right",
								suffix: "p",
							},
						}}
						style={{
							paddingVertical: 15,
						}}
					/>
					<h5>This month entry</h5>
				</>
			) : null}
		</>
	);
};

export default DashboardPageComponent;
