import React from "react";
import AdminPageComponent from "../../../components/PageComponent/AdminPageComponent";
import RolesPageComponent from "../../../components/PageComponent/UserManagementComponent/RolesPageComponent";

const RolesPage: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>Users</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">UserManagement</li>
							<li className="breadcrumb-item active">Roles</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">All Roles</h5>
									<RolesPageComponent />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default RolesPage;
