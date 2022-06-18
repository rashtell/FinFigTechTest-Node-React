import Dashboard from "views/Dashboard.jsx";
// import Transactions from "views/Transactions.jsx";
// import Login from "./views/Login";

const unprotectedRoute = [
  {
    path: "/home",
    name: "Home",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "",
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "fa fa-sign-in",
  //   component: Login,
  //   layout: "",
  // },
];

const protectedRoutes = [
  // {
  //   path: "/events",
  //   name: "Events",
  //   icon: "pe-7s-note2",
  //   component: Transactions,
  //   layout: "",
  // },
];

export default [unprotectedRoute, protectedRoutes];
