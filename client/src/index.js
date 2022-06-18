import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./assets/css/animate.min.css";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import AdminLayout from "./layouts/index.jsx";
import { setAppError } from "./redux/actions/index.actions";
import storeFactory from "./redux/store";


const handleError = (error) => {
  store.dispatch(setAppError(error.message));
};

const store = storeFactory();

window.React = React;
window.store = store;

window.addEventListener("error", handleError);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="">
      <Switch>
        <Route render={(props) => <AdminLayout {...props} />} />

        {/* <Redirect from="/" to="/dashboard" /> */}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
