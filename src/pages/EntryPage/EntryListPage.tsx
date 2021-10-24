import React from "react";
import AdminPageComponent from "../../components/PageComponent/AdminPageComponent";

import ListEntryPageComponent from "../../components/PageComponent/EntryPageComponent/ListEntryPageComponent";
import { InOut } from "../../interfaces/InOutEnum";

const EntryList: React.FC = () => {
	return (
		<AdminPageComponent>
			<main id="main" className="main">
				<div className="pagetitle">
					<h1>List Entry</h1>
					<nav>
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="index.html">Home</a>
							</li>
							<li className="breadcrumb-item">Welcome</li>
							<li className="breadcrumb-item active">List Entries</li>
						</ol>
					</nav>
				</div>
				{/* End Page Title */}
				<section className="section">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">All Entry</h5>
									<ListEntryPageComponent car_out={true} />
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AdminPageComponent>
	);
};

export default EntryList;
