import React from "react";

import AdminPageComponent from "../../components/PageComponent/AdminPageComponent";
import IncomeReportComponent from "../../components/PageComponent/Report Components/IncomeReportPageComponent";

const IncomeReportPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Income Report</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Reports</li>
							<li className="breadcrumb-item active">Income Report</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Income Report</h5>
									<IncomeReportComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default IncomeReportPage;
