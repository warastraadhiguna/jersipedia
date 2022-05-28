import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducers/store";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { ErrorPage, Finish, Login, Unfinish } from "./views";
import AdminLayout from "layouts/Admin.js";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/login" component={Login} exact />
        <Route path="/payment/finish" component={Finish} exact />
        <Route path="/payment/error" component={Unfinish} exact />
        <Route path="/payment/unfinish" component={ErrorPage} exact />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
