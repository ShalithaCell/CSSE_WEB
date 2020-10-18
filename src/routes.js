import Register from "./views/examples/Register";
import Login from "./views/examples/Login";
import Orders from "./views/examples/Orders";
import Items from "./views/examples/Items";
import Profile from "./views/examples/Profile";
import Suppliers from "./views/examples/Suppliers";
import Index from "./views/Index";

const routes = [
    {
        path      : "/index",
        name      : "Dashboard",
        icon      : "ni ni-tv-2 text-primary",
        component : Index,
        layout    : "/admin",
    },
    {
        path      : "/items",
        name      : "Items",
        icon      : "ni ni-planet text-blue",
        component : Items,
        layout    : "/admin",
    },
    {
        path      : "/suppliers",
        name      : "Suppliers",
        icon      : "ni ni-pin-3 text-orange",
        component : Suppliers,
        layout    : "/admin",
    },
    {
        path      : "/user-profile",
        name      : "User Profile",
        icon      : "ni ni-single-02 text-yellow",
        component : Profile,
        layout    : "/admin",
    },
    {
        path      : "/orders",
        name      : "Orders",
        icon      : "ni ni-bullet-list-67 text-red",
        component : Orders,
        layout    : "/admin",
    },
    {
        path      : "/login",
        name      : "Login",
        icon      : "ni ni-key-25 text-info",
        component : Login,
        layout    : "/auth",
    },
    {
        path      : "/register",
        name      : "Register",
        icon      : "ni ni-circle-08 text-pink",
        component : Register,
        layout    : "/auth",
    },
];

export default routes;
