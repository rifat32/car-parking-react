import React, { useContext } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	RouteComponentProps,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import SideBarComponent from "./components/SideBarComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";

import { RouteData } from "./data/RoutesData";
import "./app.css";
import { AppContext } from "./context";

const App: React.FC = () => {
	const {
		user,
		showHeaderComponent,
		showSideBarComponent,
		showFooterComponent,
	} = useContext(AppContext);
	return (
		<Router>
			{showHeaderComponent && <HeaderComponent />}
			{showSideBarComponent && <SideBarComponent />}

			<Switch>
				{RouteData.map((el) => {
					return (
						<Route
							path={el.path}
							exact={el.exact}
							render={(props: RouteComponentProps<any>) => (
								<el.component {...props} {...el.props} />
							)}
						/>
					);
				})}
			</Switch>
			{showFooterComponent && <FooterComponent />}

			<ToastContainer position="top-right" />
		</Router>
	);
};

export default App;
