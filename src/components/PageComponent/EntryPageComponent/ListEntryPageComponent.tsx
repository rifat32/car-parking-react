import React, { useState, useEffect } from "react";
import { BACKENDAPI } from "../../../data/config";
import { apiClient } from "../../../utils/apiClient";

import CustomModal from "../../Modal/Modal";
import { toast } from "react-toastify";
import AddEntryForm from "../../Forms/EntryForm/AddEntryForm";
import { ErrMessage } from "../../../utils/ErrorMessage";

const EntryListTableComponent: React.FC<{ car_out: boolean }> = ({
	car_out,
}) => {
	const [data, setData] = useState<any>([]);

	const [currentData, setCurrentData] = useState<any>(null);
	const [link, setLink] = useState(
		`${BACKENDAPI}/entries/${car_out ? "car_out" : "car_in"}`
	);
	const [nextPageLink, setNextPageLink] = useState("");
	const [prevPageLink, setPrevPageLink] = useState("");

	useEffect(() => {
		loadData(link);
	}, []);

	// pagination required
	const loadData = (link: string) => {
		apiClient()
			.get(link)
			.then((response: any) => {
				console.log(response);
				setData([...data, ...response.data.data]);
				setNextPageLink(response.data.next_page_url);
				setPrevPageLink(response.data.prev_page_url);
			})
			.catch((error: any) => {
				console.log(error.response);
			});
	};
	// update modal states
	const [modalUpdateIsOpen, setUpdateIsOpen] = React.useState(false);
	const showModal = (show: boolean) => {
		setUpdateIsOpen(show);
	};
	// add modal states
	const [modalAddIsOpen, setAddIsOpen] = React.useState(false);
	const showAddModal = (show: boolean) => {
		setAddIsOpen(show);
	};
	const updateDataStates = (updatedData: any) => {
		const tempDatas = data.map((el: any) => {
			if (parseInt(el.id) === parseInt(updatedData.id)) {
				return updatedData;
			}
			return el;
		});
		setData(tempDatas);
	};
	const deleteData = (id: number) => {
		if (window.confirm("Are you sure  want to delete ?")) {
			apiClient()
				.delete(`${BACKENDAPI}/entries/${id}`)
				.then((response: any) => {
					console.log(response);
					removefromTable(id, "data deleted successfully");
				})
				.catch((error) => {
					console.log(error.response);
				});
		}
	};
	const removefromTable = (id: number, message: string) => {
		const tempDatas = data.filter((el: any) => {
			return el.id !== id;
		});
		setData(tempDatas);
		toast.success(message);
	};
	const confirmExit = (id: number) => {
		if (window.confirm("Are you sure  want to Exit?")) {
			apiClient()
				.put(`${BACKENDAPI}/entries/exit`, {
					id,
				})
				.then((response: any) => {
					console.log(response.data);
					removefromTable(id, "Exit Successfull");
				})
				.catch((error) => {
					console.log(error.response);

					ErrMessage(error.response.status, error.response.data.message);
				});
		}
	};
	const AddDataStates = (addedData: any) => {
		const tempDatas = [addedData, ...data];
		setData(tempDatas);
	};
	return (
		<>
			{/* <a
				onClick={() => {
					showAddModal(true);
				}}
				className="btn btn-primary">
				Add Data
			</a> */}
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Phone number</th>

						<th scope="col">Car Number</th>
						<th scope="col">Entry</th>
						{car_out && (
							<>
								<th scope="col">Exit</th>
								<th scope="col">Bill</th>
							</>
						)}

						<th scope="col">Token</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				{data.length ? (
					<tbody>
						{data.map((el: any) => {
							return (
								<tr key={el.id}>
									<td>{el.name}</td>
									<td>{el.phone_number}</td>
									<td>{el.car_number}</td>
									<td>
										{new Date(el.created_at).toLocaleTimeString()}{" "}
										{new Date(el.created_at).toLocaleDateString()}
									</td>
									{car_out && (
										<>
											<td>
												{new Date(
													el.exit_time
												).toLocaleTimeString()}{" "}
												{new Date(
													el.exit_time
												).toLocaleDateString()}
											</td>
											<td>
												{el.bill && parseFloat(el.bill).toFixed(2)}{" "}
												Taka
											</td>
										</>
									)}

									<td>{el.token}</td>

									<td>
										<div className="btn-group">
											<button
												type="button"
												className="btn btn-sm btn-primary dropdown-toggle"
												data-bs-toggle="dropdown"
												aria-expanded="false">
												Action
											</button>
											<ul className="dropdown-menu action">
												<li>
													<a
														onClick={() => {
															setCurrentData(el);
															showModal(true);
														}}
														className="dropdown-item">
														edit
													</a>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li>
												{!car_out && (
													<>
														<li>
															<a
																onClick={() => {
																	confirmExit(el.id);
																}}
																className="dropdown-item">
																Exit
															</a>
														</li>
													</>
												)}

												<li>
													<a
														onClick={() => {
															deleteData(el.id);
														}}
														className="dropdown-item">
														delete
													</a>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li>
											</ul>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
			<div className="text-center">
				{nextPageLink ? (
					<button
						className="btn btn-primary"
						onClick={() => {
							loadData(nextPageLink);
						}}>
						Load More ...
					</button>
				) : data.length ? (
					prevPageLink ? (
						"No more data to show"
					) : (
						""
					)
				) : (
					"No data to show"
				)}
			</div>
			{/* update modal */}
			<CustomModal
				isOpen={modalAddIsOpen}
				showModal={showAddModal}
				type="Add Entry">
				<AddEntryForm
					showModal={showAddModal}
					type="add"
					upsertDataStates={AddDataStates}
				/>
			</CustomModal>
			{/* edit modal */}
			<CustomModal
				isOpen={modalUpdateIsOpen}
				showModal={showModal}
				type="Update Entry">
				<AddEntryForm
					value={currentData}
					upsertDataStates={updateDataStates}
					showModal={showModal}
					type="update"
				/>
			</CustomModal>
		</>
	);
};

export default EntryListTableComponent;
