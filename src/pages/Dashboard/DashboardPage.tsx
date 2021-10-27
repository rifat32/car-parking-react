import React from "react";
import AddEntryForm from "../../components/Forms/EntryForm/AddEntryForm";
import AdminPageComponent from "../../components/PageComponent/AdminPageComponent";
import DashboardPageComponent from "../../components/PageComponent/DashBoardPageComponent/DashboardPageComponent";

const DashboardPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Dashboard</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Dashboard</li>
							{/* <li className="breadcrumb-item active">Car In</li> */}
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Dashboard</h5>
									<DashboardPageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default DashboardPage;
