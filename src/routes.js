import Register from "./views/basic/Register";
import Login from "./views/basic/Login";
import Orders from "./views/basic/Orders";
import Items from "./views/basic/Items";
import Profile from "./views/basic/Profile";
import Suppliers from "./views/basic/Suppliers";
import Index from "./views/Index";

// all the application routes are define in here
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
