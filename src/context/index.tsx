import React, { createContext, useState, useEffect } from "react";
import { BACKENDAPI } from "../data/config";
import { apiClient } from "../utils/apiClient";
const defaultContext = {
	user: null,
	userLoading: true,
	setUserFunction: (toogle: boolean): void => {},
	setUserLoadingFunction: (user: any): void => {},
	showHeaderComponent: false,
	showSideBarComponent: false,
	showFooterComponent: false,
	setAdminBar: (toggle: boolean): void => {},
	setShowSideBarComponentFunc: (toggle: boolean): void => {},
	setShowHeaderComponentFunc: (toggle: boolean): void => {},
	setShowFooterComponentFunc: (toggle: boolean): void => {},
	logoutFunction: (): void => {},
};
const AppContext = createContext(defaultContext);
const AppProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<any>(null);
	const [userLoading, setUserLoading] = useState(true);
	const setUserFunction = (user: any) => {
		setUser(user);
	};
	const setUserLoadingFunction = (toogle: boolean) => {
		setUserLoading(toogle);
	};
	const [showHeaderComponent, setShowHeaderComponent] = useState(false);
	const [showSideBarComponent, setShowSideBarComponent] = useState(false);
	const [showFooterComponent, setShowFooterComponent] = useState(false);
	const setShowHeaderComponentFunc = (toggle: boolean) => {
		setShowHeaderComponent(toggle);
	};
	const setShowSideBarComponentFunc = (toggle: boolean) => {
		setShowSideBarComponent(toggle);
	};
	const setAdminBar = (toggle: boolean) => {
		setShowHeaderComponent(toggle);
		setShowSideBarComponent(toggle);
		setShowFooterComponent(toggle);
	};
	const setShowFooterComponentFunc = (toggle: boolean) => {
		setShowFooterComponent(toggle);
	};

	useEffect(() => {
		apiClient()
			.get(`${BACKENDAPI}/v1.0/user`)
			.then((response) => {
				console.log(response);
				setUser(response.data);
				setUserLoading(false);
			})
			.catch((err) => {
				console.log(err.response);
				if (err.response) {
				}
				setUserLoading(false);
			});
	}, []);
	const logoutFunction = () => {
		apiClient()
			.post(`${BACKENDAPI}/v1.0/logout`)
			.then((response) => {
				console.log(response);
				// setUser(response.data);
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response);
				}
			});

		setUser(null);
		localStorage.removeItem("token");
	};
	return (
		<AppContext.Provider
			value={{
				user,
				setUserFunction,
				showHeaderComponent,
				showSideBarComponent,
				setAdminBar,
				setShowSideBarComponentFunc,
				setShowHeaderComponentFunc,
				setShowFooterComponentFunc,
				showFooterComponent,
				logoutFunction,
				userLoading,
				setUserLoadingFunction,
			}}>
			{children}
		</AppContext.Provider>
	);
};
export { AppProvider, AppContext };
