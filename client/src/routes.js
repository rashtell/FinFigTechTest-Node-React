import Home from "views/Home.jsx";
import Events from "./views/Events";
import Login from "./views/Login";

const unprotectedRoute = [
  {
    path: "/home",
    name: "",
    icon: "",
    component: Home,
    layout: "",
    redirect: true,
  },
  {
    path: "/login",
    name: "",
    icon: "",
    component: Login,
    layout: "",
    redirect: true,
  },
];

const protectedRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: "pe-7s-home",
    component: Home,
    layout: "",
  },
  {
    path: "/events",
    name: "Events",
    icon: "pe-7s-global",
    component: Events,
    layout: "",
  },
];

export default [unprotectedRoute, protectedRoutes];
