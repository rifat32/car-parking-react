import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import PaymentsPageComponent from "../../../components/PageComponent/ExpenseComponent/PaymentsPageComponent";

const ListPaymentPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Payments</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Expense</li>
							<li className="breadcrumb-item active">Payments</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">All Payments</h5>
									<PaymentsPageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default ListPaymentPage;
